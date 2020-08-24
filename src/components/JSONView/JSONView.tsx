import React from 'react';
import { useStore } from 'utils/store';
import { observer } from 'mobx-react';

const JSONView: React.FC = () => {
  const store = useStore();
  return (
    <div>
      <pre>{JSON.stringify(store.json, null, 2)}</pre>
    </div>
  );
};

export default observer(JSONView);
