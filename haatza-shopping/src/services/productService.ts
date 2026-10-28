import { DestinationType, FilterState, Product } from '../types';
import { mockProducts } from './mock/data/products';
import { mockUnder49Products } from './mock/data/promotions';
import { mockMensFashionProducts } from '../data/mensFashionProducts.data';
import { mockWomensFashionProducts } from '../data/womensFashionProducts.data';
import { catalogProducts } from '../data/catalogProducts.data';

export const ALL_MOCK_PRODUCTS: Product[] = [
  ...mockProducts,
  ...mockUnder49Products,
  ...mockMensFashionProducts,
  ...mockWomensFashionProducts,
  ...catalogProducts,
];

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    // Simulating async network delay for realism
    return [...ALL_MOCK_PRODUCTS];
  },

  async getProducts(
    filter?: Partial<FilterState> & { gender?: 'men' | 'women' },
    destination?: DestinationType,
    genderParam?: 'men' | 'women'
  ): Promise<Product[]> {
    let list = [...ALL_MOCK_PRODUCTS];

    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }

    const effectiveGender = genderParam || filter?.gender;

    // Apply strict gender isolation when specified
    if (effectiveGender === 'men') {
      list = list.filter(
        (p) =>
          !p.tags?.some((t) => ['women', 'womens', 'girls'].includes(t.toLowerCase())) &&
          p.categoryId !== 'cat-women-fashion'
      );
    } else if (effectiveGender === 'women') {
      list = list.filter(
        (p) =>
          (p.categoryId === 'cat-women-fashion' ||
            p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))) &&
          !p.tags?.some((t) => ['men', 'mens', 'boys'].includes(t.toLowerCase()))
      );
    }

    if (filter?.category) {
      const catSlug = filter.category.toLowerCase().trim();

      if (catSlug === 'under-49') {
        list = list.filter((p) => p.price <= 49 || p.tags?.some((t) => t.toLowerCase() === 'under49'));
      } else if (catSlug === 'deals') {
        list = list.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 35);
      } else if (catSlug === 'men-fashion' || catSlug === 'men') {
        // All Men's Fashion: Strictly male items
        list = list.filter(
          (p) =>
            (p.categoryId === 'cat-men-fashion' ||
              p.categoryName?.toLowerCase().includes("men's") ||
              p.tags?.some((t) => ['men', 'mens', 'mens-fashion'].includes(t.toLowerCase()))) &&
            !p.tags?.some((t) => ['women', 'womens', 'saree', 'sarees', 'kurti', 'kurtis'].includes(t.toLowerCase()))
        );
      } else if (catSlug === 'women-fashion' || catSlug === 'women') {
        // All Women's Fashion: Strictly female items
        list = list.filter(
          (p) =>
            (p.categoryId === 'cat-women-fashion' ||
              p.categoryName?.toLowerCase().includes("women") ||
              p.tags?.some((t) => ['women', 'womens', 'womens-fashion'].includes(t.toLowerCase()))) &&
            !p.tags?.some((t) => t.toLowerCase() === 'men' || t.toLowerCase() === 'boys')
        );
      }

      // ==========================================
      // WOMEN'S FASHION CATEGORIES (When in women context or women category slug)
      // ==========================================
      else if (
        effectiveGender === 'women' ||
        ['ethnic-wear', 'western-wear', 'dresses', 'sarees', 'kurtis', 'anarkalis', 'lehengas', 'dupattas'].includes(catSlug)
      ) {
        if (
          catSlug === 'kurtas' ||
          catSlug === 'kurtis' ||
          catSlug === 'kurti' ||
          catSlug === 'straight-kurtas' ||
          catSlug === 'a-line-kurtas' ||
          catSlug === 'printed-kurtas'
        ) {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['kurtis', 'kurtas', 'kurti', 'kurta'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('kurti') ||
              p.subcategoryId?.toLowerCase().includes('kurta')
          );
        } else if (
          catSlug === 'kurta-sets' ||
          catSlug === 'ethnic-sets' ||
          catSlug === 'three-piece-kurta-sets' ||
          catSlug === 'churidar-sets'
        ) {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['ethnic-sets', 'kurta-sets', 'kurtis', 'kurtas'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('ethnic-set')
          );
        } else if (
          catSlug === 'anarkali' ||
          catSlug === 'anarkalis' ||
          catSlug === 'anarkali-suits' ||
          catSlug === 'salwar-suits' ||
          catSlug === 'salwar'
        ) {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['anarkali', 'anarkalis', 'salwar', 'ethnic-sets'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('anarkali')
          );
        } else if (catSlug === 'sarees' || catSlug === 'saree') {
          list = list.filter((p) => p.tags?.some((t) => ['sarees', 'saree'].includes(t.toLowerCase())));
        } else if (catSlug === 'lehengas' || catSlug === 'lehenga') {
          list = list.filter((p) => p.tags?.some((t) => ['lehengas', 'lehenga'].includes(t.toLowerCase())));
        } else if (catSlug === 'dupattas' || catSlug === 'dupatta') {
          list = list.filter((p) => p.tags?.some((t) => ['dupattas', 'dupatta'].includes(t.toLowerCase())));
        } else if (
          catSlug === 'ethnic-coord-sets' ||
          catSlug === 'ethnic-bottomwear' ||
          catSlug === 'palazzos' ||
          catSlug === 'shararas'
        ) {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['ethnic-sets', 'ethnic', 'kurtis'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('ethnic-set')
          );
        } else if (catSlug === 'tops' || catSlug === 'blouses' || catSlug === 'top') {
          list = list.filter((p) => p.tags?.some((t) => ['tops', 'blouse', 'top'].includes(t.toLowerCase())));
        } else if (catSlug === 't-shirts' || catSlug === 'tshirts' || catSlug === 'women-tshirts') {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['women-tshirts', 't-shirts', 't-shirt'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('tshirts')
          );
        } else if (catSlug === 'shirts' || catSlug === 'women-shirts') {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['women-shirts', 'shirts', 'shirt', 'tops'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('shirt')
          );
        } else if (catSlug === 'jeans' || catSlug === 'women-jeans' || catSlug === 'jeggings') {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['women-jeans', 'jeans', 'denim'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('jean')
          );
        } else if (catSlug === 'trousers' || catSlug === 'women-trousers' || catSlug === 'pants') {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['women-trousers', 'trousers', 'pants'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('trouser')
          );
        } else if (catSlug === 'leggings' || catSlug === 'tights') {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['tights', 'leggings'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('tight')
          );
        } else if (catSlug === 'skirts' || catSlug === 'shorts') {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['skirts', 'skirt', 'shorts'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('skirt')
          );
        } else if (catSlug === 'coord-sets') {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['loungewear', 'co-ord'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('lounge')
          );
        } else if (
          catSlug === 'dresses' ||
          catSlug === 'casual-dresses' ||
          catSlug === 'maxi-dresses' ||
          catSlug === 'midi-dresses' ||
          catSlug === 'party-dresses' ||
          catSlug === 'summer-dresses' ||
          catSlug === 'bodycon-dresses'
        ) {
          list = list.filter(
            (p) =>
              p.tags?.some((t) =>
                ['dresses', 'maxi-dresses', 'midi-dresses', 'party-dresses'].includes(t.toLowerCase())
              ) || p.subcategoryId?.toLowerCase().includes('dress')
          );
        } else if (catSlug === 'jumpsuits') {
          list = list.filter(
            (p) =>
              p.tags?.some((t) => ['jumpsuits', 'jumpsuit'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('jumpsuit')
          );
        } else if (
          catSlug === 'footwear' ||
          catSlug === 'heels' ||
          catSlug === 'flats' ||
          catSlug === 'sneakers' ||
          catSlug === 'casual-shoes' ||
          catSlug === 'slippers' ||
          catSlug === 'boots' ||
          catSlug === 'juttis' ||
          catSlug === 'sandals'
        ) {
          if (catSlug === 'heels') {
            list = list.filter((p) => p.tags?.some((t) => ['heels', 'heel'].includes(t.toLowerCase())));
          } else if (catSlug === 'flats') {
            list = list.filter((p) => p.tags?.some((t) => ['flats', 'flat', 'ballerina'].includes(t.toLowerCase())));
          } else if (catSlug === 'sneakers') {
            list = list.filter((p) => p.tags?.some((t) => ['women-sneakers', 'sneakers'].includes(t.toLowerCase())));
          } else if (catSlug === 'juttis') {
            list = list.filter((p) => p.tags?.some((t) => ['juttis', 'jutti', 'mojari'].includes(t.toLowerCase())));
          } else if (catSlug === 'sandals') {
            list = list.filter((p) => p.tags?.some((t) => ['sandals', 'sandal'].includes(t.toLowerCase())));
          } else {
            list = list.filter(
              (p) =>
                p.tags?.some((t) => ['footwear', 'heels', 'flats', 'shoes', 'sandals'].includes(t.toLowerCase())) ||
                p.subcategoryId?.toLowerCase().includes('foot') ||
                p.subcategoryId?.toLowerCase().includes('heel')
            );
          }
        } else if (
          catSlug === 'handbags' ||
          catSlug === 'totes' ||
          catSlug === 'tote-bags' ||
          catSlug === 'shoulder-bags' ||
          catSlug === 'crossbody' ||
          catSlug === 'sling-bags' ||
          catSlug === 'clutches' ||
          catSlug === 'wallets' ||
          catSlug === 'purses' ||
          catSlug === 'backpacks'
        ) {
          if (catSlug === 'totes' || catSlug === 'tote-bags') {
            list = list.filter((p) => p.tags?.some((t) => ['totes', 'tote'].includes(t.toLowerCase())));
          } else if (catSlug === 'shoulder-bags' || catSlug === 'purses') {
            list = list.filter((p) => p.tags?.some((t) => ['shoulder-bags', 'shoulder-bag'].includes(t.toLowerCase())));
          } else if (catSlug === 'crossbody' || catSlug === 'sling-bags') {
            list = list.filter((p) => p.tags?.some((t) => ['crossbody', 'sling'].includes(t.toLowerCase())));
          } else if (catSlug === 'clutches') {
            list = list.filter((p) => p.tags?.some((t) => ['clutches', 'clutch'].includes(t.toLowerCase())));
          } else if (catSlug === 'wallets') {
            list = list.filter((p) => p.tags?.some((t) => ['women-wallets', 'wallets'].includes(t.toLowerCase())));
          } else {
            list = list.filter(
              (p) =>
                p.tags?.some((t) => ['handbags', 'bags', 'totes', 'crossbody'].includes(t.toLowerCase())) ||
                p.subcategoryId?.toLowerCase().includes('bag')
            );
          }
        } else if (
          catSlug === 'jewelry' ||
          catSlug === 'jewellery' ||
          catSlug === 'earrings' ||
          catSlug === 'necklaces' ||
          catSlug === 'chains' ||
          catSlug === 'bracelets' ||
          catSlug === 'bangles' ||
          catSlug === 'rings' ||
          catSlug === 'hair-accessories' ||
          catSlug === 'sunglasses' ||
          catSlug === 'watches'
        ) {
          if (catSlug === 'earrings') {
            list = list.filter((p) => p.tags?.some((t) => ['earrings', 'jhumka', 'jhumkas'].includes(t.toLowerCase())));
          } else if (catSlug === 'necklaces' || catSlug === 'chains') {
            list = list.filter((p) => p.tags?.some((t) => ['necklaces', 'necklace', 'choker'].includes(t.toLowerCase())));
          } else if (catSlug === 'bracelets' || catSlug === 'bangles') {
            list = list.filter((p) => p.tags?.some((t) => ['bracelets', 'bangles', 'bracelet'].includes(t.toLowerCase())));
          } else if (catSlug === 'sunglasses') {
            list = list.filter((p) => p.tags?.some((t) => ['women-sunglasses', 'sunglasses'].includes(t.toLowerCase())));
          } else {
            list = list.filter(
              (p) =>
                p.tags?.some((t) => ['jewelry', 'earrings', 'necklaces'].includes(t.toLowerCase())) ||
                p.subcategoryId?.toLowerCase().includes('jewel')
            );
          }
        } else if (
          catSlug === 'activewear' ||
          catSlug === 'sports-bras' ||
          catSlug === 'sports-tops' ||
          catSlug === 'track-pants' ||
          catSlug === 'loungewear' ||
          catSlug === 'lounge-sets' ||
          catSlug === 'nightwear'
        ) {
          if (catSlug === 'sports-bras') {
            list = list.filter((p) => p.tags?.some((t) => ['sports-bras', 'sports-bra'].includes(t.toLowerCase())));
          } else if (catSlug === 'loungewear' || catSlug === 'lounge-sets') {
            list = list.filter((p) => p.tags?.some((t) => ['loungewear', 'co-ord'].includes(t.toLowerCase())));
          } else if (catSlug === 'nightwear') {
            list = list.filter((p) => p.tags?.some((t) => ['women-nightwear', 'nightwear'].includes(t.toLowerCase())));
          } else {
            list = list.filter(
              (p) =>
                p.tags?.some((t) => ['activewear', 'tights', 'loungewear'].includes(t.toLowerCase())) ||
                p.subcategoryId?.toLowerCase().includes('active')
            );
          }
        } else {
          list = list.filter(
            (p) =>
              p.categoryId.toLowerCase().includes(catSlug) ||
              p.slug.toLowerCase().includes(catSlug) ||
              p.categoryName.toLowerCase().includes(catSlug) ||
              p.subcategoryId?.toLowerCase().includes(catSlug) ||
              p.subcategoryName?.toLowerCase().includes(catSlug) ||
              p.tags?.some((t) => t.toLowerCase().includes(catSlug))
          );
        }
      }

      // ==========================================
      // MEN'S SPECIFIC CATEGORIES
      // ==========================================
      else if (
        catSlug === 'kurtas' ||
        catSlug === 'kurta' ||
        catSlug === 'mens-kurtas' ||
        catSlug === 'kurta-pajamas' ||
        catSlug === 'ethnic-sets'
      ) {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) => ['kurtas', 'kurta', 'mens-kurtas', 'ethnic-sets'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('kurta')) &&
            !p.tags?.some((t) => ['women', 'womens', 'kurti', 'kurtis'].includes(t.toLowerCase()))
        );
      } else if (
        catSlug === 'shirts' ||
        catSlug === 'shirt' ||
        catSlug === 'mens-shirts' ||
        catSlug === 'casual-shirts' ||
        catSlug === 'formal-shirts' ||
        catSlug === 'printed-shirts'
      ) {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) => ['shirts', 'shirt', 'mens-shirts'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('shirt')) &&
            !p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))
        );
      } else if (catSlug === 'jeans' || catSlug === 'denim' || catSlug === 'mens-jeans') {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) => ['jeans', 'denim', 'mens-jeans'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('jean')) &&
            !p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))
        );
      } else if (
        catSlug === 't-shirts' ||
        catSlug === 'tshirts' ||
        catSlug === 't-shirt' ||
        catSlug === 'mens-tshirts' ||
        catSlug === 'polo-t-shirts'
      ) {
        list = list.filter(
          (p) =>
            p.tags?.some((t) => ['t-shirts', 'tshirts', 't-shirt', 'mens-tshirts'].includes(t.toLowerCase())) &&
            !p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))
        );
      } else if (
        catSlug === 'trousers' ||
        catSlug === 'mens-trousers' ||
        catSlug === 'chinos' ||
        catSlug === 'casual-trousers' ||
        catSlug === 'formal-trousers'
      ) {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) => ['trousers', 'mens-trousers', 'chinos'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('trouser')) &&
            !p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))
        );
      } else if (catSlug === 'shorts' || catSlug === 'mens-shorts') {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) => ['shorts', 'mens-shorts'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('short')) &&
            !p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))
        );
      } else if (catSlug === 'track-pants' || catSlug === 'joggers' || catSlug === 'mens-track-pants') {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) => ['track-pants', 'joggers', 'mens-track-pants'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('track-pant')) &&
            !p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))
        );
      } else if (catSlug === 'innerwear' || catSlug === 'mens-innerwear' || catSlug === 'briefs') {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) => ['innerwear', 'mens-innerwear', 'briefs'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('innerwear')) &&
            !p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))
        );
      } else if (
        catSlug === 'formal' ||
        catSlug === 'formal-wear' ||
        catSlug === 'blazers' ||
        catSlug === 'suits' ||
        catSlug === 'hoodies' ||
        catSlug === 'sweaters' ||
        catSlug === 'jackets' ||
        catSlug === 'sweatshirts'
      ) {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) => ['formal', 'formal-wear', 'blazer', 'suit', 'jackets', 'sweatshirt'].includes(t.toLowerCase())) ||
              p.subcategoryId?.toLowerCase().includes('formal') ||
              p.subcategoryId?.toLowerCase().includes('jacket') ||
              p.subcategoryId?.toLowerCase().includes('sweatshirt')) &&
            !p.tags?.some((t) => ['women', 'womens'].includes(t.toLowerCase()))
        );
      } else if (
        catSlug === 'footwear' ||
        catSlug === 'shoes' ||
        catSlug === 'casual-shoes' ||
        catSlug === 'running-shoes' ||
        catSlug === 'sneakers' ||
        catSlug === 'formal-shoes' ||
        catSlug === 'loafers' ||
        catSlug === 'boots' ||
        catSlug === 'sandals' ||
        catSlug === 'slippers' ||
        catSlug === 'clogs'
      ) {
        list = list.filter(
          (p) =>
            (p.tags?.some((t) =>
              ['footwear', 'shoes', 'casual-shoes', 'running-shoes', 'sneakers', 'formal-shoes', 'sandals', 'slippers'].includes(
                t.toLowerCase()
              )
            ) ||
              p.subcategoryId?.toLowerCase().includes('footwear') ||
              p.name.toLowerCase().includes('shoe') ||
              p.name.toLowerCase().includes('sneaker') ||
              p.name.toLowerCase().includes('sandal') ||
              p.name.toLowerCase().includes('loafer') ||
              p.name.toLowerCase().includes('boot')) &&
            !p.tags?.some((t) => ['women', 'womens', 'heels'].includes(t.toLowerCase()))
        );
      } else if (
        catSlug === 'watches' ||
        catSlug === 'watch' ||
        catSlug === 'analog-watch' ||
        catSlug === 'analog-watches' ||
        catSlug === 'digital-watches' ||
        catSlug === 'smartwatch' ||
        catSlug === 'smartwatches' ||
        catSlug === 'casual-watches' ||
        catSlug === 'formal-watches'
      ) {
        list = list.filter(
          (p) =>
            p.tags?.some((t) => ['watches', 'watch', 'analog-watch', 'smartwatch'].includes(t.toLowerCase())) ||
            p.subcategoryId?.toLowerCase().includes('watch') ||
            p.name.toLowerCase().includes('watch')
        );
      } else if (
        catSlug === 'bags' ||
        catSlug === 'backpack' ||
        catSlug === 'backpacks' ||
        catSlug === 'laptop-bag' ||
        catSlug === 'laptop-bags' ||
        catSlug === 'sling-bags' ||
        catSlug === 'travel-bags' ||
        catSlug === 'duffle-bags' ||
        catSlug === 'messenger-bags'
      ) {
        list = list.filter(
          (p) =>
            p.tags?.some((t) => ['bags', 'backpack', 'laptop-bag', 'travel-bag'].includes(t.toLowerCase())) ||
            p.subcategoryId?.toLowerCase().includes('bag')
        );
      } else if (
        catSlug === 'belts-wallets' ||
        catSlug === 'belt' ||
        catSlug === 'belts' ||
        catSlug === 'wallet' ||
        catSlug === 'wallets' ||
        catSlug === 'card-holders' ||
        catSlug === 'travel-wallets'
      ) {
        list = list.filter(
          (p) =>
            p.tags?.some((t) => ['belts-wallets', 'belt', 'wallet'].includes(t.toLowerCase())) ||
            p.subcategoryId?.toLowerCase().includes('belt') ||
            p.subcategoryId?.toLowerCase().includes('wallet')
        );
      } else if (
        catSlug === 'jewelry' ||
        catSlug === 'chains' ||
        catSlug === 'bracelets' ||
        catSlug === 'rings' ||
        catSlug === 'sunglasses' ||
        catSlug === 'caps' ||
        catSlug === 'wallet-accessories'
      ) {
        list = list.filter(
          (p) =>
            p.tags?.some((t) => ['jewelry', 'chains', 'bracelets', 'rings', 'sunglasses'].includes(t.toLowerCase())) ||
            p.subcategoryId?.toLowerCase().includes('jewel') ||
            p.name.toLowerCase().includes('chain') ||
            p.name.toLowerCase().includes('ring') ||
            p.name.toLowerCase().includes('bracelet') ||
            p.name.toLowerCase().includes('sunglass')
        );
      } else if (
        catSlug === 'kids-wear' ||
        catSlug === 'boys-clothing' ||
        catSlug === 'girls-clothing' ||
        catSlug === 'kids-tshirts' ||
        catSlug === 'kids-shirts' ||
        catSlug === 'kids-bottomwear' ||
        catSlug === 'kids-ethnicwear' ||
        catSlug === 'kids-dresses' ||
        catSlug === 'kids-footwear'
      ) {
        list = list.filter((p) =>
          p.tags?.some((t) =>
            ['kids', 'kids-wear', 'boys', 'girls', 'boys-clothing', 'girls-clothing'].includes(t.toLowerCase())
          )
        );
      } else {
        list = list.filter(
          (p) =>
            p.categoryId.toLowerCase().includes(catSlug) ||
            p.slug.toLowerCase().includes(catSlug) ||
            p.categoryName.toLowerCase().includes(catSlug) ||
            p.subcategoryId?.toLowerCase().includes(catSlug) ||
            p.subcategoryName?.toLowerCase().includes(catSlug) ||
            p.tags?.some((t) => t.toLowerCase().includes(catSlug))
        );
      }
    }

    if (filter?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= (filter.minPrice || 0));
    }

    if (filter?.maxPrice !== undefined && filter.maxPrice > 0) {
      list = list.filter((p) => p.price <= (filter.maxPrice || Infinity));
    }

    if (filter?.brands && filter.brands.length > 0) {
      list = list.filter((p) => filter.brands?.includes(p.brand));
    }

    if (filter?.sizes && filter.sizes.length > 0) {
      list = list.filter((p) =>
        p.variants?.some((v) =>
          filter.sizes?.some((s) => v.value.toLowerCase().includes(s.toLowerCase()))
        )
      );
    }

    if (filter?.minRating !== undefined && filter.minRating > 0) {
      list = list.filter((p) => p.rating >= (filter.minRating || 0));
    }

    if (filter?.discountRanges && filter.discountRanges.length > 0) {
      const minDiscount = Math.min(...filter.discountRanges);
      list = list.filter((p) => p.discountPercentage >= minDiscount);
    }

    if (filter?.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    if (filter?.sortBy) {
      switch (filter.sortBy) {
        case 'price_low':
          list.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          list.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          list.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
          break;
        default:
          // 'featured'
          list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
      }
    }

    return list;
  },

  async getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
    const found = ALL_MOCK_PRODUCTS.find(
      (p) => p.id === idOrSlug || p.slug.toLowerCase() === idOrSlug.toLowerCase()
    );
    return found ? { ...found } : null;
  },

  async getTrendingProducts(destination?: DestinationType, limit: number = 8): Promise<Product[]> {
    let list = ALL_MOCK_PRODUCTS.filter((p) => p.isTrending);
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    return list.slice(0, limit);
  },

  async getMensTrending(limit: number = 10): Promise<Product[]> {
    return mockMensFashionProducts
      .filter((p) => p.isTrending || p.isBestseller)
      .slice(0, limit);
  },

  async getWomensTrending(limit: number = 10): Promise<Product[]> {
    return mockWomensFashionProducts
      .filter((p) => p.isTrending || p.isBestseller)
      .slice(0, limit);
  },

  async getMensDeals(limit: number = 10): Promise<Product[]> {
    return mockMensFashionProducts
      .filter((p) => p.isDealOfTheDay || p.discountPercentage >= 40)
      .slice(0, limit);
  },

  async getWomensDeals(limit: number = 10): Promise<Product[]> {
    return mockWomensFashionProducts
      .filter((p) => p.isDealOfTheDay || p.discountPercentage >= 40)
      .slice(0, limit);
  },

  async getMensBudgetProducts(maxPrice: number = 999, limit: number = 10): Promise<Product[]> {
    return mockMensFashionProducts
      .filter((p) => p.price <= maxPrice)
      .slice(0, limit);
  },

  async getWomensBudgetProducts(maxPrice: number = 999, limit: number = 10): Promise<Product[]> {
    return mockWomensFashionProducts
      .filter((p) => p.price <= maxPrice)
      .slice(0, limit);
  },

  async getBestsellers(destination?: DestinationType, limit: number = 8): Promise<Product[]> {
    let list = ALL_MOCK_PRODUCTS.filter((p) => p.isBestseller);
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    return list.slice(0, limit);
  },

  async getNewArrivals(destination?: DestinationType, limit: number = 8): Promise<Product[]> {
    let list = ALL_MOCK_PRODUCTS.filter((p) => p.isNewArrival);
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    return list.slice(0, limit);
  },

  async getDeals(destination?: DestinationType, limit: number = 8): Promise<Product[]> {
    let list = ALL_MOCK_PRODUCTS.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 35);
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    return list.slice(0, limit);
  },

  async getProductsByCategory(categorySlug: string, limit: number = 8): Promise<Product[]> {
    const term = categorySlug.toLowerCase();
    if (term === 'men-fashion' || term === 'men') {
      return mockMensFashionProducts.slice(0, limit);
    }
    if (term === 'women-fashion' || term === 'women') {
      return mockWomensFashionProducts.slice(0, limit);
    }
    const list = ALL_MOCK_PRODUCTS.filter((p) => {
      if (term === 'fashion') {
        return (
          p.categoryId === 'cat-fashion' ||
          p.categoryName.toLowerCase().includes('fashion') ||
          p.tags.some((t) => ['fashion', 'apparel', 'bestseller'].includes(t.toLowerCase()))
        );
      }
      return (
        p.categoryId.toLowerCase().includes(term) ||
        p.categoryName.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
      );
    });
    return list.slice(0, limit);
  },

  async getRelatedProducts(currentProductId: string, limit: number = 4): Promise<Product[]> {
    const current = ALL_MOCK_PRODUCTS.find((p) => p.id === currentProductId);
    if (!current) return ALL_MOCK_PRODUCTS.slice(0, limit);

    const related = ALL_MOCK_PRODUCTS.filter(
      (p) => p.id !== currentProductId && (p.categoryId === current.categoryId || p.destination === current.destination)
    );
    return related.slice(0, limit);
  },

  async searchProducts(query: string, destination?: DestinationType): Promise<Product[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const tokens = q.split(/\s+/).filter(Boolean);

    let list = ALL_MOCK_PRODUCTS.filter((p) => {
      const targetText = `${p.name} ${p.brand} ${p.categoryName} ${p.subcategoryName || ''} ${p.description} ${p.tags.join(' ')}`.toLowerCase();
      return (
        targetText.includes(q) ||
        tokens.some((token) => token.length > 2 && targetText.includes(token))
      );
    });

    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }

    return list;
  },

  async getAvailableBrands(destination?: DestinationType): Promise<string[]> {
    let list = ALL_MOCK_PRODUCTS;
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    const brands = Array.from(new Set(list.map((p) => p.brand)));
    return brands.sort();
  },
};
