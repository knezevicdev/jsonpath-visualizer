import React, { FunctionComponent, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { toType } from 'utils/helpers';

import Variable from 'components/Variable/Variable';
import Collapse from 'components/Collapse/Collapse';
import ArrayGroup from 'components/ArrayGroup/ArrayGroup';

import { ARRAY_GROUP_LIMIT } from 'utils/constants';

type ObjectProps = {
  name?: string;
  src: any;
  type: string;
  indexOffset?: number;
  opened?: boolean;
  pointer: string;
};

const ObjectArray: FunctionComponent<ObjectProps> = ({ src, type, name, indexOffset, opened, pointer }) => {
  const elements = useRef<JSX.Element[]>([]);

  const renderContent = () => {
    if (elements.current.length) return elements.current;

    const keys = Object.keys(src);

    console.log(keys);

    keys.forEach((key) => {
      const variable = new JsonVariable(key, src[key], indexOffset, type, pointer);

      if (!src.hasOwnProperty(key)) {
        return;
      }

      if (variable.type === 'array' && (variable.value as any[])?.length > ARRAY_GROUP_LIMIT) {
        elements.current.push(
          <ArrayGroup
            key={variable.name}
            array={variable.value as any[]}
            name={variable.name}
            pointer={variable.pointer}
          />,
        );
      } else if (variable.type === 'object' || variable.type === 'array') {
        elements.current.push(
          <ObjectArray
            key={variable.name}
            name={variable.name}
            src={variable.value}
            type={variable.type}
            pointer={variable.pointer}
          />,
        );
      } else {
        elements.current.push(
          <Variable
            key={variable.name}
            name={variable.name}
            value={variable.value}
            type={variable.type}
            pointer={variable.pointer}
          />,
        );
      }
    });

    return elements.current;
  };

  return (
    <Collapse
      opened={!!opened}
      isArray={type === 'array'}
      name={name || ''}
      pointer={pointer}
      renderContent={renderContent}
    />
  );
};

ObjectArray.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  indexOffset: PropTypes.number.isRequired,
  opened: PropTypes.bool,
  pointer: PropTypes.string.isRequired,
};

ObjectArray.defaultProps = {
  name: '',
  indexOffset: 0,
  opened: true,
};

class JsonVariable {
  public type: string;
  public pointer: string;

  constructor(
    public name: string,
    public value: unknown,
    indexOffset: number | undefined,
    type: string,
    pointer: string,
  ) {
    this.type = toType(value);
    if (type === 'array' && indexOffset) {
      this.name = String(Number(name || '0') + indexOffset);
    }
    this.pointer = `${pointer}/${this.name}`;
  }
}

export default ObjectArray;
