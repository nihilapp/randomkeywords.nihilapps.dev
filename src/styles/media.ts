import {
  css,
  type CSSObject,
  type Interpolation
} from 'styled-components';

export type Breakpoints = 'mosm' | 'momd' | 'molg';

export const breakpoints: Record<Breakpoints, string> = {
  mosm: '@media (min-width: 480px)',
  momd: '@media (min-width: 768px)',
  molg: '@media (min-width: 1024px)',
};

export const media = Object.entries(breakpoints).reduce((acc, [ key, value, ]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: Interpolation<object>[]
    ) => css`
      ${value} {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<Breakpoints, any>;
