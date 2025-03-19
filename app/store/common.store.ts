import { create } from 'zustand';

interface CommonStore {
  isDarkMode: boolean;
  isSideOpen: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  setIsSideOpen: (isSideOpen: boolean) => void;
}

export const commonStore = create<CommonStore>((set) => ({
  isDarkMode: false,
  isSideOpen: false,
  setIsDarkMode: (isDarkMode) => (
    set({ isDarkMode, })
  ),
  setIsSideOpen: (isSideOpen) => (
    set({ isSideOpen, })
  ),
}));
