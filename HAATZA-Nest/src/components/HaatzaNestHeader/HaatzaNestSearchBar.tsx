import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  X,
  Sparkles,
  Zap,
  Calendar,
  User,
  MapPin,
  Ticket,
  ChevronRight,
  ArrowRight,
  Share2,
  Layers,
  HelpCircle,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
import {
  SearchItem,
  SearchMatch,
  searchHaatzaNest,
} from './haatzaNestSearchIndex';

const POPULAR_SUGGESTIONS = [
  { label: 'House Cleaning', query: 'house cleaning' },
  { label: 'Instant (6-15 Mins)', query: 'instant' },
  { label: 'Schedule Visit', query: 'schedule' },
  { label: 'My Bookings', query: 'my bookings' },
  { label: 'Saved Addresses', query: 'saved addresses' },
  { label: 'Nest Pass', query: 'nest pass' },
  { label: 'Kitchen Degrease', query: 'kitchen' },
];

export const HaatzaNestSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { openLocationModal } = useHaatzaNestLocation();
  const { isAvailable, vendorAvailable, isScheduleAvailable } = useHaatzaNestDashboard();
  const { bookings } = useHaatzaNestBooking();
  const { user, isAuthenticated } = useHaatzaNestUser();

  // Compute live search suggestions based on current query and real app states
  const searchResults = useMemo<SearchMatch[]>(() => {
    if (!query.trim()) return [];
    return searchHaatzaNest(query, {
      isAvailable,
      vendorAvailable,
      isScheduleAvailable,
      isAuthenticated,
      customerName: user?.name,
    });
  }, [query, isAvailable, vendorAvailable, isScheduleAvailable, isAuthenticated, user?.name]);

  // Handle clicking outside to dismiss the search suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset keyboard selected index when query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  // Execute clean application-wide navigation and interactive flow triggers
  const handleSelectResult = useCallback((item: SearchItem) => {
    setIsOpen(false);
    inputRef.current?.blur();

    const isHomePage = location.pathname === '/' || location.pathname === '/nest';

    switch (item.actionType) {
      case 'service': {
        const executeServiceAction = () => {
          const scopeSection = document.getElementById('service-scope');
          if (scopeSection) {
            // Find scope card matching this service name or slug
            const cardButtons = Array.from(
              scopeSection.querySelectorAll('.category-list button, button.category-card')
            );
            const targetBtn = cardButtons.find((btn) => {
              const title = (btn.getAttribute('title') || '').toLowerCase();
              const alt = (btn.querySelector('img')?.getAttribute('alt') || '').toLowerCase();
              const nameLower = item.title.toLowerCase();
              const slugLower = (item.serviceSlug || '').toLowerCase();
              return (
                title.includes(nameLower) ||
                alt.includes(nameLower) ||
                (slugLower && (title.includes(slugLower) || alt.includes(slugLower)))
              );
            }) as HTMLElement | undefined;

            if (targetBtn) {
              targetBtn.click();
            }
            scopeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };

        if (!isHomePage) {
          navigate('/nest');
          setTimeout(executeServiceAction, 200);
        } else {
          executeServiceAction();
        }
        break;
      }

      case 'booking-instant': {
        const executeInstantAction = () => {
          const instantCard =
            (document.querySelector('[aria-label*="Instant Booking"]') as HTMLElement | null) ||
            (document.querySelector('#service-scope button:has(svg.lucide-zap)') as HTMLElement | null);
          if (instantCard) {
            instantCard.click();
            instantCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            document.getElementById('service-scope')?.scrollIntoView({ behavior: 'smooth' });
          }
        };

        if (!isHomePage) {
          navigate('/nest');
          setTimeout(executeInstantAction, 200);
        } else {
          executeInstantAction();
        }
        break;
      }

      case 'booking-schedule': {
        const executeScheduleAction = () => {
          const schedCard =
            (document.querySelector('[aria-label*="Schedule Visit"]') as HTMLElement | null) ||
            (document.querySelector('#service-scope button:has(svg.lucide-calendar)') as HTMLElement | null);
          if (schedCard) {
            schedCard.click();
            schedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            document.getElementById('service-scope')?.scrollIntoView({ behavior: 'smooth' });
          }
        };

        if (!isHomePage) {
          navigate('/nest');
          setTimeout(executeScheduleAction, 200);
        } else {
          executeScheduleAction();
        }
        break;
      }

      case 'nest-pass': {
        const executePassAction = () => {
          const passCard = document.querySelector(
            '[aria-label*="Open Nest Pass"], [aria-label*="coupon details"]'
          ) as HTMLElement | null;
          if (passCard) {
            passCard.click();
            passCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        };

        if (!isHomePage) {
          navigate('/nest');
          setTimeout(executePassAction, 200);
        } else {
          executePassAction();
        }
        break;
      }

      case 'section': {
        const executeSectionScroll = () => {
          if (item.targetId) {
            const el = document.getElementById(item.targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        };

        if (!isHomePage) {
          navigate('/nest');
          setTimeout(executeSectionScroll, 200);
        } else {
          executeSectionScroll();
        }
        break;
      }

      case 'location': {
        openLocationModal();
        break;
      }

      case 'page':
      default: {
        if (item.url) {
          navigate(item.url);
        }
        break;
      }
    }
  }, [location.pathname, navigate, openLocationModal]);

  // Form submit (Enter key or form submission)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
      handleSelectResult(searchResults[selectedIndex].item);
      return;
    }
    if (searchResults.length > 0) {
      handleSelectResult(searchResults[0].item);
      return;
    }
    if (query.trim()) {
      // Fallback search navigation for generic query
      navigate(`/nest/services?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  // Keyboard navigation across suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // Render appropriate category icon
  const renderItemIcon = (item: SearchItem) => {
    switch (item.actionType) {
      case 'service':
        return <Sparkles className="w-4 h-4 text-[#7024C7]" />;
      case 'booking-instant':
        return <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />;
      case 'booking-schedule':
        return <Calendar className="w-4 h-4 text-[#7024C7]" />;
      case 'nest-pass':
        return <Ticket className="w-4 h-4 text-[#7024C7]" />;
      case 'location':
        return <MapPin className="w-4 h-4 text-[#7024C7]" />;
      case 'section':
        if (item.id === 'sec-referral') {
          return <Share2 className="w-4 h-4 text-emerald-600" />;
        }
        if (item.id === 'sec-how-it-works') {
          return <HelpCircle className="w-4 h-4 text-[#7024C7]" />;
        }
        return <Layers className="w-4 h-4 text-[#7024C7]" />;
      case 'page':
      default:
        if (item.id === 'page-my-bookings') {
          return <Calendar className="w-4 h-4 text-[#7024C7]" />;
        }
        if (item.id === 'page-saved-addresses') {
          return <MapPin className="w-4 h-4 text-[#7024C7]" />;
        }
        if (item.requiresAuth) {
          return <User className="w-4 h-4 text-[#7024C7]" />;
        }
        return <Layers className="w-4 h-4 text-[#7024C7]" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" role="search">
      {/* Primary Input Container matching existing dimensions, border & styling exactly */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-[#7024C7] pointer-events-none transition-colors" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search cleaning, kitchen, bathroom..."
          aria-label="Search cleaning, kitchen, bathroom services"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          className="w-full h-10 pl-11 pr-10 text-xs sm:text-sm bg-[#F5ECFF]/70 hover:bg-[#F5ECFF] focus:bg-white text-[#24152F] border border-[#E5D7F7] focus:border-[#7024C7] rounded-full focus:outline-none focus:ring-2 focus:ring-[#7024C7]/20 transition-all duration-200 placeholder:text-[#7D6F8D] font-medium shadow-2xs"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3.5 p-1 rounded-full text-[#7024C7]/60 hover:text-[#7024C7] hover:bg-[#F5ECFF] transition-colors cursor-pointer"
            aria-label="Clear search text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Floating Suggestions Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl border border-[#E5D7F7] shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 max-h-[460px] flex flex-col"
        >
          {query.trim().length > 0 ? (
            /* Results Available State */
            searchResults.length > 0 ? (
              <div className="overflow-y-auto divide-y divide-[#F5ECFF] scrollbar-thin">
                <div className="px-4 py-2 bg-[#FAF5FF] flex items-center justify-between border-b border-[#F0E4FF]">
                  <span className="text-[11px] font-black tracking-wider uppercase text-[#7024C7]">
                    Matching Results ({searchResults.length})
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium hidden sm:inline">
                    Use ↑ ↓ to navigate, Enter to select
                  </span>
                </div>

                {searchResults.map((match, idx) => {
                  const isSelected = idx === selectedIndex;
                  const item = match.item;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectResult(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3.5 sm:px-4 py-3 flex items-center gap-3 transition-colors cursor-pointer group ${
                        isSelected ? 'bg-[#F5ECFF]/80 text-[#7024C7]' : 'hover:bg-[#FBF7FF] text-[#24152F]'
                      }`}
                    >
                      {/* Icon with soft purple backdrop */}
                      <div className="w-8 h-8 rounded-xl bg-[#F5ECFF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                        {renderItemIcon(item)}
                      </div>

                      {/* Title & Subtitle */}
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-[#24152F] group-hover:text-[#7024C7] truncate font-heading transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded-md bg-[#F0E6FC] text-[#7024C7]">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7D6F8D] truncate mt-0.5 font-medium leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Right Availability / Pricing / Direct Action Badge */}
                      <div className="flex items-center gap-2 shrink-0">
                        {match.availabilityStatus === 'unavailable' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">
                            Unavailable
                          </span>
                        ) : match.availabilityStatus === 'busy' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            Busy
                          </span>
                        ) : match.availabilityStatus === 'requires-auth' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#7024C7] border border-purple-200 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Login
                          </span>
                        ) : match.statusText ? (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {match.statusText}
                          </span>
                        ) : null}

                        <ChevronRight className="w-3.5 h-3.5 text-[#7024C7]/50 group-hover:text-[#7024C7] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Dedicated Clean No Results Found State */
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#F5ECFF] text-[#7024C7] mx-auto flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#24152F] font-heading">
                    No results found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="text-xs text-[#7D6F8D] max-w-sm mx-auto">
                    We could not find any active service, page or booking option matching your keywords.
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] font-bold text-[#7024C7] uppercase tracking-wider mb-2">
                    Try searching for:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {POPULAR_SUGGESTIONS.slice(0, 5).map((pop) => (
                      <button
                        key={pop.label}
                        type="button"
                        onClick={() => {
                          setQuery(pop.query);
                          inputRef.current?.focus();
                        }}
                        className="px-2.5 py-1 text-xs rounded-full bg-[#F5ECFF] text-[#7024C7] hover:bg-[#E8D6FA] font-medium transition-colors cursor-pointer"
                      >
                        {pop.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F5ECFF]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/nest/services');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7024C7] hover:underline cursor-pointer"
                  >
                    <span>Browse All Available Services</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Quick Access / Trending Suggestions when Focused with Empty Query */
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#7024C7]">
                  Popular & Quick Actions
                </span>
                {isAuthenticated && user && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SUGGESTIONS.map((pop) => (
                  <button
                    key={pop.label}
                    type="button"
                    onClick={() => {
                      setQuery(pop.query);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 text-xs rounded-full bg-[#F5ECFF]/80 text-[#24152F] hover:bg-[#F5ECFF] hover:text-[#7024C7] border border-[#E5D7F7] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Search className="w-3 h-3 text-[#7024C7]" />
                    <span>{pop.label}</span>
                  </button>
                ))}
              </div>

              {/* Quick direct jumps */}
              <div className="pt-2 border-t border-[#F5ECFF] grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/nest/services');
                  }}
                  className="p-2 rounded-xl bg-[#FAF5FF] hover:bg-[#F5ECFF] text-[#24152F] hover:text-[#7024C7] font-semibold text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">All Services</span>
                  <ChevronRight className="w-3 h-3 text-[#7024C7] shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/nest/bookings');
                  }}
                  className="p-2 rounded-xl bg-[#FAF5FF] hover:bg-[#F5ECFF] text-[#24152F] hover:text-[#7024C7] font-semibold text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">My Bookings</span>
                  {bookings.length > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#7024C7] text-white text-[10px] font-black">
                      {bookings.length}
                    </span>
                  ) : (
                    <ChevronRight className="w-3 h-3 text-[#7024C7] shrink-0" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HaatzaNestSearchBar;
