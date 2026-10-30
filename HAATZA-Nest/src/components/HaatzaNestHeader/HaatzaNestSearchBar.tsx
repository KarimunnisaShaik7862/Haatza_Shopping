import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
import {
  SearchItem,
  searchHaatzaNest,
} from './haatzaNestSearchIndex';

export const HaatzaNestSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { openLocationModal } = useHaatzaNestLocation();
  const { isAvailable, vendorAvailable, isScheduleAvailable } = useHaatzaNestDashboard();
  const { user, isAuthenticated } = useHaatzaNestUser();

  // Execute clean application-wide navigation and interactive flow triggers
  const handleSelectResult = useCallback((item: SearchItem) => {
    const isHomePage = location.pathname === '/' || location.pathname === '/nest';

    switch (item.actionType) {
      case 'service': {
        const targetSlug = item.serviceSlug || 'house-cleaning';
        if (isHomePage) {
          window.dispatchEvent(
            new CustomEvent('haatza-nest-action', {
              detail: { action: 'scope', service: targetSlug },
            })
          );
        } else {
          navigate(`/nest?flow=scope&service=${encodeURIComponent(targetSlug)}#service-scope`);
        }
        break;
      }

      case 'booking-instant': {
        if (isHomePage) {
          window.dispatchEvent(
            new CustomEvent('haatza-nest-action', { detail: { action: 'instant' } })
          );
        } else {
          navigate('/nest?flow=instant');
        }
        break;
      }

      case 'booking-schedule': {
        if (isHomePage) {
          window.dispatchEvent(
            new CustomEvent('haatza-nest-action', { detail: { action: 'schedule' } })
          );
        } else {
          navigate('/nest?flow=schedule');
        }
        break;
      }

      case 'nest-pass': {
        if (isHomePage) {
          window.dispatchEvent(
            new CustomEvent('haatza-nest-action', { detail: { action: 'pass' } })
          );
        } else {
          navigate('/nest?flow=pass');
        }
        break;
      }

      case 'section': {
        if (item.targetId) {
          if (isHomePage) {
            const el = document.getElementById(item.targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            navigate(`/nest#${item.targetId}`);
          }
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

  // Handle Enter key submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // Search against actual existing destinations
    const matches = searchHaatzaNest(trimmed, {
      isAvailable,
      vendorAvailable,
      isScheduleAvailable,
      isAuthenticated,
      customerName: user?.name,
    });

    if (matches && matches.length > 0) {
      handleSelectResult(matches[0].item);
    } else {
      // Fallback: navigate to services catalog with query filter
      navigate(`/nest/services?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full" role="search">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-[#7024C7] pointer-events-none transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cleaning, kitchen, bathroom..."
          aria-label="Search cleaning, kitchen, bathroom services"
          className="w-full h-10 pl-11 pr-10 text-xs sm:text-sm bg-[#F5ECFF]/70 hover:bg-[#F5ECFF] focus:bg-white text-[#24152F] border border-[#E5D7F7] focus:border-[#7024C7] rounded-full focus:outline-none focus:ring-2 focus:ring-[#7024C7]/20 transition-all duration-200 placeholder:text-[#7D6F8D] font-medium shadow-2xs"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3.5 p-1 rounded-full text-[#7024C7]/60 hover:text-[#7024C7] hover:bg-[#F5ECFF] transition-colors cursor-pointer"
            aria-label="Clear search text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default HaatzaNestSearchBar;
