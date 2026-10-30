export type SearchItemCategory = 
  | 'service'
  | 'booking'
  | 'account'
  | 'page'
  | 'section'
  | 'pass';

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: SearchItemCategory;
  categoryLabel: string;
  keywords: string[];
  url?: string;
  targetId?: string;
  serviceId?: string;
  serviceSlug?: string;
  actionType: 'service' | 'booking-instant' | 'booking-schedule' | 'nest-pass' | 'section' | 'page' | 'location';
  price?: number;
  badge?: string;
  requiresAuth?: boolean;
}

export interface SearchMatch {
  item: SearchItem;
  score: number;
  availabilityStatus?: 'available' | 'unavailable' | 'busy' | 'requires-auth';
  statusText?: string;
}

export const STATIC_SEARCH_ITEMS: SearchItem[] = [
  // 1. SERVICES
  {
    id: 'srv-house-cleaning',
    title: 'House Cleaning / Deep Cleaning',
    subtitle: 'Room dusting, balcony pressure wash, bed rearrangement & floor care',
    category: 'service',
    categoryLabel: 'Home Service',
    serviceSlug: 'house-cleaning',
    keywords: [
      'house cleaning', 'home cleaning', 'full home deep cleaning', 'deep clean',
      'full home', 'room', 'balcony', 'flat', 'apartment', '1bhk', '2bhk', '3bhk',
      'dusting', 'wiping', 'furniture', 'safai', 'ghar safai'
    ],
    actionType: 'service',
    price: 99,
  },
  {
    id: 'srv-kitchen-cleaning',
    title: 'Kitchen Chimney & Slab Deep Degreasing',
    subtitle: 'Stubborn oil removal, chimney filters soak, stove scrub & tiles disinfection',
    category: 'service',
    categoryLabel: 'Home Service',
    serviceSlug: 'kitchen-cleaning',
    keywords: [
      'kitchen cleaning', 'kitchen chimney', 'degreasing', 'oil stains', 'slab scrub',
      'gas stove', 'burner', 'tiles', 'exhaust', 'countertop', 'sink descaling',
      'kitchen deep degreasing', 'grease'
    ],
    actionType: 'service',
    price: 799,
  },
  {
    id: 'srv-bathroom-cleaning',
    title: 'Bathroom Deep Clean & Descaling',
    subtitle: 'Hard water stain removal, WC disinfection, mirror polish & fresh lemon finish',
    category: 'service',
    categoryLabel: 'Home Service',
    serviceSlug: 'bathroom-cleaning',
    keywords: [
      'bathroom cleaning', 'bathroom deep clean', 'descaling', 'hard water', 'toilet',
      'washroom', 'commode', 'wc', 'sink', 'tiles', 'mirror', 'restroom', 'sanitization',
      'taps', 'bath'
    ],
    actionType: 'service',
    price: 49,
  },
  {
    id: 'srv-sweeping-mopping',
    title: 'Floor Brooming & Mopping',
    subtitle: 'On-demand broom dusting, corner debris sweep & fragrant herbal pine mopping',
    category: 'service',
    categoryLabel: 'Home Service',
    serviceSlug: 'sweeping-mopping',
    keywords: [
      'sweeping and mopping', 'sweeping', 'mopping', 'floor brooming', 'broom',
      'jhadu', 'pocha', 'dust removal', 'daily maid', 'floor care', 'herbal mopping',
      'floor broom', 'mop'
    ],
    actionType: 'service',
    price: 249,
  },
  {
    id: 'srv-utensil-cleaning',
    title: 'Cookware & Sink Utensil Cleaning',
    subtitle: 'Post-meal dishwashing, pan scrubbing, mesh waste clear & organized rack drying',
    category: 'service',
    categoryLabel: 'Home Service',
    serviceSlug: 'utensil-cleaning',
    keywords: [
      'utensil cleaning', 'dishwashing', 'cleaning dishes', 'dishes', 'cookware',
      'sink', 'bartan', 'pots', 'pans', 'cutlery', 'plates', 'antibacterial wash',
      'dish wash', 'utensils'
    ],
    actionType: 'service',
    price: 35,
  },
  {
    id: 'srv-laundry-ironing',
    title: 'Doorstep Garment Steam Ironing',
    subtitle: 'Commercial steam press, machine wash assistance & neat wardrobe folding',
    category: 'service',
    categoryLabel: 'Home Service',
    serviceSlug: 'laundry-ironing',
    keywords: [
      'laundry and ironing', 'laundry', 'ironing', 'iron', 'steam press', 'steam ironing',
      'clothes', 'garment care', 'kapde', 'clothes folding', 'wardrobe', 'pressing',
      'steam'
    ],
    actionType: 'service',
    price: 25,
  },
  {
    id: 'srv-meal-assistance',
    title: 'Meal Assistance & Food Prep Help',
    subtitle: 'Vegetable chopping, salad prep, kneading dough, batter mix & counter cleanup',
    category: 'service',
    categoryLabel: 'Home Service',
    serviceSlug: 'meal-assistance',
    keywords: [
      'meal assistance', 'food prep', 'meal preparation', 'cooking assistance',
      'vegetable chopping', 'chopping', 'cutting', 'kneading', 'dough', 'salad',
      'kitchen help', 'cooking help', 'food assist', 'cook'
    ],
    actionType: 'service',
    price: 99,
  },
  {
    id: 'srv-and-many-more',
    title: 'Additional Home Chores (And Many More)',
    subtitle: 'Reachable fans, cobwebs, fridge cleaning, wardrobe organization & appliance wipe',
    category: 'service',
    categoryLabel: 'Home Service',
    serviceSlug: 'and-many-more',
    keywords: [
      'and many more', 'additional services', 'fan cleaning', 'cobwebs', 'fridge cleaning',
      'wardrobe organizing', 'appliance exterior', 'window cleaning', 'sofa cushions',
      'more chores', 'miscellaneous help'
    ],
    actionType: 'service',
    price: 49,
  },

  // 2. BOOKING OPTIONS & FLOWS
  {
    id: 'opt-instant-booking',
    title: 'Instant Booking (Help in 6-15 Mins)',
    subtitle: 'Request a verified specialist at your doorstep immediately',
    category: 'booking',
    categoryLabel: 'Booking Option',
    keywords: [
      'instant booking', 'book instant', 'instant', 'urgent', 'now', '6 mins',
      '10 mins', '15 mins', 'emergency help', 'quick help', 'right now', 'fast',
      'instant helper', 'on-demand'
    ],
    actionType: 'booking-instant',
  },
  {
    id: 'opt-schedule-booking',
    title: 'Schedule a Visit (Pick Preferred Slot)',
    subtitle: 'Book ahead for today, tomorrow, or upcoming slots with flexible durations',
    category: 'booking',
    categoryLabel: 'Booking Option',
    keywords: [
      'schedule booking', 'schedule a visit', 'schedule', 'book slot', 'appointment',
      'future booking', 'tomorrow', 'preferred time', 'pick slot', 'date and time',
      'calendar', 'book pro'
    ],
    actionType: 'booking-schedule',
  },

  // 3. CUSTOMER ACCOUNT & BOOKINGS
  {
    id: 'page-my-bookings',
    title: 'My Service Bookings',
    subtitle: 'Track upcoming appointments, professional assignments & booking history',
    category: 'account',
    categoryLabel: 'My Account',
    keywords: [
      'my bookings', 'service bookings', 'bookings', 'appointments', 'orders',
      'order history', 'upcoming visits', 'active bookings', 'booking status',
      'my appointments', 'track booking'
    ],
    url: '/nest/bookings',
    actionType: 'page',
  },
  {
    id: 'page-my-profile',
    title: 'My Profile & Personal Details',
    subtitle: 'Manage your name, contact phone number & registered email address',
    category: 'account',
    categoryLabel: 'My Account',
    keywords: [
      'my profile', 'personal details', 'profile', 'account', 'personal info',
      'name', 'phone', 'email', 'user details', 'customer profile', 'account settings',
      'edit profile'
    ],
    url: '/nest/profile?tab=profile',
    actionType: 'page',
    requiresAuth: true,
  },
  {
    id: 'page-saved-addresses',
    title: 'Saved Addresses',
    subtitle: 'Manage home, work & saved service delivery addresses',
    category: 'account',
    categoryLabel: 'My Account',
    keywords: [
      'saved addresses', 'addresses', 'delivery address', 'home address', 'work address',
      'manage address', 'new address', 'service location', 'saved location', 'address book'
    ],
    url: '/nest/profile?tab=addresses',
    actionType: 'page',
    requiresAuth: true,
  },
  {
    id: 'action-change-location',
    title: 'Select / Change Service Location',
    subtitle: 'Switch your active Bengaluru locality, pincode or check service coverage',
    category: 'page',
    categoryLabel: 'Location',
    keywords: [
      'location', 'change location', 'select location', 'pincode', 'area',
      'bengaluru', 'delivery locality', 'service area', 'delivery address selector'
    ],
    actionType: 'location',
  },

  // 4. NEST PASS & PROMOTIONS
  {
    id: 'promo-nest-pass',
    title: 'Nest Family Pass (15 + 2 Visits)',
    subtitle: '17 visits, priority 6-min specialist dispatch & zero rescheduling penalty',
    category: 'pass',
    categoryLabel: 'Passes & Offers',
    keywords: [
      'nest pass', 'family pass', 'nest family pass', 'chores pass', 'pass',
      'coupons', 'offers', 'subscription', 'multi visit', 'discount pass',
      'nestfamily', 'membership', 'savings'
    ],
    actionType: 'nest-pass',
  },
  {
    id: 'sec-referral',
    title: 'Refer & Earn (Join & Earn ₹100)',
    subtitle: 'Invite your friends and neighbors to HAATZA Nest and earn ₹100 rewards',
    category: 'section',
    categoryLabel: 'Rewards',
    keywords: [
      'refer and earn', 'referral', 'invite friends', 'earn 100', 'join and earn',
      'gift box', 'invite code', 'rewards', 'invite bonus', 'nest100'
    ],
    targetId: 'referral-banner',
    actionType: 'section',
  },

  // 5. PAGES & SECTIONS
  {
    id: 'page-all-services',
    title: 'All Home Help Services',
    subtitle: 'Explore the full catalog of trusted, background-verified home services',
    category: 'page',
    categoryLabel: 'Explore',
    keywords: [
      'all services', 'services', 'browse services', 'catalog', 'service list',
      'home services', 'help services', 'home maintenance'
    ],
    url: '/nest/services',
    actionType: 'page',
  },
  {
    id: 'cat-home-cleaning',
    title: 'Home Cleaning Category',
    subtitle: 'Full house deep cleaning, balcony, sofa & reachable window dust removal',
    category: 'page',
    categoryLabel: 'Category',
    keywords: ['home cleaning category', 'full house', 'sofa', 'window dusting'],
    url: '/nest/services?category=home-cleaning',
    actionType: 'page',
  },
  {
    id: 'cat-kitchen-cleaning',
    title: 'Kitchen Cleaning Category',
    subtitle: 'Degreasing of gas stoves, chimnies, slab scrub & tiles disinfection',
    category: 'page',
    categoryLabel: 'Category',
    keywords: ['kitchen cleaning category', 'chimney degrease', 'stove scrub'],
    url: '/nest/services?category=kitchen-cleaning',
    actionType: 'page',
  },
  {
    id: 'cat-bathroom-cleaning',
    title: 'Bathroom Cleaning Category',
    subtitle: 'Hard water stain removal, mirror polishing & hygienic sanitization',
    category: 'page',
    categoryLabel: 'Category',
    keywords: ['bathroom cleaning category', 'toilet scrub', 'descaling'],
    url: '/nest/services?category=bathroom-cleaning',
    actionType: 'page',
  },
  {
    id: 'cat-sweeping-mopping',
    title: 'Sweeping & Mopping Category',
    subtitle: 'Daily or periodic floor broom, dust removal & fragrant herbal mopping',
    category: 'page',
    categoryLabel: 'Category',
    keywords: ['sweeping mopping category', 'brooming', 'herbal mopping'],
    url: '/nest/services?category=sweeping-mopping',
    actionType: 'page',
  },
  {
    id: 'cat-utensil-cleaning',
    title: 'Utensil Cleaning Category',
    subtitle: 'Post-meal dishwashing, pan scrubbing & organized drying',
    category: 'page',
    categoryLabel: 'Category',
    keywords: ['utensil cleaning category', 'dishwashing', 'dishes sink'],
    url: '/nest/services?category=utensil-cleaning',
    actionType: 'page',
  },
  {
    id: 'cat-laundry-ironing',
    title: 'Laundry & Ironing Category',
    subtitle: 'Steam pressing, machine wash assistance & clothes folding',
    category: 'page',
    categoryLabel: 'Category',
    keywords: ['laundry ironing category', 'steam ironing', 'garment pressing'],
    url: '/nest/services?category=laundry-ironing',
    actionType: 'page',
  },
  {
    id: 'cat-meal-assistance',
    title: 'Meal Assistance Category',
    subtitle: 'Vegetable chopping, salad prep, kneading dough & cooking help',
    category: 'page',
    categoryLabel: 'Category',
    keywords: ['meal assistance category', 'cooking help', 'chopping cutting'],
    url: '/nest/services?category=meal-assistance',
    actionType: 'page',
  },
  {
    id: 'sec-service-scope',
    title: 'Transparent Service Scope (What Is Included)',
    subtitle: 'Honest tasks breakdown: see exactly what specialists do and do not perform',
    category: 'section',
    categoryLabel: 'Section',
    keywords: [
      'service scope', 'what is included', 'transparent scope', 'scope',
      'inclusions', 'exclusions', 'one expert', 'task list', 'transparent pricing'
    ],
    targetId: 'service-scope',
    actionType: 'section',
  },
  {
    id: 'sec-how-it-works',
    title: 'How Haatza Nest Works',
    subtitle: '3 simple steps: choose your service, pick instant or schedule, and relax',
    category: 'section',
    categoryLabel: 'Section',
    keywords: [
      'how it works', 'how nest works', 'how does it work', 'steps', 'process',
      'guide', '3 steps', 'how to use'
    ],
    targetId: 'how-it-works',
    actionType: 'section',
  },
  {
    id: 'sec-explore-services',
    title: 'Explore Our House Help Services',
    subtitle: 'Meet our 7 uniformed specialists caring for every corner of your home',
    category: 'section',
    categoryLabel: 'Section',
    keywords: [
      'explore services', 'uniformed specialists', 'specialists',
      'explore our house help services', 'female specialists', 'meet experts'
    ],
    targetId: 'explore-home-services-heading',
    actionType: 'section',
  },
];

