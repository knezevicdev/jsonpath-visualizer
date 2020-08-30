import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

import { withStore } from 'utils/store';
import { FileSelector, JSONView, JSONPathInput } from 'components';

import { TopWrapper } from './App.css';

const App: React.FC = () => {
  return (
    <ToastProvider autoDismiss>
      <TopWrapper>
        <FileSelector />
        <JSONPathInput />
      </TopWrapper>
      <JSONView />
    </ToastProvider>
  );
};

export default withStore(App);
