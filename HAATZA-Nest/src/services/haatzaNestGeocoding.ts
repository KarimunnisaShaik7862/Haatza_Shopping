/**
 * HAATZA Nest Geocoding Service
 * High-accuracy reverse geocoding to resolve specific localities
 * (e.g. Electronic City Phase 2, Ananth Nagar, Koramangala 4th Block, HSR Layout)
 * from device GPS coordinates and Indian postal pincodes.
 */

export interface ReverseGeocodeResult {
  locality: string;
  city: string;
  state: string;
  pincode: string;
  formattedAddress: string;
}

export const BENGALURU_PINCODE_AREAS: Record<string, string> = {
  '560001': 'MG Road / Shivaji Nagar',
  '560002': 'City Market / Kalasipalya',
  '560003': 'Malleshwaram',
  '560004': 'Basavanagudi',
  '560008': 'Ulsoor / Halasuru',
  '560010': 'Rajajinagar',
  '560011': 'Jayanagar 3rd Block',
  '560016': 'Ramamurthy Nagar',
  '560017': 'HAL / Vimanapura',
  '560018': 'Chamrajpet / Mysore Road',
  '560020': 'Seshadripuram',
  '560024': 'Hebbal',
  '560025': 'Richmond Town',
  '560027': 'Shanti Nagar',
  '560029': 'Tavarekere / SG Palya',
  '560030': 'Adugodi / Dairy Circle',
  '560034': 'Koramangala',
  '560037': 'Marathahalli',
  '560038': 'Indiranagar',
  '560040': 'Vijayanagar',
  '560041': 'Jayanagar 4th Block',
  '560043': 'Kalyan Nagar / Banaswadi',
  '560045': 'Manyata Tech Park / Nagavara',
  '560047': 'Austin Town / Neelasandra',
  '560048': 'Mahadevapura / Hoodi',
  '560049': 'KR Puram',
  '560066': 'Whitefield',
  '560067': 'Kadugodi',
  '560068': 'Bommanahalli / Madiwala',
  '560070': 'Banashankari 2nd Stage',
  '560075': 'CV Raman Nagar',
  '560076': 'Bannerghatta Road / Hulimavu',
  '560078': 'JP Nagar',
  '560085': 'Banashankari 3rd Stage',
  '560087': 'Varthur',
  '560092': 'Sahakara Nagar',
  '560093': 'Kaggadasapura',
  '560095': 'Koramangala 4th Block',
  '560099': 'Ananth Nagar / Bommasandra',
  '560100': 'Electronic City',
  '560102': 'HSR Layout',
  '560103': 'Bellandur / Outer Ring Road',
};

/**
 * Resolves GPS coordinates directly into their micro-locality area name in Bengaluru.
 */
export function resolveCoordinatesToArea(lat?: number | string | null, lon?: number | string | null): string | null {
  if (lat === undefined || lat === null || lon === undefined || lon === null) return null;
  const numLat = Number(lat);
  const numLon = Number(lon);
  if (isNaN(numLat) || isNaN(numLon)) return null;

  // Electronic City & Ananth Nagar
  if (numLat >= 12.820 && numLat <= 12.845 && numLon >= 77.668 && numLon <= 77.700) {
    if (numLat <= 12.840 && numLon >= 77.672) return 'Ananth Nagar';
    return 'Electronic City Phase 2';
  }
  if (numLat >= 12.825 && numLat <= 12.865 && numLon >= 77.645 && numLon <= 77.695) {
    if (numLon >= 77.667) return 'Electronic City Phase 2';
    return 'Electronic City Phase 1';
  }

  // HSR Layout
  if (numLat >= 12.898 && numLat <= 12.928 && numLon >= 77.625 && numLon <= 77.665) {
    return 'HSR Layout';
  }

  // Koramangala
  if (numLat >= 12.920 && numLat <= 12.948 && numLon >= 77.608 && numLon <= 77.645) {
    if (numLat >= 12.930 && numLon >= 77.620) return 'Koramangala 4th Block';
    return 'Koramangala';
  }

  // Bellandur / Outer Ring Road
  if (numLat >= 12.920 && numLat <= 12.948 && numLon >= 77.660 && numLon <= 77.695) {
    return 'Bellandur';
  }

  // Marathahalli
  if (numLat >= 12.945 && numLat <= 12.975 && numLon >= 77.690 && numLon <= 77.730) {
    return 'Marathahalli';
  }

  // Whitefield / ITPL
  if (numLat >= 12.950 && numLat <= 13.000 && numLon >= 77.720 && numLon <= 77.780) {
    return 'Whitefield';
  }

  // Indiranagar
  if (numLat >= 12.965 && numLat <= 12.988 && numLon >= 77.630 && numLon <= 77.660) {
    return 'Indiranagar';
  }

  // BTM Layout
  if (numLat >= 12.905 && numLat <= 12.925 && numLon >= 77.600 && numLon <= 77.625) {
    return 'BTM Layout';
  }

  // JP Nagar
  if (numLat >= 12.895 && numLat <= 12.920 && numLon >= 77.575 && numLon <= 77.600) {
    return 'JP Nagar';
  }

  // Jayanagar
  if (numLat >= 12.920 && numLat <= 12.940 && numLon >= 77.575 && numLon <= 77.595) {
    return 'Jayanagar';
  }

  // Banashankari
  if (numLat >= 12.910 && numLat <= 12.935 && numLon >= 77.540 && numLon <= 77.575) {
    return 'Banashankari';
  }

  // Malleshwaram
  if (numLat >= 12.990 && numLat <= 13.020 && numLon >= 77.560 && numLon <= 77.585) {
    return 'Malleshwaram';
  }

  // Rajajinagar
  if (numLat >= 12.980 && numLat <= 13.010 && numLon >= 77.540 && numLon <= 77.565) {
    return 'Rajajinagar';
  }

  // Hebbal / Nagavara
  if (numLat >= 13.020 && numLat <= 13.060 && numLon >= 77.580 && numLon <= 77.630) {
    return 'Hebbal';
  }

  return null;
}

