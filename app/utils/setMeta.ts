import type { MetaDescriptor } from 'react-router';
import type { SiteMeta } from '~/types';
import { siteConfig } from '~/config';

export const setMeta = (meta: SiteMeta) => {
  const metaData = meta;

  const siteDescription = metaData.description || siteConfig.description;
  const siteKeywords = metaData.keywords
    ? `${siteConfig.keywords}, ${metaData.keywords}`
    : siteConfig.keywords;
  const siteUrl = `${siteConfig.url}${metaData.url}`;
  const siteImageLink = metaData.imageLink
    ? `${siteConfig.url}${metaData.imageLink}`
    : `${siteConfig.url}${siteConfig.cover.link}`;
  const siteType = metaData.type || siteConfig.type;

  const metadata = [
    { title: `${metaData.title} - ${siteConfig.title}`, },
    { name: 'description', content: siteDescription, },
    { name: 'keywords', content: siteKeywords, },
    { name: 'author', content: siteConfig.author.name, },
    { name: 'generator', content: `VSCode`, },
    { tagName: 'link', rel: 'canonical', href: siteUrl, },
    { name: 'robots', content: metaData.robots || 'index, follow', },
    { name: 'og:title', content: metaData.title, },
    { name: 'og:description', content: siteDescription, },
    { name: 'og:image', content: siteImageLink, },
    { name: 'og:url', content: siteUrl, },
    { name: 'og:type', content: siteType, },
    { name: 'og:site_name', content: siteConfig.title, },
    { name: 'twitter:card', content: 'summary_large_image', },
    { name: 'twitter:title', content: metaData.title, },
    { name: 'twitter:description', content: siteDescription, },
    { name: 'twitter:image', content: siteImageLink, },
    { name: 'twitter:url', content: siteUrl, },
  ] as MetaDescriptor[];

  return metadata;
};
