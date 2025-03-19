export interface SiteMeta {
  title: string;
  url: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: string;
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  imageLink?: string;
  imageAlt?: string;
  robots?: 'index, follow' | 'noindex, nofollow' | 'index, nofollow' | 'noindex, follow';
}

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  type: string;
  cover: {
    link: string;
    alt: string;
  };
  logo: string;
  darkLogo: string;
  keywords: string;
  author: {
    name: string;
    url: string;
  };
  version: string;
  googleVerfi: string;
  googleAdSrc: string;
  googleAnalyticsId: string;
  isBaseUrl: string;
}
