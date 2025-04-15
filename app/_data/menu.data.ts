import type { IconType } from 'react-icons';
import {
  MdFolder, MdHome
} from 'react-icons/md';
import { GiDiceTwentyFacesOne } from 'react-icons/gi';

interface Menu {
  label: string;
  href: string;
  icon: IconType;
}

export const menuData: Menu[] = [
  {
    label: '홈',
    href: '/',
    icon: MdHome,
  },
  {
    label: '캐릭터',
    href: '/keywords/character',
    icon: MdFolder,
  },
  {
    label: '배경스토리',
    href: '/keywords/background',
    icon: MdFolder,
  },
  {
    label: '기타',
    href: '/keywords/etc',
    icon: MdFolder,
  },
  {
    label: '랜덤',
    href: '/keywords/random',
    icon: GiDiceTwentyFacesOne,
  },
];
