import React from 'react';
import { useStore } from 'utils/store';
import { observer } from 'mobx-react';

import { JsonObject } from 'components/DataTypes';
import { toType } from 'utils/helpers';

const JSONView: React.FC = () => {
  const store = useStore();

  if (!store.json) return null;

  return (
    <div>
      <JsonObject depth={0} name="" src={store.json} type={toType(store.json)} />
    </div>
  );
};

export default observer(JSONView);
