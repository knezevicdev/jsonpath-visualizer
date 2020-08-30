import React, { useState, useRef } from 'react';
import { action } from 'mobx';
import { debounce as _debounce } from 'lodash';

import { useStore } from 'utils/store';

import { Input } from './JSONPathInput.css';

const JSONPathInput: React.FC = () => {
  const store = useStore();

  const [value, setValue] = useState('');

  const changeValue = (value: string) => {
    store.jsonPath = value;
  };

  const onChange = useRef(_debounce(action(changeValue), 500));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange.current(event.target.value);
  };

  return (
    <>
      <Input type="text" onChange={handleChange} value={value} />
    </>
  );
};

export default JSONPathInput;
