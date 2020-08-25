import React from 'react';
import { useStore } from 'utils/store';
import { observer } from 'mobx-react';

import ArrayGroup from 'components/ArrayGroup/ArrayGroup';

import { JsonObject } from 'components/DataTypes';
import { toType } from 'utils/helpers';
import { ARRAY_GROUP_LIMIT } from 'utils/constants';

const JSONView: React.FC = () => {
  const store = useStore();

  if (!store.json) return null;

  if ((store.json as any[])?.length > ARRAY_GROUP_LIMIT) {
    return (
      <div>
        <ArrayGroup array={store.json as any[]} />
      </div>
    );
  }

  return (
    <div>
      <JsonObject depth={0} name="" src={store.json} type={toType(store.json)} />
    </div>
  );
};

export default observer(JSONView);
