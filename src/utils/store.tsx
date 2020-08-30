import React, { ComponentType } from 'react';
import { useLocalStore } from 'mobx-react';
import { reaction, comparer, keys, remove } from 'mobx';

import { matchPaths } from 'utils/helpers';

export type TJson = null | Record<string, unknown> | any[];

const storeContext = React.createContext<Record<string, any> | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore<Record<string, any>>(() => ({
    json: null as TJson,
    jsonPath: '' as string,
    jsonUploadTime: 0 as number,
    matchedPaths: [] as string[],
  }));

  reaction(
    () => store.jsonPath,
    (jsonPath) => {
      const matchedPaths = matchPaths(store.json, jsonPath);

      store.matchedPaths.forEach((oldMatchedPath: string) => {
        if (!matchedPaths.includes(oldMatchedPath)) {
          store[oldMatchedPath] = false;
        }
      });

      matchedPaths.forEach((matchedPath: string) => {
        if (!store[matchedPath]) {
          store[matchedPath] = true;
        }
      });

      store.matchedPaths = matchedPaths;
    },
  );

  reaction(
    () => store.json,
    () => {
      keys(store).forEach((key: string) => {
        if (!['json', 'jsonPath', 'matchedPaths', 'jsonUploadTime'].includes(key)) {
          remove(store, key);
        }
      });

      store.matchedPaths = [];
      store.jsonPath = '';
    },
    { equals: comparer.shallow },
  );

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const withStore = (WrappedComponent: ComponentType): React.FC => {
  const StoreHOC: React.FC = (props) => {
    return (
      <StoreProvider>
        <WrappedComponent {...props} />
      </StoreProvider>
    );
  };

  return StoreHOC;
};

export const useStore = (): Record<string, any> => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
