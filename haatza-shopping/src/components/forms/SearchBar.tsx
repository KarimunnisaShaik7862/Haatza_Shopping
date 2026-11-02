import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Mic, MicOff, X, Clock, ArrowRight, Tag, ShoppingBag, Zap, Sparkles } from 'lucide-react';
import { useDestination } from '../../context/DestinationContext';
import { useToast } from '../../context/ToastContext';
import { useActivity } from '../../context/ActivityContext';
import { mockProducts } from '../../services/mock/data/products';
import { mockCategories } from '../../services/mock/data/categories';
import { ALL_LITE_PRODUCTS } from '@lite/data/allProductsRegistry';
import { haatzaLiteCategories } from '@lite/data/liteData';
import { haatzaNestServices } from '@nest/data/nestData';

const RECENT_SEARCHES_KEY = 'haatza_recent_searches';

interface SearchSuggestion {
  id: string;
  type: 'recent' | 'product' | 'lite' | 'service' | 'category' | 'brand' | 'query';
  title: string;
  subtitle?: string;
  badge?: string;
  image?: string;
  price?: number;
  slug?: string;
  categorySlug?: string;
  destinationType?: 'haatza' | 'lite' | 'nest';
}

// Popular grocery keywords for instant autocomplete query suggestions in Lite
const LITE_POPULAR_KEYWORDS = [
  'Apple', 'Apples', 'Amul Milk', 'Amul Butter', 'Atta', 'Aashirvaad Atta', 'Avocado', 'Almonds',
  'Banana', 'Bread', 'Butter', 'Broccoli', 'Basmati Rice', 'Biscuits', 'Baby Food',
  'Cheese', 'Curd', 'Coffee', 'Chilli', 'Carrot', 'Cookies', 'Chips', 'Coconut Oil', 'Cerelac',
  'Dairy Milk', 'Dark Chocolate', 'Eggs', 'Fresh Fruits', 'Fresh Vegetables', 'Frozen Peas',
  'Ghee', 'Green Tea', 'Grapes', 'Garlic', 'Ginger',
  'Honey', 'Ice Cream', 'Juice', 'Ketchup',
  'Milk', 'Mango', 'Mint', 'Maggi Noodles', 'Mustard Oil',
  'Noodles', 'Nutella', 'Oil', 'Olive Oil', 'Onion', 'Orange', 'Oats',
  'Potato', 'Paneer', 'Peanut Butter', 'Pasta', 'Papaya',
  'Rice', 'Rusk', 'Sugar', 'Salt', 'Sunflower Oil', 'Spices',
  'Tea', 'Tomato', 'Toothpaste', 'Wheat Flour', 'Yogurt'
];

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

  const location = useLocation();

  // Resolve current platform dynamically based on route and destination context
  const currentPlatform: 'shopping' | 'lite' | 'nest' = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (
      destination === 'lite' ||
      path.startsWith('/lite') ||
      path.startsWith('/light') ||
      path.startsWith('/categories')
    ) {
      return 'lite';
    }
    if (
      destination === 'nest' ||
      path.startsWith('/nest') ||
      path.startsWith('/next') ||
      path.startsWith('/services') ||
      path.startsWith('/bookings')
    ) {
      return 'nest';
    }
    return 'shopping';
  }, [destination, location.pathname]);

  // Destination page-specific border and ring styles (Shopping: Blue, Lite: Green, Nest: Purple)
  const platformThemes = {
    shopping: {
      color: '#2962FF',
      className: 'border-2 border-[#2962FF] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/20',
    },
    lite: {
      color: '#00C853',
      className: 'border-2 border-[#00C853] focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20',
    },
    nest: {
      color: '#7C3AED',
      className: 'border-2 border-[#7C3AED] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20',
    },
  };

  const activeTheme = platformThemes[currentPlatform];
  const activeColor = activeTheme.color;

  // Compute matched autocomplete suggestions with intelligent relevance ranking
  const suggestions: SearchSuggestion[] = useMemo(() => {
    const q = (query.trim() || debouncedQuery).toLowerCase();
    if (!q) return [];

    const results: SearchSuggestion[] = [];

    // Helper: calculate match score
    const getRelevanceScore = (title: string, tags?: string[], category?: string) => {
      const lower = title.toLowerCase();
      let score = 0;
      if (lower === q) score += 1000;
      else if (lower.startsWith(q)) score += 800;
      else if (lower.split(/[\s\-•,/]+/).some((w) => w.startsWith(q))) score += 600;
      else if (tags?.some((t) => t.toLowerCase().startsWith(q))) score += 500;
      else if (category?.toLowerCase().startsWith(q)) score += 400;
      else if (lower.includes(q)) score += 200;
      else if (tags?.some((t) => t.toLowerCase().includes(q))) score += 150;
      else if (category?.toLowerCase().includes(q)) score += 100;
      return score;
    };

    // -------------------------------------------------------------
    // PLATFORM: HAATZA LITE (Grocery, Instant Delivery)
    // -------------------------------------------------------------
    if (currentPlatform === 'lite') {
      // 1. Direct Keyword Autocomplete (e.g. typing 'a' -> 'Apple', 'Atta', 'Amul Milk')
      const matchedKeywords = LITE_POPULAR_KEYWORDS.filter(
        (kw) => kw.toLowerCase().startsWith(q) || kw.toLowerCase().includes(q)
      ).sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(q);
        const bStarts = b.toLowerCase().startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.localeCompare(b);
      }).slice(0, 2);

      matchedKeywords.forEach((kw) => {
        results.push({
          id: `query-${kw}`,
          type: 'query',
          title: kw,
          subtitle: 'in Groceries & Essentials',
          destinationType: 'lite',
        });
      });

      // 2. Scored & Ranked Lite Products
      const scoredLite = (ALL_LITE_PRODUCTS as any[])
        .filter((p) => (p as any).destination !== 'haatza' && (p as any).destination !== 'nest')
        .map((p) => {
          const tags = Array.isArray(p.tags) ? p.tags : [];
          const score = getRelevanceScore(p.name || '', tags, p.categoryName || '');
          return { product: p, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      scoredLite.slice(0, 5).forEach(({ product: prod }) => {
        const prodImg =
          prod.mainImage ||
          prod.image ||
          (Array.isArray(prod.images) ? prod.images[0] : undefined);

        results.push({
          id: `lite-${prod.id}`,
          type: 'lite',
          title: prod.name,
          image: prodImg,
          price: prod.price,
          subtitle: `₹${prod.price} • ${prod.categoryName || 'Lite'}`,
          badge: '⚡ 10m Delivery',
          slug: prod.id || prod.slug,
          destinationType: 'lite',
        });
      });

      // 3. Matched Categories (strictly Haatza Lite categories)
      haatzaLiteCategories
        .filter((c) => c.name.toLowerCase().includes(q))
        .slice(0, 1)
        .forEach((c) => {
          results.push({
            id: `cat-${c.id}`,
            type: 'category',
            title: c.name,
            categorySlug: c.slug,
            subtitle: 'in Categories',
            destinationType: 'lite',
          });
        });

      return results.slice(0, 8);
    }

    // -------------------------------------------------------------
    // PLATFORM: HAATZA NEST (Home Services)
    // -------------------------------------------------------------
    if (currentPlatform === 'nest') {
      const matchedServices = (haatzaNestServices as any[])
        .map((s) => {
          const score = getRelevanceScore(s.name || '', [], s.category || '');
          return { service: s, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      matchedServices.slice(0, 5).forEach(({ service: srv }) => {
        results.push({
          id: `srv-${srv.id}`,
          type: 'service',
          title: srv.name,
          subtitle: `From ₹${srv.price?.toLocaleString('en-IN')} • ${srv.category}`,
          badge: '🏠 Nest Service',
          slug: srv.slug,
          destinationType: 'nest',
        });
      });

      return results.slice(0, 8);
    }

    // -------------------------------------------------------------
    // PLATFORM: SHOPPING MARKETPLACE
    // -------------------------------------------------------------
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
      .filter((c) => (c.destination === 'haatza' || !c.destination) && (c as any).destination !== 'lite' && (c as any).destination !== 'nest' && c.name.toLowerCase().includes(q))
      .slice(0, 2)
      .forEach((c) => {
        results.push({
          id: `cat-${c.id}`,
          type: 'category',
          title: c.name,
          categorySlug: c.slug,
          subtitle: 'in Categories',
          destinationType: 'haatza',
        });
      });

    // 3. Matched Shopping Marketplace Products
    const scoredShopping = mockProducts
      .filter((p) => p.destination === 'haatza' || (!p.destination && (p as any).destination !== 'lite' && (p as any).destination !== 'nest'))
      .map((p) => {
        const tags = Array.isArray(p.tags) ? p.tags : [];
        const score = getRelevanceScore(p.name || '', tags, p.categoryName || '');
        return { product: p, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    scoredShopping.slice(0, 4).forEach(({ product: prod }) => {
      results.push({
        id: `prod-${prod.id}`,
        type: 'product',
        title: prod.name,
        image: (prod as any).image || prod.mainImage || (Array.isArray(prod.images) ? prod.images[0] : undefined),
        price: prod.price,
        subtitle: `₹${prod.price?.toLocaleString('en-IN')} • ${prod.categoryName}`,
        badge: 'Shopping',
        slug: prod.slug,
        destinationType: 'haatza',
      });
    });

    return results.slice(0, 8);
  }, [query, debouncedQuery, currentPlatform, recentSearches]);

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

    if (currentPlatform === 'nest') {
      navigate(`/nest/services?q=${encodeURIComponent(term)}`);
    } else if (currentPlatform === 'lite') {
      navigate(`/lite/search?q=${encodeURIComponent(term)}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  const handleSelectSuggestion = (sugg: SearchSuggestion) => {
    saveRecentSearch(sugg.title);
    setIsOpen(false);

    if (sugg.type === 'lite') {
      navigate(`/lite/product/${sugg.slug || sugg.id}`);
    } else if (sugg.type === 'service') {
      navigate(`/nest/services?q=${encodeURIComponent(sugg.title)}`);
    } else if (sugg.type === 'product' && sugg.slug) {
      navigate(`/product/${sugg.slug}`);
    } else if (sugg.type === 'category' && sugg.categorySlug) {
      if (sugg.destinationType === 'lite' || currentPlatform === 'lite') {
        navigate(`/lite/${sugg.categorySlug}`);
      } else if (sugg.destinationType === 'nest' || currentPlatform === 'nest') {
        navigate(`/nest/services?category=${sugg.categorySlug}`);
      } else {
        navigate(`/category/${sugg.categorySlug}`);
      }
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
    switch (currentPlatform) {
      case 'lite':
        return 'Search groceries, milk, fruits...';
      case 'nest':
        return 'Search cleaning, home services...';
      case 'shopping':
      default:
        return 'Search products, brands and more...';
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
        <div className="absolute left-3 sm:left-3.5 text-zinc-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>

        {/* Square / rectangular search bar with destination-specific outer surrounding layer */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            setDebouncedQuery(val.trim());
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
          className={`w-full pl-9 sm:pl-10 ${query ? 'pr-16 sm:pr-20' : 'pr-9 sm:pr-20'} py-1.5 sm:py-2 bg-white hover:bg-zinc-50/50 focus:bg-white text-xs sm:text-sm text-[#172033] rounded-xl focus:outline-hidden transition-all shadow-2xs placeholder:text-slate-400 font-normal ${activeTheme.className}`}
          style={{ borderColor: activeTheme.color }}
        />

        {/* Right action buttons container (Clear + Microphone) */}
        <div className="absolute right-2 sm:right-2.5 flex items-center gap-0.5 sm:gap-1">
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
                        className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors group cursor-pointer ${
                          isSelected ? 'bg-zinc-100' : 'hover:bg-zinc-50'
                        }`}
                        style={{
                          borderLeft: isSelected ? `3px solid ${activeColor}` : '3px solid transparent',
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.image ? (
                            <div className="w-8 h-8 rounded-lg bg-emerald-50/50 border border-emerald-100/70 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                              <img src={item.image} alt="" className="w-full h-full object-contain" />
                            </div>
                          ) : item.type === 'query' ? (
                            <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-500">
                              <Search className="w-3.5 h-3.5" />
                            </div>
                          ) : item.type === 'recent' ? (
                            <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-400">
                              <Clock className="w-3.5 h-3.5" />
                            </div>
                          ) : item.type === 'lite' ? (
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <Zap className="w-3.5 h-3.5" />
                            </div>
                          ) : item.type === 'service' ? (
                            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                              <Sparkles className="w-3.5 h-3.5" />
                            </div>
                          ) : item.type === 'category' ? (
                            <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center shrink-0">
                              <Tag className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center shrink-0">
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </div>
                          )}

                          <div className="truncate flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs sm:text-sm font-semibold text-zinc-800 group-hover:text-black">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                                item.type === 'lite'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                  : item.type === 'service'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200/60'
                                  : 'bg-zinc-100 text-zinc-600'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                            {item.subtitle && (
                              <span className="text-[11px] text-zinc-400">
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
