import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & {
  [K in keyof T as `use${Capitalize<string & K>}`]: () => T[K];
}
  : never;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  for (const k of Object.keys(store.getState())) {
    const prop = `use${capitalize(k)}`;
    (store as any)[prop] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
