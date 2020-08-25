import React, { FunctionComponent, useState } from 'react';
import PropTypes from 'prop-types';

import { toType } from 'utils/helpers';

import { CollapsedIcon, ExpandedIcon } from 'components/ToggleIcons/ToggleIcons';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import Variable from 'components/Variable/Variable';

import { Wrapper, Name, IconWrapper } from './ObjectArray.css';

const DEPTH_INCREMENT = 1;

type ObjectProps = {
  depth: number;
  name: string;
  src: any;
  type: string;
};

const ObjectArray: FunctionComponent<ObjectProps> = ({ depth, src, type, name }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    const elements: unknown[] = [];
    const keys = Object.keys(src);

    console.log(keys);

    keys.forEach((key) => {
      const variable = new JsonVariable(key, src[key]);

      if (!src.hasOwnProperty(key)) {
        return;
      }

      if (variable.type === 'object' || variable.type === 'array') {
        elements.push(
          <ObjectArray
            key={variable.name}
            depth={depth + DEPTH_INCREMENT}
            name={variable.name}
            src={variable.value}
            type={variable.type}
          />,
        );
      } else {
        elements.push(
          <Variable key={variable.name} name={variable.name} value={variable.value} type={variable.type} />,
        );
      }
    });

    return elements;
  };

  return (
    <Wrapper depth={depth}>
      <span>
        <IconWrapper onClick={toggleCollapsed}>{collapsed ? <ExpandedIcon /> : <CollapsedIcon />}</IconWrapper>{' '}
        <Name>{name}</Name> <span>{type === 'array' ? '[' : '{'}</span>
      </span>
      {collapsed ? (
        <div>{renderContent()}</div>
      ) : (
        <div onClick={toggleCollapsed}>
          <Ellipsis />
        </div>
      )}
      <span>{type === 'array' ? ']' : '}'}</span>
    </Wrapper>
  );
};

ObjectArray.propTypes = {
  depth: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
};

class JsonVariable {
  public type: string;

  constructor(public name: string, public value: unknown) {
    this.type = toType(value);
  }
}

export default ObjectArray;