// Levenshtein edit distance for spelling error tolerance
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Common phonetic and transliterated keyword aliases
const ALIAS_MAP: Record<string, string[]> = {
  maid: ['sweeping', 'mopping', 'house cleaning', 'utensils', 'meal prep'],
  bai: ['sweeping', 'mopping', 'utensils', 'house cleaning'],
  jhadu: ['sweeping', 'mopping', 'floor brooming'],
  pocha: ['sweeping', 'mopping', 'floor brooming'],
  bartan: ['dishwashing', 'utensil cleaning', 'dishes'],
  safai: ['cleaning', 'house cleaning', 'bathroom cleaning'],
  cook: ['meal assistance', 'food prep'],
  chef: ['meal assistance', 'food prep'],
  kapde: ['laundry', 'ironing', 'steam press'],
  cloth: ['laundry', 'ironing', 'steam press'],
  cloths: ['laundry', 'ironing', 'steam press'],
  clothes: ['laundry', 'ironing', 'steam press'],
  toilet: ['bathroom cleaning', 'bathroom deep clean'],
  latrine: ['bathroom cleaning'],
  washroom: ['bathroom cleaning'],
  restroom: ['bathroom cleaning'],
  urgent: ['instant booking'],
  now: ['instant booking'],
  fast: ['instant booking'],
  slot: ['schedule booking'],
  tomorrow: ['schedule booking'],
  pass: ['nest pass', 'family pass'],
  discount: ['nest pass', 'refer and earn'],
  coupon: ['nest pass'],
  account: ['my profile', 'my bookings', 'saved addresses'],
  order: ['my bookings'],
  appointment: ['my bookings', 'schedule booking'],
  address: ['saved addresses', 'select location'],
};