const cleanDirectionSuffix = (str: string): string => {
  if (!str) return '';
  return str.replace(/\s*\((?:East|West|North|South)\)\s*$/i, '').trim();
};

const isGenericSectionPrefix = (str: string): boolean => {
  return (
    /^(?:sector|phase|block|pocket|stage|cross|main|street)\b/i.test(str) &&
    !/(?:city|nagar|layout|puram|halli|palya|mangala|giri|road)/i.test(str)
  );
};

export async function reverseGeocodeCoordinates(
  latitude: number,
  longitude: number
): Promise<ReverseGeocodeResult> {
  const coordBasedArea = resolveCoordinatesToArea(latitude, longitude);

  const fallbackResult: ReverseGeocodeResult = {
    locality: coordBasedArea || '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '',
    formattedAddress: coordBasedArea 
      ? `${coordBasedArea}, Bengaluru`
      : `${Number(latitude).toFixed(4)}, ${Number(longitude).toFixed(4)}`,
  };

  if (typeof latitude !== 'number' || typeof longitude !== 'number' || isNaN(latitude) || isNaN(longitude)) {
    return fallbackResult;
  }

  // 1. Primary: OpenStreetMap Nominatim reverse geocode (NO forbidden custom headers to avoid CORS preflight failures)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const addr = data?.address || {};

      const quarter = cleanDirectionSuffix(addr.quarter);
      const neighbourhood = cleanDirectionSuffix(addr.neighbourhood);
      const suburb = cleanDirectionSuffix(addr.suburb);
      const residential = cleanDirectionSuffix(addr.residential);
      const subdivision = cleanDirectionSuffix(addr.subdivision);
      const town = cleanDirectionSuffix(addr.town);
      const village = cleanDirectionSuffix(addr.village);
      const district = cleanDirectionSuffix(addr.city_district);
      const road = cleanDirectionSuffix(addr.road);
      const commercial = cleanDirectionSuffix(addr.commercial);
      const industrial = cleanDirectionSuffix(addr.industrial);
      const city = cleanDirectionSuffix(addr.city || addr.municipality || town || 'Bengaluru');
      const state = cleanDirectionSuffix(addr.state || 'Karnataka');
      const pincode = addr.postcode ? String(addr.postcode).replace(/\D/g, '').slice(0, 6) : '';

      let locality = '';

      if (quarter) {
        locality = isGenericSectionPrefix(quarter) && (suburb || town)
          ? `${quarter}, ${suburb || town}`
          : quarter;
      } else if (neighbourhood) {
        locality = isGenericSectionPrefix(neighbourhood) && (suburb || town)
          ? `${neighbourhood}, ${suburb || town}`
          : neighbourhood;
      } else if (suburb) {
        locality = suburb;
      } else if (residential) {
        locality = residential;
      } else if (subdivision) {
        locality = subdivision;
      } else if (town && town.toLowerCase() !== 'bengaluru') {
        locality = town;
      } else if (village) {
        locality = village;
      } else if (commercial) {
        locality = commercial;
      } else if (industrial) {
        locality = industrial;
      } else if (road && suburb) {
        locality = `${road}, ${suburb}`;
      } else if (district && district.toLowerCase() !== 'bengaluru' && !district.toLowerCase().includes('corporation')) {
        locality = district;
      }

      // If locality is still missing or generic "Bengaluru", check coordinate mapping and pincode mapping
      if (!locality || locality.toLowerCase() === 'bengaluru') {
        if (coordBasedArea) {
          locality = coordBasedArea;
        } else if (pincode && BENGALURU_PINCODE_AREAS[pincode]) {
          locality = BENGALURU_PINCODE_AREAS[pincode];
        } else if (road) {
          locality = road;
        }
      }

      const resolvedCity = city || town || 'Bengaluru';
      const resolvedLocality = locality || coordBasedArea || resolvedCity;

      const addressParts: string[] = [];
      if (resolvedLocality) addressParts.push(resolvedLocality);
      if (resolvedCity && resolvedCity.toLowerCase() !== resolvedLocality.toLowerCase() && !resolvedLocality.toLowerCase().includes(resolvedCity.toLowerCase())) {
        addressParts.push(resolvedCity);
      }
      let formattedAddress = addressParts.join(', ');
      if (pincode) {
        formattedAddress += formattedAddress ? ` - ${pincode}` : pincode;
      }

      if (resolvedLocality) {
        return {
          locality: resolvedLocality,
          city: resolvedCity,
          state,
          pincode,
          formattedAddress: formattedAddress || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        };
      }
    }
  } catch {
    // Primary geocoder failed or timed out, attempt backup
  }

  // 2. Backup: Komoot Photon Reverse Geocoder (simple GET, CORS friendly)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(
      `https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const props = data?.features?.[0]?.properties || {};

      let locality = cleanDirectionSuffix(
        props.locality || props.district || props.suburb || props.name || props.street || ''
      );
      const city = cleanDirectionSuffix(props.city || props.town || 'Bengaluru');
      const state = cleanDirectionSuffix(props.state || 'Karnataka');
      const pincode = props.postcode ? String(props.postcode).replace(/\D/g, '').slice(0, 6) : '';

      if (!locality || locality.toLowerCase() === 'bengaluru') {
        if (coordBasedArea) {
          locality = coordBasedArea;
        } else if (pincode && BENGALURU_PINCODE_AREAS[pincode]) {
          locality = BENGALURU_PINCODE_AREAS[pincode];
        }
      }

      const resolvedLocality = locality || coordBasedArea || city;
      const addressParts: string[] = [];
      if (resolvedLocality) addressParts.push(resolvedLocality);
      if (city && city.toLowerCase() !== resolvedLocality.toLowerCase() && !resolvedLocality.toLowerCase().includes(city.toLowerCase())) {
        addressParts.push(city);
      }
      let formattedAddress = addressParts.join(', ');
      if (pincode) {
        formattedAddress += formattedAddress ? ` - ${pincode}` : pincode;
      }

      if (resolvedLocality) {
        return {
          locality: resolvedLocality,
          city,
          state,
          pincode,
          formattedAddress: formattedAddress || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        };
      }
    }
  } catch {
    // Backup also failed
  }

  // 3. Coordinate-based fallback
  if (coordBasedArea) {
    return {
      locality: coordBasedArea,
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '',
      formattedAddress: `${coordBasedArea}, Bengaluru`,
    };
  }

  return fallbackResult;
}

/**
 * Resolves the display area name for service availability, headers, and Coming Soon labels.
 * Prioritizes backend verified areaName, then nestAreaName, then specific locality, then coordinates/pincode.
 */
export function resolveAreaDisplayName(params: {
  availabilityAreaName?: string | null;
  nestAreaName?: string | null;
  locality?: string | null;
  city?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  pincode?: string | null;
  formattedAddress?: string | null;
}): string {
  // 1. Backend verified areaName from availability API (e.g. "Ananth Nagar", "Electronic City Phase 2")
  if (params.availabilityAreaName && params.availabilityAreaName.trim()) {
    return params.availabilityAreaName.trim();
  }

  // 2. User saved address nestAreaName
  if (params.nestAreaName && params.nestAreaName.trim()) {
    return params.nestAreaName.trim();
  }

  // 3. Specific resolved GPS locality (stripping any accidental "Current Location:" prefix)
  const cleanLocality = (params.locality || '')
    .replace(/^Current Location:\s*/i, '')
    .trim();

  if (
    cleanLocality &&
    cleanLocality.toLowerCase() !== 'current location' &&
    cleanLocality.toLowerCase() !== 'bengaluru' &&
    cleanLocality.toLowerCase() !== 'bangalore' &&
    !cleanLocality.startsWith('GPS (') &&
    !/^\d+(\.\d+)?,\s*\d+(\.\d+)?$/.test(cleanLocality)
  ) {
    if (cleanLocality.includes(' / ')) {
      const parts = cleanLocality.split(' / ').map((p) => p.trim());
      const recognized = parts.find((p) =>
        /phase|nagar|layout|sector|colony|block|city|estate|halli|palya/i.test(p)
      );
      if (recognized) return recognized;
      return parts[1] || parts[0];
    }
    return cleanLocality;
  }

  // 4. Coordinate-based micro-locality resolution
  if (params.latitude && params.longitude) {
    const area = resolveCoordinatesToArea(params.latitude, params.longitude);
    if (area) return area;
  }

  // 5. Pincode-based resolution
  if (params.pincode && BENGALURU_PINCODE_AREAS[params.pincode]) {
    return BENGALURU_PINCODE_AREAS[params.pincode];
  }

  // 6. Primary locality from formattedAddress if valid
  if (params.formattedAddress && params.formattedAddress.trim()) {
    const stripped = params.formattedAddress
      .replace(/^Current Location:\s*/i, '')
      .trim();
    const firstPart = stripped.split(',')[0]?.trim();
    if (
      firstPart &&
      !firstPart.toLowerCase().startsWith('gps') &&
      firstPart.toLowerCase() !== 'bengaluru' &&
      !/^\d+(\.\d+)?$/.test(firstPart)
    ) {
      return firstPart;
    }
  }

  // 7. City fallback
  if (params.city && params.city.trim()) {
    return params.city.trim();
  }

  return 'Your Area';
}
