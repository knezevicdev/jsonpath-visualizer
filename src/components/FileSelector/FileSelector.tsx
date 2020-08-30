import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { extendObservable } from 'mobx';
import { action } from 'mobx';

import { useStore, TJson } from 'utils/store';
import { toType, objectPaths } from 'utils/helpers';

import { Input, Label } from './FileSelector.css';

const FileSelector: React.FC = () => {
  const store = useStore();
  const { addToast } = useToasts();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    if (event.currentTarget.files?.length) reader.readAsText(event.currentTarget.files[0]);
  };

  const setJson = action((json: TJson) => {
    const paths = objectPaths(json);
    extendObservable(store, paths);

    store.json = json;
    store.jsonUploadTime = Date.now();
  });

  const onReaderLoad = (event: ProgressEvent<FileReader>): void => {
    const jsonString = event.target?.result;

    if (toType(jsonString) === 'string') {
      try {
        const result = JSON.parse(jsonString as string);

        setJson(result);
      } catch (e) {
        addToast('Please select valid JSON file', { appearance: 'error' });
      }
    }
  };

  return (
    <>
      <Input type="file" onChange={onChange} id="file-selector" />
      <Label htmlFor="file-selector">
        <i className="material-icons">file_upload</i>
        <span>&nbsp;Choose a file</span>
      </Label>
    </>
  );
};

export default FileSelector;
