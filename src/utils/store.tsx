import React, { ComponentType, ReactPropTypes } from 'react';
import { createStore, TStore } from './createStore';
import { useLocalStore } from 'mobx-react';

const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore);
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
