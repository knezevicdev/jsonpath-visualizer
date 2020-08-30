import React, { FunctionComponent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useStore } from 'utils/store';
import { fieldValueProps } from 'styled/helpers';
import { Wrapper, FieldName, FieldValue, FieldValueProps } from 'styled/components';

import { observer } from 'mobx-react';

type VariableProps = {
  name: string;
  value: unknown | null | undefined;
  type: string;
  path: string;
};

const Variable: FunctionComponent<VariableProps> = ({ type, value, name, path }) => {
  const { [path]: matched } = useStore();
  const [props, setProps] = useState<FieldValueProps>(fieldValueProps('orange'));

  useEffect(() => {
    switch (type) {
      case 'string':
        setProps(fieldValueProps('orange'));
        break;
      case 'integer':
        setProps(fieldValueProps('brown'));
        break;
      case 'float':
        setProps(fieldValueProps('green'));
        break;
      case 'boolean':
        setProps(fieldValueProps('purple'));
        break;
      case 'function':
        setProps(fieldValueProps('orange'));
        break;
      case 'null':
        setProps(fieldValueProps('rajah', true));
        break;
      case 'nan':
        setProps(fieldValueProps('pink', true));
        break;
      case 'undefined':
        setProps(fieldValueProps('white', true));
        break;
      case 'date':
        setProps(fieldValueProps('aqua'));
        break;
      case 'regexp':
        setProps(fieldValueProps('aqua'));
        break;
      default:
        // catch-all for types that weren't anticipated
        setProps(fieldValueProps('orange'));
    }
  }, [type]);

  return (
    <Wrapper>
      <FieldName>{name}:&nbsp;</FieldName>
      <FieldValue data-matched={matched} {...props}>
        {type === 'string' && '"'}
        {String(value)}
        {type === 'string' && '"'}
      </FieldValue>
    </Wrapper>
  );
};

Variable.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default observer(Variable);
