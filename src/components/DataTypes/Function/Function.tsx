import React, { FunctionComponent, useState } from 'react';
import PropTypes from 'prop-types';

import Ellipsis from 'components/Ellipsis/Ellipsis';

import { Wrapper, Value, EllipsisWrapper } from './Function.css';

type FunctionProps = {
  value: (...args: any[]) => any;
};

const Function: FunctionComponent<FunctionProps> = ({ value }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onFunctionClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Wrapper onClick={onFunctionClick}>
      <Value>
        {collapsed ? (
          <span>
            {value
              .toString()
              .slice(9, -1)
              .replace(/\{[\s\S]+/, '')}
            <EllipsisWrapper>
              <span>{'{'}</span>
              <Ellipsis />
              <span>{'}'}</span>
            </EllipsisWrapper>
          </span>
        ) : (
          value.toString().slice(9, -1)
        )}
      </Value>
    </Wrapper>
  );
};

Function.propTypes = {
  value: PropTypes.func.isRequired,
};

export default Function;
