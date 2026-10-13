/**
 * Utility to optimize static and remote product/banner image URLs.
 * Dynamically adjusts width, quality, and modern format flags (WebP/AVIF)
 * on supported CDNs (such as Unsplash) to prevent massive GPU texture decodes
 * and conserve browser memory.
 */

export interface ImageOptimizeOptions {
  width?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif';
}

/**
 * Optimizes an image URL for the requested display dimensions.
 * For Unsplash images, updates query params (?w=...&q=...&auto=format).
 * Safely falls back to the original URL for local assets or unknown origins.
 */
export function optimizeImageUrl(
  url: string | undefined | null,
  options: ImageOptimizeOptions = {}
): string {
  if (!url) return '';

  const { width = 360, quality = 75, format = 'auto' } = options;

  // Unsplash CDN supports dynamic server-side resizing & compression
  if (url.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('auto', format);
      parsed.searchParams.set('fit', 'crop');
      parsed.searchParams.set('w', String(width));
      parsed.searchParams.set('q', String(quality));
      return parsed.toString();
    } catch {
      // If URL parsing fails, do standard regex replacement
      let result = url;
      if (result.includes('w=')) {
        result = result.replace(/w=\d+/, `w=${width}`);
      } else {
        result += `&w=${width}`;
      }
      if (result.includes('q=')) {
        result = result.replace(/q=\d+/, `q=${quality}`);
      } else {
        result += `&q=${quality}`;
      }
      return result;
    }
  }

  return url;
}
