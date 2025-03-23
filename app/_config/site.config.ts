import { nihilLogo, nihilLogoWhite } from '@/_images';
import { SiteConfig } from '@/_types/common.types';

export const siteConfig: SiteConfig = {
  title: '랜덤 키워드',
  description: '창작자들의 영감을 위한 랜덤 키워드 생성기',
  keywords: '키워드,창작,그림쟁이,글쟁이,랜덤키워드,keyword,creative,illustrator,writer,randomkeyword',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://randomkeywords.nihilapps.dev',
  cover: {
    link: '/opengraph-image.png',
    alt: 'site image',
  },
  logo: nihilLogo.src,
  darkLogo: nihilLogoWhite.src,
  version: 'v0.0.0',
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  get apiRoute() {
    return `${this.url}/api`;
  },
};
