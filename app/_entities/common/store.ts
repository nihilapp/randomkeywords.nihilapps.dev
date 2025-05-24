import { create } from 'zustand';

interface CommonActions {
  toggleDarkMode: () => void;
}

interface CommonState {
  isDarkMode: boolean;
  actions: CommonActions
}

// const useCommonStore = create<CommonStore>((set) => ({
//   isDarkMode: false,
//   actions: {
//     toggleDarkMode: () => set(
//       (state) => ({
//         isDarkMode: !state.isDarkMode,
//       })
//     ),
//   },
// }));

const commonStore = create<CommonState>()((
  (set) => ({
    isDarkMode: false,
    actions: {
      toggleDarkMode: () => set(
        (state) => ({
          isDarkMode: !state.isDarkMode,
        })
      ),
    },
  })
));

export const useIsdarkMode = commonStore((state) => state.isDarkMode);

export const useCommonActions = commonStore((state) => state.actions);
