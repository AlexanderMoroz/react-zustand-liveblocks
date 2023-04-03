import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from "zustand/middleware";
import { AppSliceStore, createAppSlice } from "./slices/app-slice";
import { createSelectors } from "./utils";
import { liveblocks } from "@liveblocks/zustand";
import { client } from "../liveblocks/client";
import type { WithLiveblocks } from "@liveblocks/zustand";

const storeWithImmer = subscribeWithSelector(
  immer<AppSliceStore>(
    (...a) => ({
      ...createAppSlice(...a),
    })));


type ExtractStoreMutators<P> = P extends StateCreator<any, any, infer T, any>
  ? T
  : never;

type StoreMutators = ExtractStoreMutators<typeof storeWithImmer>;

export const useAppStore = createSelectors(
  create<WithLiveblocks<AppSliceStore>>()<StoreMutators>(
    liveblocks(
      storeWithImmer as any,
      {
        client,
        storageMapping: {
          count: true,
        }
      }
    )
  )
);

export const { subscribe } = useAppStore;
