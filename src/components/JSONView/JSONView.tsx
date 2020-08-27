import React from 'react';
import { useStore } from 'utils/store';
import { observer } from 'mobx-react';

import ArrayGroup from 'components/ArrayGroup/ArrayGroup';

import ObjectArray from 'components/ObjectArray/ObjectArray';
import { toType } from 'utils/helpers';
import { ARRAY_GROUP_LIMIT } from 'utils/constants';

import { Wrapper } from './JSONView.css';

const JSONView: React.FC = () => {
  const store = useStore();

  if (!store.json) return <Wrapper />;

  return (
    <Wrapper>
      {(store.json as any[])?.length > ARRAY_GROUP_LIMIT ? (
        <ArrayGroup array={store.json as any[]} pointer="" />
      ) : (
        <ObjectArray name="" src={store.json} type={toType(store.json)} pointer="" />
      )}
    </Wrapper>
  );
};

export default observer(JSONView);
