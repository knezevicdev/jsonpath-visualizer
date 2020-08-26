import React, { FunctionComponent, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  JsonBoolean,
  JsonFloat,
  JsonFunction,
  JsonInteger,
  JsonNan,
  JsonNull,
  JsonRegexp,
  JsonString,
  JsonTime,
  JsonUndefined,
} from 'components/DataTypes';

import { Wrapper, Name, ValueWrapper } from './Variable.css';
import { useStore } from 'utils/store';
import { observer } from 'mobx-react';

type VariableProps = {
  name: string;
  value: unknown | null | undefined;
  type: string;
  pointer: string;
};

const Variable: FunctionComponent<VariableProps> = ({ type, value, name, pointer }) => {
  const store = useStore();

  const getValue = () => {
    switch (type) {
      case 'string':
        return <JsonString value={value as string} />;
      case 'integer':
        return <JsonInteger value={value as number} />;
      case 'float':
        return <JsonFloat value={value as number} />;
      case 'boolean':
        return <JsonBoolean value={value as boolean} />;
      case 'function':
        return <JsonFunction value={value as (...args: any[]) => any} />;
      case 'null':
        return <JsonNull />;
      case 'nan':
        return <JsonNan />;
      case 'undefined':
        return <JsonUndefined />;
      case 'date':
        return <JsonTime value={value as Date} />;
      case 'regexp':
        return <JsonRegexp value={value as RegExp} />;
      default:
        // catch-all for types that weren't anticipated
        return <div>{JSON.stringify(value)}</div>;
    }
  };

  return (
    <Wrapper>
      <Name>{name}: </Name>
      <ValueWrapper data-matched={store.matched.includes(pointer)}>{getValue()}</ValueWrapper>
    </Wrapper>
  );
};

Variable.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  pointer: PropTypes.string.isRequired,
};

export default observer(Variable);
