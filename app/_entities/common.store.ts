import { create } from 'zustand';

interface CommonStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const commonStore = create<CommonStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set(
    (state) => ({
      isDarkMode: !state.isDarkMode,
    })
  ),
}));
