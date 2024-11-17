import { css } from 'styled-components';

export const breakpoints = {
  mosm: '480px',
  momd: '768px',
  molg: '1024px',
};

export const media = {
  mosm: (styles: TemplateStringsArray | string) => css`
    @media (min-width: ${breakpoints.mosm}) {
      ${styles};
    }
  `,
  momd: (styles: TemplateStringsArray | string) => css`
    @media (min-width: ${breakpoints.momd}) {
      ${styles};
    }
  `,
  molg: (styles: TemplateStringsArray | string) => css`
    @media (min-width: ${breakpoints.molg}) {
      ${styles};
    }
  `,
};
