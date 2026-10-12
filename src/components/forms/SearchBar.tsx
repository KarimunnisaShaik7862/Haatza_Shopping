import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, MicOff, X, Clock, ArrowRight, Tag, ShoppingBag } from 'lucide-react';
import { useDestination } from '../../context/DestinationContext';
import { useToast } from '../../context/ToastContext';
import { useActivity } from '../../context/ActivityContext';
import { mockProducts } from '../../services/mock/data/products';
import { mockCategories } from '../../services/mock/data/categories';

const RECENT_SEARCHES_KEY = 'haatza_recent_searches';

interface SearchSuggestion {
  id: string;
  type: 'recent' | 'product' | 'category' | 'brand' | 'query';
  title: string;
  subtitle?: string;
  slug?: string;
  categorySlug?: string;
}

export const SearchBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { destination, theme } = useDestination();
  const { showToast } = useToast();
  const { recordSearch } = useActivity();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setRecentSearches(parsed);
      }
    } catch (e) {
      console.error('Error loading search history', e);
    }
  }, []);

  // Debounce typing input by 150ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Destination theme-aware focus styles
  const activeColor = theme?.primary || (destination === 'lite' ? '#238636' : destination === 'nest' ? '#6C3FC5' : '#A60000');
  const activeRingClass = destination === 'lite'
    ? 'focus:border-[#238636] focus:ring-2 focus:ring-[#238636]/20'
    : destination === 'nest'
    ? 'focus:border-[#6C3FC5] focus:ring-2 focus:ring-[#6C3FC5]/20'
    : 'focus:border-[#A60000] focus:ring-2 focus:ring-[#A60000]/20';

  // Compute matched autocomplete suggestions
  const suggestions: SearchSuggestion[] = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return [];

    const results: SearchSuggestion[] = [];

    // 1. Matched previous searches
    recentSearches
      .filter((s) => s.toLowerCase().includes(q) && s.toLowerCase() !== q)
      .slice(0, 2)
      .forEach((s) => {
        results.push({
          id: `recent-${s}`,
          type: 'recent',
          title: s,
          subtitle: 'From previous searches',
        });
      });

    // 2. Matched Categories
    mockCategories
      .filter((c) => c.destination === destination && c.name.toLowerCase().includes(q))
      .slice(0, 2)
      .forEach((c) => {
        results.push({
          id: `cat-${c.id}`,
          type: 'category',
          title: c.name,
          categorySlug: c.slug,
          subtitle: 'in Categories',
        });
      });

    // 3. Matched Brands
    const brandSet = new Set<string>();
    mockProducts
      .filter((p) => p.destination === destination && p.brand.toLowerCase().includes(q))
      .forEach((p) => brandSet.add(p.brand));

    Array.from(brandSet)
      .slice(0, 2)
      .forEach((brand) => {
        results.push({
          id: `brand-${brand}`,
          type: 'brand',
          title: brand,
          subtitle: 'in Brands',
        });
      });

    // 4. Matched Products
    mockProducts
      .filter((p) => {
        if (p.destination !== destination) return false;
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .slice(0, 4)
      .forEach((prod) => {
        results.push({
          id: `prod-${prod.id}`,
          type: 'product',
          title: prod.name,
          subtitle: `₹${prod.price.toLocaleString('en-IN')} • ${prod.categoryName}`,
          slug: prod.slug,
        });
      });

    return results;
  }, [debouncedQuery, destination, recentSearches]);

  const saveRecentSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;

      const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
      setRecentSearches(updated);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      recordSearch(trimmed);
    },
    [recentSearches, recordSearch]
  );

  const handleExecuteSearch = (searchTerm: string) => {
    const term = searchTerm.trim();
    if (!term) return;

    saveRecentSearch(term);
    setIsOpen(false);
    setSelectedIndex(-1);

    if (destination === 'nest') {
      navigate(`/nest?search=${encodeURIComponent(term)}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  const handleSelectSuggestion = (sugg: SearchSuggestion) => {
    if (sugg.type === 'product' && sugg.slug) {
      saveRecentSearch(sugg.title);
      setIsOpen(false);
      navigate(`/product/${sugg.slug}`);
    } else if (sugg.type === 'category' && sugg.categorySlug) {
      saveRecentSearch(sugg.title);
      setIsOpen(false);
      navigate(`/category/${sugg.categorySlug}`);
    } else {
      handleExecuteSearch(sugg.title);
    }
  };

  const clearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Web Speech API Voice Search
  const handleToggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast(
        'Voice search is not supported by your browser. Please type your search query.',
        'info'
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening... Speak now into your microphone.', 'info');
      };

      recognition.onresult = (event: any) => {
        setIsListening(false);
        const transcript = event.results[0][0]?.transcript;
        if (transcript) {
          setQuery(transcript);
          setIsOpen(true);
          inputRef.current?.focus();
          handleExecuteSearch(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          showToast('Microphone access was denied. Please allow microphone permission in your browser.', 'error');
        } else if (event.error === 'no-speech') {
          showToast('No speech was detected. Please try speaking again.', 'info');
        } else {
          showToast('Voice input was interrupted or unavailable. Please try again or type.', 'info');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      console.error('Speech recognition exception:', err);
      showToast('Could not initialize speech recognition. Please check your browser settings.', 'error');
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    if (suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleExecuteSearch(query);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      } else {
        handleExecuteSearch(query);
      }
    }
  };

  const getPlaceholder = () => {
    switch (destination) {
      case 'lite':
        return 'Search for groceries, fresh fruits, dairy, snacks...';
      case 'nest':
        return 'Search for home cleaning, kitchen scrub, laundry & home help...';
      case 'haatza':
      default:
        return 'Search for Products, Brands and More';
    }
  };

  // Decide whether to show dropdown:
  // - If query is empty: ONLY show if recentSearches.length > 0 (do not open empty dropdown or large discover section)
  // - If query is entered: show matching suggestions or compact "no matching suggestions"
  const hasEmptyQueryRecentHistory = !query.trim() && recentSearches.length > 0;
  const hasTypedQuery = query.trim().length > 0;
  const shouldRenderDropdown = isOpen && (hasEmptyQueryRecentHistory || hasTypedQuery);

  return (
    <div ref={containerRef} className={`relative flex-1 w-full ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleExecuteSearch(query);
        }}
        className="relative flex items-center"
      >
        {/* Left search icon */}
        <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>

        {/* Square / rectangular search bar with destination-specific focus styling (No blue!) */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            // Only open on focus if there's text or search history
            if (query.trim() || recentSearches.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          aria-label="Search products, brands and categories"
          className={`w-full pl-10 pr-20 py-2 bg-zinc-100/90 hover:bg-zinc-100 focus:bg-white text-sm text-[#202124] rounded-lg border border-zinc-200 focus:outline-hidden transition-all shadow-2xs placeholder:text-zinc-500 font-normal ${activeRingClass}`}
        />

        {/* Right action buttons container (Clear + Microphone) */}
        <div className="absolute right-2.5 flex items-center gap-1">
          {/* Clear query button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setDebouncedQuery('');
                inputRef.current?.focus();
              }}
              className="text-zinc-400 hover:text-zinc-700 p-1 rounded-full transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Microphone button for Voice Search */}
          <button
            type="button"
            onClick={handleToggleVoiceInput}
            title={isListening ? 'Listening... click to stop' : 'Search by voice'}
            aria-label={isListening ? 'Listening... click to stop' : 'Search by voice'}
            className={`p-1.5 rounded-full transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-xs ring-2 ring-rose-400'
                : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
      </form>

      {/* Autocomplete / Suggestions Panel */}
      {shouldRenderDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* 1. When input is empty and focused: show compact recent searches only */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" /> Recent Searches
                </span>
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  className="text-[11px] text-zinc-400 hover:text-rose-600 font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 px-1">
                {recentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      handleExecuteSearch(term);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-xs text-zinc-700 transition-colors"
                  >
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. When query has text: show compact matching suggestions */}
          {query.trim() && (
            <div className="p-2">
              {suggestions.length > 0 ? (
                <div className="space-y-0.5">
                  {suggestions.map((item, index) => {
                    const isSelected = selectedIndex === index;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors group ${
                          isSelected ? 'bg-zinc-100' : 'hover:bg-zinc-50'
                        }`}
                        style={{
                          borderLeft: isSelected ? `3px solid ${activeColor}` : '3px solid transparent',
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.type === 'recent' && (
                            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          )}
                          {item.type === 'product' && (
                            <ShoppingBag className="w-3.5 h-3.5 text-zinc-400 shrink-0 group-hover:text-zinc-800" />
                          )}
                          {item.type === 'category' && (
                            <Tag className="w-3.5 h-3.5 text-zinc-400 shrink-0 group-hover:text-zinc-800" />
                          )}
                          {item.type === 'brand' && (
                            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0 group-hover:text-zinc-800" />
                          )}

                          <div className="truncate">
                            <span className="text-xs sm:text-sm font-medium text-zinc-800 group-hover:text-black">
                              {item.title}
                            </span>
                            {item.subtitle && (
                              <span className="ml-2 text-[11px] text-zinc-400">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Compact No matching suggestions message */
                <div className="py-4 px-3 text-center text-xs text-zinc-500">
                  <p>No matching suggestions for &ldquo;{query}&rdquo;</p>
                  <button
                    type="button"
                    onClick={() => handleExecuteSearch(query)}
                    className="mt-1.5 text-xs font-semibold hover:underline inline-flex items-center gap-1"
                    style={{ color: activeColor }}
                  >
                    <span>Search all products for &ldquo;{query}&rdquo;</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
