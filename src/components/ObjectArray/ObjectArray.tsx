import React, { FunctionComponent, useRef } from 'react';
import PropTypes from 'prop-types';

import { Variable, Collapse, ArrayGroup } from 'components';
import { ARRAY_GROUP_LIMIT } from 'utils/constants';
import { toType } from 'utils/helpers';

type ObjectProps = {
  name?: string;
  src: any;
  type: string;
  indexOffset?: number;
  opened?: boolean;
  path: string;
};

const ObjectArray: FunctionComponent<ObjectProps> = ({ src, type, name, indexOffset, opened, path }) => {
  const elements = useRef<JSX.Element[]>([]);

  const renderContent = () => {
    if (elements.current.length) return elements.current;

    const keys = Object.keys(src);

    keys.forEach((key) => {
      const variable = new JsonVariable(key, src[key], indexOffset, type, path);

      if (!src.hasOwnProperty(key)) {
        return;
      }

      if (variable.type === 'array' && (variable.value as any[])?.length > ARRAY_GROUP_LIMIT) {
        elements.current.push(
          <ArrayGroup key={variable.path} array={variable.value as any[]} name={variable.name} path={variable.path} />,
        );
      } else if (variable.type === 'object' || variable.type === 'array') {
        elements.current.push(
          <ObjectArray
            key={variable.path}
            name={variable.name}
            src={variable.value}
            type={variable.type}
            path={variable.path}
          />,
        );
      } else {
        elements.current.push(
          <Variable
            key={variable.path}
            name={variable.name}
            value={variable.value}
            type={variable.type}
            path={variable.path}
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
      path={path}
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
  path: PropTypes.string.isRequired,
};

ObjectArray.defaultProps = {
  name: '',
  indexOffset: 0,
  opened: true,
};

class JsonVariable {
  public type: string;
  public path: string;

  constructor(public name: string, public value: unknown, indexOffset: number | undefined, type: string, path: string) {
    this.type = toType(value);
    if (type === 'array' && indexOffset) {
      this.name = String(Number(name || '0') + indexOffset);
    }

    if (path.length === 0) {
      this.path = this.name;
    } else {
      this.path = `${path}.${this.name}`;
    }
  }
}

export default ObjectArray;