export function searchHaatzaNest(
  rawQuery: string,
  options: {
    isAvailable: boolean;
    vendorAvailable: boolean;
    isScheduleAvailable: boolean;
    isAuthenticated: boolean;
    customerName?: string;
  }
): SearchMatch[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const queryWords = query.split(/\s+/).filter(Boolean);

  // Expand query with synonyms
  const expandedQueryTokens = new Set<string>(queryWords);
  queryWords.forEach((word) => {
    if (ALIAS_MAP[word]) {
      ALIAS_MAP[word].forEach((alias) => {
        alias.split(/\s+/).forEach((t) => expandedQueryTokens.add(t));
      });
    }
  });

  const matches: SearchMatch[] = [];

  for (const item of STATIC_SEARCH_ITEMS) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const subtitleLower = item.subtitle.toLowerCase();

    // 1. Exact title or category match
    if (titleLower === query) {
      score += 200;
    } else if (titleLower.startsWith(query)) {
      score += 120;
    } else if (titleLower.includes(query)) {
      score += 80;
    }

    // 2. Subtitle check
    if (subtitleLower.includes(query)) {
      score += 40;
    }

    // 3. Keyword matches
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower === query) {
        score += 100;
        break;
      } else if (kwLower.startsWith(query)) {
        score += 70;
      } else if (kwLower.includes(query)) {
        score += 50;
      }
    }

    // 4. Token-by-token matching
    let allTokensMatched = true;
    for (const token of queryWords) {
      const tokenInTitle = titleLower.includes(token);
      const tokenInSubtitle = subtitleLower.includes(token);
      const tokenInKeywords = item.keywords.some((k) => k.toLowerCase().includes(token));

      if (tokenInTitle) {
        score += 30;
      } else if (tokenInKeywords) {
        score += 20;
      } else if (tokenInSubtitle) {
        score += 10;
      } else {
        // Check for spelling mistakes (fuzzy match with levenshtein)
        let foundFuzzy = false;
        if (token.length >= 4) {
          // Check title words
          for (const word of titleLower.split(/\s+/)) {
            if (levenshteinDistance(token, word) <= 1) {
              score += 25;
              foundFuzzy = true;
              break;
            }
          }
          // Check keywords
          if (!foundFuzzy) {
            for (const kw of item.keywords) {
              for (const word of kw.toLowerCase().split(/\s+/)) {
                if (levenshteinDistance(token, word) <= 1) {
                  score += 18;
                  foundFuzzy = true;
                  break;
                }
              }
              if (foundFuzzy) break;
            }
          }
        }

        if (!foundFuzzy) {
          // Check expanded aliases
          let foundAlias = false;
          for (const expToken of expandedQueryTokens) {
            if (titleLower.includes(expToken) || item.keywords.some((k) => k.toLowerCase().includes(expToken))) {
              score += 15;
              foundAlias = true;
              break;
            }
          }
          if (!foundAlias) {
            allTokensMatched = false;
          }
        }
      }
    }

    if (allTokensMatched) {
      score += 40;
    }

    // Determine availability status based on application state
    let availabilityStatus: SearchMatch['availabilityStatus'] = 'available';
    let statusText: string | undefined;

    if (item.category === 'service') {
      if (!options.isAvailable) {
        availabilityStatus = 'unavailable';
        statusText = 'Unavailable in selected area';
      } else {
        statusText = item.price ? `Starts ₹${item.price}` : 'Available';
      }
    } else if (item.actionType === 'booking-instant') {
      if (!options.isAvailable) {
        availabilityStatus = 'unavailable';
        statusText = 'Area not covered';
      } else if (!options.vendorAvailable) {
        availabilityStatus = 'busy';
        statusText = 'Specialists currently busy';
      } else {
        statusText = 'Arriving in 6-15 mins';
      }
    } else if (item.actionType === 'booking-schedule') {
      if (!options.isAvailable) {
        availabilityStatus = 'unavailable';
        statusText = 'Area not covered';
      } else if (!options.isScheduleAvailable) {
        availabilityStatus = 'busy';
        statusText = 'No slots available';
      } else {
        statusText = 'Slots available';
      }
    } else if (item.requiresAuth) {
      if (!options.isAuthenticated) {
        availabilityStatus = 'requires-auth';
        statusText = 'Sign in required';
      } else if (options.customerName && item.id === 'page-my-profile') {
        statusText = `Hi, ${options.customerName.split(' ')[0]}`;
      }
    }

    if (score > 15) {
      matches.push({
        item,
        score,
        availabilityStatus,
        statusText,
      });
    }
  }

  // Sort by score descending
  return matches.sort((a, b) => b.score - a.score);
}
