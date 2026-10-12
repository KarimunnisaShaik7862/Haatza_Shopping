import { DestinationType, HeroSlide, HomeSectionConfig, PromoBannerData } from '../types';
import { mockHeroSlides, mockPromoBanners } from './mock/data/banners';
import { haatzaHomeSections, liteHomeSections } from './mock/data/sectionConfigs';

export const homeService = {
  async getSections(destination: DestinationType): Promise<HomeSectionConfig[]> {
    let sections: HomeSectionConfig[] = [];
    switch (destination) {
      case 'lite':
        sections = liteHomeSections;
        break;
      case 'nest':
        sections = [];
        break;
      case 'haatza':
      default:
        sections = haatzaHomeSections;
        break;
    }
    return sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  },

  async getHeroSlides(destination: DestinationType): Promise<HeroSlide[]> {
    return mockHeroSlides.filter((s) => s.destination === destination);
  },

  async getPromoBanners(destination?: DestinationType): Promise<PromoBannerData[]> {
    if (destination) {
      return mockPromoBanners.filter((b) => b.destination === destination);
    }
    return [...mockPromoBanners];
  },

  async getPromoBannerById(id: string): Promise<PromoBannerData | null> {
    const found = mockPromoBanners.find((b) => b.id === id);
    return found ? { ...found } : null;
  },
};
