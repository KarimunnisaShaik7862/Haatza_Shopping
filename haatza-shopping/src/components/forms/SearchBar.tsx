import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Mic,
  MicOff,
  X,
  ArrowRight,
  Store,
} from 'lucide-react';
import { useDestination } from '../../context/DestinationContext';
import { useToast } from '../../context/ToastContext';
import { useActivity } from '../../context/ActivityContext';
import { mockProducts } from '../../services/mock/data/products';
import { mockUnder49Products } from '../../services/mock/data/promotions';
import { mockCategories } from '../../services/mock/data/categories';
import { Product } from '../../types';

const RECENT_SEARCHES_KEY = 'haatza_recent_searches';

// Combine catalog products for full search coverage
const ALL_SEARCH_PRODUCTS: Product[] = [...mockProducts, ...mockUnder49Products];

export interface StoreItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  itemCount: number;
  rating: number;
}

// Stores derived from authentic sellers & brands in the Haatza catalog
export const STORES_DATA: StoreItem[] = [
  {
    id: 'store-fabindia',
    name: 'FabIndia Official Store',
    brand: 'FABINDIA HERITAGE',
    category: 'Fashion & Handlooms',
    itemCount: 120,
    rating: 4.8,
  },
  {
    id: 'store-biba',
    name: 'Biba India Flagship',
    brand: 'BIBA ETHNICS',
    category: 'Ethnic Wear',
    itemCount: 95,
    rating: 4.7,
  },
  {
    id: 'store-urban-footwear',
    name: 'Urban Footwear Hub',
    brand: 'RED TAPE',
    category: 'Footwear & Casuals',
    itemCount: 65,
    rating: 4.5,
  },
  {
    id: 'store-boat',
    name: 'Imagine Marketing Direct (boAt)',
    brand: 'BOAT LIFESTYLE',
    category: 'Audio & Wearables',
    itemCount: 140,
    rating: 4.6,
  },
  {
    id: 'store-sony',
    name: 'Sony Centre Authorized',
    brand: 'SONY AUDIO',
    category: 'Electronics & Audio',
    itemCount: 85,
    rating: 4.9,
  },
  {
    id: 'store-xiaomi',
    name: 'Xiaomi Authorized Hub',
    brand: 'REDMI',
    category: 'Smartphones & Tech',
    itemCount: 75,
    rating: 4.6,
  },
  {
    id: 'store-dermaco',
    name: 'Honasa Consumer (The Derma Co)',
    brand: 'THE DERMA CO',
    category: 'Beauty & Skincare',
    itemCount: 90,
    rating: 4.8,
  },
  {
    id: 'store-bombay-dyeing',
    name: 'Bombay Dyeing Official Retail',
    brand: 'BOMBAY DYEING',
    category: 'Home & Bedding',
    itemCount: 60,
    rating: 4.7,
  },
  {
    id: 'store-wakewell',
    name: 'WakeWell Home Comfort',
    brand: 'WAKEWELL',
    category: 'Mattresses & Decor',
    itemCount: 45,
    rating: 4.6,
  },
  {
    id: 'store-philips',
    name: 'Philips India Authorized',
    brand: 'PHILIPS APPLIANCES',
    category: 'Kitchen & Home',
    itemCount: 80,
    rating: 4.7,
  },
  {
    id: 'store-greensoul',
    name: 'Green Soul Living Direct',
    brand: 'GREEN SOUL',
    category: 'Ergonomic Furniture',
    itemCount: 35,
    rating: 4.8,
  },
  {
    id: 'store-books',
    name: 'Cloudtail India Books',
    brand: 'PENGUIN RANDOM HOUSE',
    category: 'Books & Literature',
    itemCount: 240,
    rating: 4.8,
  },
  {
    id: 'store-darkstore',
    name: 'Haatza Lite Superstore #14',
    brand: 'HAATZA FRESH',
    category: 'Groceries & Daily Essentials',
    itemCount: 850,
    rating: 4.9,
  },
];

interface SearchSuggestion {
  id: string;
  type: 'recent' | 'product' | 'category' | 'brand' | 'query';
  title: string;
  subtitle?: string;
  slug?: string;
  categorySlug?: string;
}

