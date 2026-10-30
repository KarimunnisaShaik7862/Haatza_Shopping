import React, { useRef, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { resolveCoordinatesToArea, BENGALURU_PINCODE_AREAS } from '../../services/haatzaNestGeocoding';
import { HaatzaNestLocationDropdown } from './HaatzaNestLocationDropdown';

export const HaatzaNestLocationSelector: React.FC = () => {
  const { 
    location, 
    isLocationSelected, 
    isModalOpen,
    openLocationModal,
    closeLocationModal,
  } = useHaatzaNestLocation();

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Never close if the user clicked inside any location selector or dropdown
      if (target && target.closest('[data-nest-location-container]')) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(target as Node)) {
        if (isModalOpen) {
          closeLocationModal();
        }
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, closeLocationModal]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeLocationModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeLocationModal]);

  const handleToggle = () => {
    if (isModalOpen) {
      closeLocationModal();
    } else {
      openLocationModal();
    }
  };

  const displayText = React.useMemo(() => {
    if (!isLocationSelected) return null;

    if (location.isSavedAddress && location.nestAreaName && location.nestAreaName.trim()) {
      return location.nestAreaName.trim();
    }

    const cleanLoc = (location.locality || '')
      .replace(/^Current Location:\s*/i, '')
      .trim();

    const cleanCity = (location.city || '').trim();

    const isGenericCity = (s: string) => {
      const lower = s.toLowerCase();
      return lower === 'bengaluru' || lower === 'bangalore' || lower === 'current location' || lower === 'karnataka';
    };

    if (
      cleanLoc &&
      !isGenericCity(cleanLoc) &&
      !cleanLoc.startsWith('GPS (') &&
      !/^\d+(\.\d+)?,\s*\d+(\.\d+)?$/.test(cleanLoc)
    ) {
      if (cleanCity && cleanCity.toLowerCase() !== cleanLoc.toLowerCase() && !cleanLoc.toLowerCase().includes(cleanCity.toLowerCase())) {
        return `${cleanLoc}, ${cleanCity}`;
      }
      return cleanLoc;
    }

    // Resolve exact micro-locality from coordinates if cleanLoc was generic or empty
    if (location.latitude && location.longitude) {
      const area = resolveCoordinatesToArea(location.latitude, location.longitude);
      if (area) {
        return cleanCity && cleanCity.toLowerCase() !== area.toLowerCase() ? `${area}, ${cleanCity}` : area;
      }
    }

    // Resolve exact area from pincode if available
    if (location.pincode && BENGALURU_PINCODE_AREAS[location.pincode]) {
      const pinArea = BENGALURU_PINCODE_AREAS[location.pincode];
      return cleanCity && cleanCity.toLowerCase() !== pinArea.toLowerCase() ? `${pinArea}, ${cleanCity}` : pinArea;
    }

    if (location.formattedAddress) {
      const cleanAddr = location.formattedAddress.replace(/^Current Location:\s*/i, '').trim();
      if (cleanAddr) {
        const parts = cleanAddr.split(',').map((p) => p.trim());
        const validPart = parts.find((p) => p && !isGenericCity(p) && !p.toLowerCase().startsWith('gps') && !/^\d+$/.test(p));
        if (validPart) {
          return cleanCity && cleanCity.toLowerCase() !== validPart.toLowerCase() ? `${validPart}, ${cleanCity}` : validPart;
        }
      }
    }

    return cleanLoc || cleanCity || 'Selected Area';
  }, [location, isLocationSelected]);

  return (
    <div ref={containerRef} data-nest-location-container="true" className="relative shrink-0 select-none">
      {/* Header Location Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        title={
          location.formattedAddress
            ? location.formattedAddress.replace(/^Current Location:\s*/i, '')
            : isLocationSelected
              ? `${displayText || location.locality || 'Selected Area'}${location.pincode ? `, ${location.pincode}` : ''}`
              : 'Select Service Location'
        }
        className={`flex items-center gap-2 h-10 px-3.5 rounded-full bg-white border transition-all duration-200 text-left max-w-[200px] sm:max-w-[250px] cursor-pointer shadow-2xs group focus:outline-none focus:ring-2 focus:ring-[#7024C7]/20 shrink-0 ${
          isModalOpen
            ? 'border-[#7024C7] ring-2 ring-[#7024C7]/15 bg-[#F5ECFF]/40'
            : isLocationSelected
              ? 'border-[#E5D7F7] hover:border-[#7024C7] hover:bg-[#F5ECFF]/50'
              : 'border-[#7024C7]/60 bg-[#FAF5FF] hover:border-[#7024C7]'
        }`}
        aria-haspopup="true"
        aria-expanded={isModalOpen}
        aria-label="Choose service location"
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
          isLocationSelected 
            ? 'bg-[#F5ECFF] group-hover:scale-105 group-hover:bg-[#7024C7]' 
            : 'bg-[#7024C7] text-white'
        }`}>
          <MapPin className={`w-3.5 h-3.5 ${
            isLocationSelected 
              ? 'text-[#7024C7] group-hover:text-[#FFE34D]' 
              : 'text-white'
          } transition-colors`} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[9.5px] font-bold text-[#7D6F8D] uppercase tracking-wider leading-none">
            {location.addressType || 'Service Location'}
          </span>
          <span className="text-xs font-bold text-[#24152F] truncate leading-tight mt-0.5">
            {isLocationSelected ? (
              displayText
            ) : (
              <span className="text-[#7024C7] font-extrabold flex items-center gap-1">
                Select Location
              </span>
            )}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#7024C7]/70 shrink-0 ml-0.5 transition-transform duration-200 ${
            isModalOpen ? 'rotate-180 text-[#7024C7]' : 'group-hover:text-[#7024C7]'
          }`}
        />
      </button>

      {/* Professional Attached Dropdown Menu */}
      <HaatzaNestLocationDropdown
        isOpen={isModalOpen}
        onClose={closeLocationModal}
      />
    </div>
  );
};

export default HaatzaNestLocationSelector;
