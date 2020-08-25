import React, { FunctionComponent, useState } from 'react';
import PropTypes from 'prop-types';

import { toType } from 'utils/helpers';

import { CollapsedIcon, ExpandedIcon } from 'components/ToggleIcons/ToggleIcons';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import Variable from 'components/Variable/Variable';

import { Wrapper, Name, IconWrapper } from './ObjectArray.css';
import { ARRAY_GROUP_LIMIT } from 'utils/constants';
import ArrayGroup from 'components/ArrayGroup/ArrayGroup';

const DEPTH_INCREMENT = 1;

type ObjectProps = {
  depth: number;
  name?: string;
  src: any;
  type: string;
  indexOffset?: number;
  expanded?: boolean;
};

const ObjectArray: FunctionComponent<ObjectProps> = ({ depth, src, type, name, indexOffset, expanded }) => {
  const [collapsed, setCollapsed] = useState(!!expanded);

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

      const name = type === 'array' && indexOffset ? String(Number(variable.name || '') + indexOffset) : variable.name;

      if (variable.type === 'array' && (variable.value as any[])?.length > ARRAY_GROUP_LIMIT) {
        elements.push(<ArrayGroup key={variable.name} array={variable.value as any[]} name={name} />);
      } else if (variable.type === 'object' || variable.type === 'array') {
        elements.push(
          <ObjectArray
            key={variable.name}
            depth={depth + DEPTH_INCREMENT}
            name={name}
            src={variable.value}
            type={variable.type}
          />,
        );
      } else {
        elements.push(<Variable key={variable.name} name={name} value={variable.value} type={variable.type} />);
      }
    });

    return elements;
  };

  return (
    <Wrapper collapsed={collapsed}>
      <span>
        <IconWrapper onClick={toggleCollapsed}>{collapsed ? <ExpandedIcon /> : <CollapsedIcon />}</IconWrapper>{' '}
        {depth > 0 && <Name>{name}: </Name>} <span>{type === 'array' ? '[' : '{'}</span>
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
  indexOffset: PropTypes.number.isRequired,
  expanded: PropTypes.bool,
};

ObjectArray.defaultProps = {
  name: '',
  indexOffset: 0,
  expanded: true,
};

class JsonVariable {
  public type: string;

  constructor(public name: string, public value: unknown) {
    this.type = toType(value);
  }
}

export default ObjectArray;
