import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from 'utils/store';
import { toType } from 'utils/helpers';
import { ARRAY_GROUP_LIMIT } from 'utils/constants';
import { ArrayGroup, ObjectArray } from 'components';

import { Wrapper } from './JSONView.css';

const JSONView: React.FC = () => {
  const { json, jsonUploadTime } = useStore();

  if (!json) return <Wrapper />;

  return (
    <Wrapper>
      {(json as any[])?.length > ARRAY_GROUP_LIMIT ? (
        <ArrayGroup array={json as any[]} path="" key={jsonUploadTime} />
      ) : (
        <ObjectArray name="" src={json} type={toType(json)} path="" key={jsonUploadTime} />
      )}
    </Wrapper>
  );
};

export default observer(JSONView);
