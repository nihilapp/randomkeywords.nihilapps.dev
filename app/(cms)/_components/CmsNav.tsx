'use client';

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { color, media, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const Nav = styled.nav`
  background-color: ${color.white};
  padding: ${size.normal[2]};
  font-weight: 500;

  & ul {
    display: flex;
    flex-direction: column;
    gap: ${size.normal[1]};
  }

  & a {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: ${size.normal[2]};
    border: 1px solid ${color.black[100]};
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${color.black.base};
      color: ${color.white};
    }
  }

  ${media.mosm`
    & ul {
      flex-direction: row;

      & li {
        flex: 1;
        text-align: center;
      }
    }
  `};
`;

export function CmsNav({ children, }: Props) {
  return (
    <Nav>
      <ul>
        <li>
          <Link href='/cms/add_category'>카테고리 관리</Link>
        </li>
        <li>
          <Link href='/cms/add_keyword'>키워드 관리</Link>
        </li>
        <li>
          <Link href='/cms/text_convert'>텍스트 컨버터</Link>
        </li>
      </ul>
    </Nav>
  );
}
