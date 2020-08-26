import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

import FileSelector from 'components/FileSelector/FileSelector';
import JSONView from 'components/JSONView/JSONView';
import JSONPathInput from 'components/JSONPathInput/JSONPathInput';
import { withStore, useStore } from 'utils/store';

const App: React.FC = () => {
  return (
    <ToastProvider autoDismiss>
      <FileSelector />
      <JSONPathInput />
      <JSONView />
    </ToastProvider>
  );
};

export default withStore(App);
