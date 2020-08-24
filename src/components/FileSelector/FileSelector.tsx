import React from 'react';
import { parseWithPointers } from '@stoplight/json';
import { useToasts } from 'react-toast-notifications';

import { useStore } from 'utils/store';

const FileSelector = () => {
  const store = useStore();
  const { addToast } = useToasts();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    if (event.currentTarget.files?.length) reader.readAsText(event.currentTarget.files[0]);
  };

  const onReaderLoad = (event: ProgressEvent<FileReader>): void => {
    const jsonString = event.target?.result;

    if (jsonString && typeof jsonString === 'string') {
      const result = parseWithPointers(jsonString);

      if (result.diagnostics.length === 0) {
        store.json = result.data;
      } else {
        addToast('Please select valid JSON file', { appearance: 'error' });
      }
    }
  };

  return <input type="file" onChange={onChange} />;
};

export default FileSelector;