export interface SearchBarProps {
  className?: string;
  isScrolled?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  onOpenChange,
}) => {
  const { destination } = useDestination();
  const { showToast } = useToast();
  const { recordSearch } = useActivity();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [, setSelectedIndex] = useState<number>(-1);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const hasQuery = query.trim().length > 0;

  // Notify parent on open state changes (only true if panel is actually showing)
  useEffect(() => {
    onOpenChange?.(isOpen && hasQuery);
  }, [isOpen, hasQuery, onOpenChange]);

  // Short debounce (150ms) for typing input
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  const activeRingClass =
    destination === 'lite'
      ? 'focus:border-[#238636] focus:ring-2 focus:ring-[#238636]/20'
      : destination === 'nest'
      ? 'focus:border-[#6C3FC5] focus:ring-2 focus:ring-[#6C3FC5]/20'
      : 'focus:border-[#2962FF] focus:ring-3 focus:ring-[#2962FF]/15';

  // Compute matched autocomplete suggestions - ONLY when user starts typing
  const suggestions: SearchSuggestion[] = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return [];

    const results: SearchSuggestion[] = [];

    // 1. Matched Categories
    mockCategories
      .filter((c) => c.name.toLowerCase().includes(q))
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

    // 2. Matched Brands
    const brandSet = new Set<string>();
    ALL_SEARCH_PRODUCTS.filter((p) => p.brand.toLowerCase().includes(q)).forEach((p) =>
      brandSet.add(p.brand)
    );

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

    // 3. Matched Products Titles / Keywords
    ALL_SEARCH_PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    })
      .slice(0, 4)
      .forEach((prod) => {
        results.push({
          id: `prod-${prod.id}`,
          type: 'product',
          title: prod.name,
          subtitle: prod.categoryName,
          slug: prod.slug,
        });
      });

    return results;
  }, [debouncedQuery]);

  // Compute matched stores - ONLY when user starts typing
  const stores: StoreItem[] = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return [];

    return STORES_DATA.filter((s) => {
      return (
        s.name.toLowerCase().includes(q) ||
        s.brand.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }).slice(0, 4);
  }, [debouncedQuery]);

  // Compute matching products - ONLY when user starts typing
  const matchingProducts: Product[] = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return [];

    return ALL_SEARCH_PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.sellerName && p.sellerName.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    }).slice(0, 6);
  }, [debouncedQuery]);

  // Save search to history and localStorage
  const saveRecentSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;

      try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        const existing: string[] = stored ? JSON.parse(stored) : [];
        const updated = [
          trimmed,
          ...existing.filter((s) => s.toLowerCase() !== trimmed.toLowerCase()),
        ].slice(0, 8);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save search history', e);
      }
      recordSearch(trimmed);
    },
    [recordSearch]
  );

  // Execute full search
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

  const handleSelectStore = (store: StoreItem) => {
    saveRecentSearch(store.name);
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(store.name)}`);
  };

  const handleSelectProduct = (product: Product) => {
    saveRecentSearch(product.name);
    setIsOpen(false);
    navigate(`/product/${product.id || product.slug}`);
  };

  // Voice Search handler
  const handleToggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Voice search is not supported in your browser.', 'info');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening... Speak now', 'info');
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
        if (event.error === 'not-allowed') {
          showToast('Microphone access was denied. Please allow microphone permission.', 'error');
        } else if (event.error === 'no-speech') {
          showToast('No speech was detected. Please try speaking again.', 'info');
        } else {
          showToast('Voice input interrupted. Please try again.', 'info');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      showToast('Could not initialize speech recognition.', 'error');
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteSearch(query);
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

  return (
    <div ref={containerRef} className={`relative flex-1 w-full z-50 ${className}`}>
      {/* Search Input Form */}
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

        {/* Search Input Box:
            - Clicking / focusing does NOT open any popup if empty
            - Typing immediately opens popup
            - Deleting text immediately closes popup
            - Crisp visible border in all states */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            if (val.trim().length > 0) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            // Only open if there is text already entered
            if (query.trim().length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          aria-label="Search products, brands and categories"
          className={`w-full pl-10 pr-20 py-2.5 text-sm text-[#172033] rounded-xl focus:outline-hidden transition-all placeholder:text-slate-400 font-normal bg-white ${
            isOpen && hasQuery
              ? 'border-2 border-[#2962FF] shadow-md ring-3 ring-[#2962FF]/15'
              : 'border border-[#CBD5E1] hover:border-[#94A3B8] shadow-2xs'
          } ${activeRingClass}`}
        />

        {/* Right action buttons container (Clear + Microphone) */}
        <div className="absolute right-2.5 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setDebouncedQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="text-zinc-400 hover:text-zinc-700 p-1 rounded-full transition-colors cursor-pointer"
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
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-xs ring-2 ring-rose-400'
                : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
      </form>

      {/* ====================================================================
          SEARCH SUGGESTIONS PANEL
          - ONLY rendered when user is typing text (isOpen && hasQuery)
          - NEVER rendered when search input is empty
          - NO background overlay/blur/dim
          - Prominent X close button at top-right (clears input & closes panel)
          - Dynamic two-column layout: suggestions & stores (left) + products (right)
          ==================================================================== */}
      {isOpen && hasQuery && (
        <div className="absolute top-full left-0 w-full md:min-w-[560px] md:max-w-[85vw] mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          
          {/* TOP HEADER BAR WITH PROMINENT CLOSE (X) BUTTON */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-zinc-100 bg-zinc-50/70">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-bold text-zinc-700 font-heading truncate">
                Search Results for &ldquo;{query}&rdquo;
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Prominent X (close) button at the top-right corner */}
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setDebouncedQuery('');
                  setIsOpen(false);
                  setSelectedIndex(-1);
                }}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/80 rounded-lg transition-colors cursor-pointer"
                title="Close search"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* BODY CONTENT: DYNAMIC TWO-COLUMN LAYOUT */}
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-100 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto">
            
            {/* LEFT COLUMN: Suggestions & Stores */}
            <div className="w-full md:w-5/12 p-4 sm:p-5 flex flex-col justify-between space-y-5 bg-white">
              <div className="space-y-4">
                {/* Section: Suggestions */}
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 font-heading">
                    Suggestions
                  </span>

                  {suggestions.length > 0 ? (
                    <div className="mt-2 space-y-1">
                      {suggestions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectSuggestion(item)}
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs sm:text-sm font-medium text-zinc-800 hover:bg-[#EEF3FF] hover:text-[#2962FF] transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#2962FF] shrink-0" />
                            <span className="truncate">{item.title}</span>
                            {item.subtitle && (
                              <span className="text-[10px] text-zinc-400 font-normal truncate">
                                ({item.subtitle})
                              </span>
                            )}
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-300 opacity-0 group-hover:opacity-100 group-hover:text-[#2962FF] transition-opacity shrink-0" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-2 text-xs text-zinc-400 italic">
                      No suggestions found
                    </div>
                  )}
                </div>

                {/* Section: Stores */}
                <div className="pt-3 border-t border-zinc-100">
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 font-heading">
                    Stores
                  </span>

                  {stores.length > 0 ? (
                    <div className="mt-2 space-y-1.5">
                      {stores.map((store) => (
                        <button
                          key={store.id}
                          type="button"
                          onClick={() => handleSelectStore(store)}
                          className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-emerald-50/60 transition-colors group cursor-pointer"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/80 group-hover:scale-105 transition-transform">
                            <Store className="w-4.5 h-4.5 text-emerald-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-emerald-700 font-heading truncate">
                              {store.name}
                            </p>
                            <p className="text-[10px] text-zinc-400 font-body truncate">
                              {store.category} • {store.brand}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-300 opacity-0 group-hover:opacity-100 group-hover:text-emerald-600 transition-opacity shrink-0" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-2 text-xs text-zinc-400 italic">
                      No stores matching &ldquo;{query}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Related Products */}
            <div className="w-full md:w-7/12 p-4 sm:p-5 flex flex-col justify-between bg-zinc-50/30 sm:bg-white">
              <div>
                {/* Products Header */}
                <div className="flex items-center justify-between mb-3 px-0.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 font-heading">
                    Related Products ({matchingProducts.length})
                  </span>
                  {matchingProducts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleExecuteSearch(query)}
                      className="text-xs font-bold text-[#2962FF] hover:underline cursor-pointer"
                    >
                      View all results &rarr;
                    </button>
                  )}
                </div>

                {/* Products Grid */}
                {isLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center space-y-2">
                    <div className="w-6 h-6 border-2 border-[#2962FF] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-medium text-zinc-400">Searching catalog...</span>
                  </div>
                ) : matchingProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchingProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelectProduct(prod)}
                        className="group flex items-center gap-3 p-2.5 rounded-xl border border-zinc-100 hover:border-[#DBEAFE] bg-white hover:bg-[#F5F7FF] transition-all cursor-pointer shadow-xs hover:shadow-sm"
                      >
                        <div className="w-14 h-14 rounded-lg bg-zinc-50 border border-zinc-100 overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={prod.mainImage}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80';
                            }}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 font-heading truncate">
                            {prod.brand || prod.sellerName}
                          </p>
                          <h4 className="text-xs font-bold text-zinc-900 group-hover:text-[#2962FF] line-clamp-1 leading-snug font-heading">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs sm:text-sm font-black text-zinc-950 font-heading">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                            {prod.mrp > prod.price && (
                              <span className="text-[10px] text-zinc-400 line-through">
                                ₹{prod.mrp.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 px-4 text-center space-y-2">
                    <Search className="w-8 h-8 text-zinc-300 mx-auto" />
                    <p className="text-sm font-bold text-zinc-800 font-heading">
                      No products found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                      Try searching for general terms like &ldquo;linen&rdquo;, &ldquo;earbuds&rdquo;, &ldquo;serum&rdquo;, or &ldquo;bedsheet&rdquo;.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM FOOTER: "View all search results →" */}
          <div className="border-t border-zinc-100 py-3 px-4 text-center bg-zinc-50/70">
            <button
              type="button"
              onClick={() => handleExecuteSearch(query)}
              className="text-xs sm:text-sm font-black text-[#2962FF] hover:text-[#1E4ED8] inline-flex items-center gap-1.5 font-heading hover:underline cursor-pointer"
            >
              <span>View all search results for &ldquo;{query}&rdquo;</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
