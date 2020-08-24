import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

import FileSelector from '../FileSelector/FileSelector';
import JSONView from '../JSONView/JSONView';
import { withStore } from 'utils/store';

const App: React.FC = () => {
  return (
    <ToastProvider autoDismiss>
      <FileSelector />
      <JSONView />
    </ToastProvider>
  );
};

export default withStore(App);
