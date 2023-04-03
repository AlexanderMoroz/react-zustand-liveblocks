import { StateCreator } from 'zustand';
import { WithLiveblocks } from "@liveblocks/zustand";

interface AppSliceState {
  count: number;
}

interface AppSliceActions {
  addCount: (amount: number) => void;
}

export type AppSliceStore = AppSliceState & AppSliceActions;

export const createAppSlice: StateCreator<
  AppSliceStore,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  AppSliceStore
> = (set, get) => ({
  count: 0,

  addCount: (amount) => {
    set((state) => {
      state.count += amount;
    });
  },
});
