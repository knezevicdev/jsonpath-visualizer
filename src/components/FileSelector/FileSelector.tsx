import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { useStore } from 'utils/store';
import { toType } from 'utils/helpers';

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

    if (toType(jsonString) === 'string') {
      try {
        const result = JSON.parse(jsonString as string);
        store.json = result;

        console.log(result);
      } catch (e) {
        addToast('Please select valid JSON file', { appearance: 'error' });
      }
    }
  };

  return <input type="file" onChange={onChange} />;
};

export default FileSelector;
