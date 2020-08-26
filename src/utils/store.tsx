import React, { ComponentType } from 'react';
import { JSONPath } from 'jsonpath-plus';
import { useLocalStore } from 'mobx-react';

export type TJson = null | Record<string, unknown> | any[];

export type TStore = {
  json: TJson;
  jsonPath: string;
  matched: string[];
};

const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => {
    return {
      json: null as TJson,
      jsonPath: '' as string,
      get matched(): string[] {
        const result = JSONPath({ path: store.jsonPath, json: store.json, resultType: 'pointer' });
        console.log(result);
        return result;
      },
    };
  });

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

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
