import type { SiteConfig } from '~/types';

export const siteConfig: SiteConfig = {
  title: '사이트 이름',
  description: '사이트 설명',
  keywords: '',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : '',
  cover: {
    link: '/images/opengraph-image.png',
    alt: 'site image',
  },
  logo: '/images/nihil-logo.png',
  darkLogo: '/images/nihil-logo-w.png',
  version: 'v0.0.0',
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  get isBaseUrl() {
    return `${this.url}/api`;
  },
};
