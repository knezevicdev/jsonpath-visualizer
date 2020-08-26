import React, { useState, useRef } from 'react';
import { useStore } from 'utils/store';

import { debounce as _debounce } from 'lodash';

const JSONPathInput: React.FC = () => {
  const store = useStore();

  const [value, setValue] = useState('');
  const onChange = useRef(
    _debounce((value: string) => {
      store.jsonPath = value;
    }, 500),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange.current(event.target.value);
  };

  return <input type="text" onChange={handleChange} value={value} />;
};

export default JSONPathInput;
