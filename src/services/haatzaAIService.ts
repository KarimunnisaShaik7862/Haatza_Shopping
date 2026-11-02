import { ChatRequestPayload, ChatResponsePayload, HaatzaSection } from '../types/ai';

/**
 * Configuration for the Haatza AI Service.
 * Backend URL can be set via VITE_AI_API_URL in .env
 */
const AI_API_URL = import.meta.env.VITE_AI_API_URL || '';
const REQUEST_TIMEOUT_MS = 12000;

export const isLiveAIConfigured = (): boolean => {
  return Boolean(AI_API_URL && AI_API_URL.trim().length > 0);
};

export const getAIApiEndpoint = (): string => {
  return AI_API_URL || 'DEMO_MODE (No backend configured)';
};

/**
 * Intelligent domain-aware response generator for Demo Mode.
 * Demonstrates context-awareness across Haatza Shopping, Lite, and Nest.
 */
function generateDemoResponse(request: ChatRequestPayload): ChatResponsePayload {
  const query = request.message.toLowerCase().trim();
  const section = request.section;

  // Global / General intent
  if (query.includes('what is haatza') || query.includes('about haatza') || query.includes('who are you')) {
    return {
      reply: `Haatza brings three experiences into one platform:

- **Haatza Shopping**: Online marketplace for fashion, electronics, and home essentials.
- **Haatza Lite**: Fast 10–15 minute delivery for fresh groceries and daily essentials.
- **Haatza Nest**: On-demand home services including professional deep cleaning and maintenance.

You can switch between them anytime from the top bar. What can I help you explore?`,
      section,
    };
  }

  // Haatza Nest intent
  if (query.includes('nest') || query.includes('clean') || query.includes('home help') || query.includes('service') || query.includes('maid') || query.includes('plumb') || query.includes('repair')) {
    return {
      reply: `**Haatza Nest** provides verified, background-checked on-demand home services:

- **Full Home Deep Cleaning**: Dust extraction, floor scrubbing & sanitization
- **Kitchen & Bathroom Cleaning**: Deep degreasing, stain removal & disinfection
- **Quick Home Repairs**: Certified electricians, plumbers & carpentry

Visit the **Nest** tab in the top navigation to schedule a service or view your active bookings.`,
      section: 'nest',
    };
  }

  // Haatza Lite intent
  if (query.includes('lite') || query.includes('grocery') || query.includes('groceries') || query.includes('fruit') || query.includes('vegetable') || query.includes('milk') || query.includes('snack') || query.includes('10 min') || query.includes('fast delivery')) {
    return {
      reply: `**Haatza Lite** delivers everyday groceries and household necessities in **10–15 minutes**:

- **Fresh Fruits & Vegetables**: Farm-sourced daily produce
- **Dairy & Breakfast**: Fresh milk, bread, butter, eggs, and paneer
- **Snacks & Beverages**: Quick bites, cold drinks, tea & coffee
- **Household & Cleaning**: Detergents, paper towels, and toiletries

Switch to the **Lite** tab at the top to start your quick-delivery basket.`,
      section: 'lite',
    };
  }

  // Haatza Shopping intent
  if (query.includes('shopping') || query.includes('product') || query.includes('fashion') || query.includes('electronics') || query.includes('discount') || query.includes('deal') || query.includes('under 49') || query.includes('phone') || query.includes('clothes')) {
    return {
      reply: `**Haatza Shopping** is our primary marketplace offering thousands of curated items:

- **Trending Fashion**: Casuals, footwear, and accessories
- **Electronics & Tech**: Audio, phone accessories, and smart devices
- **Deals & Essentials**: Value items including Under ₹49 deals

You can search for products, view order statuses, or manage your wishlist directly from the main store.`,
      section: 'shopping',
    };
  }

  // Order / Tracking intent
  if (query.includes('track') || query.includes('order') || query.includes('delivery status') || query.includes('where is my order')) {
    return {
      reply: `📦 You can track all your active deliveries directly in your Haatza account!

- For **Haatza Shopping**: Head to **Orders & Returns** in the top navigation or profile to view live tracking & courier updates.
- For **Haatza Lite**: Check your order tracker on the Lite home screen for minute-by-minute rider dispatch.
- For **Haatza Nest**: View your scheduled technician arrival under **My Bookings**.

Would you like to open the Orders page?`,
      suggestions: [
        'Go to My Orders',
        'Help with Returns & Refunds',
        'Contact Customer Support',
      ],
      section,
    };
  }

  // Context-specific fallback
  if (section === 'nest') {
    return {
      reply: `I'm here to assist you with **Haatza Nest**. You can ask me about scheduling a home clean, service pricing, technician vetting, or managing your current bookings.

How can I help make your home sparkle today?`,
      suggestions: [
        'Book Deep Cleaning',
        'View My Bookings',
        'Switch to Haatza Shopping',
      ],
      section: 'nest',
    };
  }

  if (section === 'lite') {
    return {
      reply: `Welcome to **Haatza Lite**! I can help you locate quick grocery items, check estimated delivery times, or navigate our fresh produce catalog.

What items are you looking to add to your cart?`,
      suggestions: [
        'Browse Fresh Vegetables',
        'Find Snack Deals',
        'What is delivery time?',
      ],
      section: 'lite',
    };
  }

  // Default Shopping fallback
  return {
    reply: `I can help you discover products, compare deals, locate categories, or track orders across Haatza!

Try asking me about:
- Top deals or items under ₹49
- Fast grocery delivery on Haatza Lite
- Professional home cleaning on Haatza Nest
- Shipping, returns, and order assistance`,
    suggestions: [
      'What is Haatza?',
      'Help me explore Haatza Nest',
      'What can I do with Haatza Lite?',
      'Help me find products on Haatza Shopping',
    ],
    section: 'shopping',
  };
}

/**
 * Sends a chat message to the configured backend API, or gracefully
 * executes Demo Mode if no backend endpoint is configured or if the server is offline.
 */
export async function sendChatMessage(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
  const liveAvailable = isLiveAIConfigured();

  // If live AI is not configured, simulate realistic conversational delay and respond via Demo Mode
  if (!liveAvailable) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return generateDemoResponse(payload);
  }

  // When live backend is configured, send HTTP POST request to API
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`AI service responded with HTTP status ${response.status}`);
    }

    const data = await response.json();

    if (!data || typeof data.reply !== 'string' || data.reply.trim().length === 0) {
      throw new Error('Received an empty or invalid response from the AI service.');
    }

    return {
      reply: data.reply,
      suggestions: Array.isArray(data.suggestions) ? data.suggestions : undefined,
      section: data.section || payload.section,
      timestamp: data.timestamp || Date.now(),
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. The AI service took too long to respond. Please try again.');
    }

    // Network error or offline backend
    const errorMessage = error instanceof Error ? error.message : 'Unknown network error';
    throw new Error(`Unable to connect to Haatza AI service (${errorMessage}). Please check your connection or switch to Demo Mode.`);
  }
}
