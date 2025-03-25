'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '@/_styles/color.styles';
import { size } from '@/_styles/size.styles';

export const MenuItem = styled(Link)({
  color: colors.black0,
  padding: size.size2,
  display: 'flex',
  alignItems: 'center',
  gap: size.size2,
  borderRadius: size.size2,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: colors.black100,
  },
});
