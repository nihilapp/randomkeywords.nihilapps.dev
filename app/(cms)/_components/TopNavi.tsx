'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { size } from '@/src/styles';

interface Props {
  route: string[];
}

const NaviString = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: ${size.normal[2]};
  margin-bottom: ${size.normal[5]};
`;

export function TopNavi({ route, }: Props) {
  const routeString = useMemo(() => {
    return route.join(' > ');
  }, [ route, ]);

  return (
    <NaviString>{routeString}</NaviString>
  );
}
