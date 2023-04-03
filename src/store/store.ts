import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from "zustand/middleware";
import { AppSliceStore, createAppSlice } from "./slices/app-slice";
import { createSelectors } from "./utils";
import { liveblocks } from "@liveblocks/zustand";
import { client } from "../liveblocks/client";
import type { WithLiveblocks } from "@liveblocks/zustand";
export const useAppStore = create<WithLiveblocks<AppSliceStore>>()(
    liveblocks(
      immer<AppSliceStore>(
      (...a) => ({
        ...createAppSlice(...a),
      })),
        {
          client,
          storageMapping: {
            count: true,
          }
        }
      )
)

// this works fine
// export const useAppStore = create<WithLiveblocks<AppSliceStore>>()(
//   liveblocks(
//     (...a) => ({
//       ...createAppSlice(...a),
//     }),
//     {
//       client,
//       storageMapping: {
//         count: true,
//       }
//     }
//   )
// )
