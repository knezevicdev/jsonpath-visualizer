import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { chunk as _chunk } from 'lodash';

import { ARRAY_GROUP_LIMIT } from 'utils/constants';

import ObjectArray from 'components/ObjectArray/ObjectArray';
import Collapse from 'components/Collapse/Collapse';

type ArrayGroupProps = {
  array: unknown[];
  name?: string;
  pointer: string;
};

const ArrayGroup: FunctionComponent<ArrayGroupProps> = ({ array, name, pointer }) => {
  const chunks = useRef<unknown[][]>(_chunk(array, ARRAY_GROUP_LIMIT));
  const elements = useRef<JSX.Element[]>([]);

  const generateName = (chunkIndex: number): string => {
    if (chunkIndex === chunks.current.length - 1) {
      return `${chunkIndex * ARRAY_GROUP_LIMIT}-${array.length - 1}`;
    }

    return `${chunkIndex * ARRAY_GROUP_LIMIT}-${(chunkIndex + 1) * ARRAY_GROUP_LIMIT - 1}`;
  };

  const renderContent = (): JSX.Element[] => {
    if (elements.current.length) return elements.current;

    elements.current = chunks.current.map((chunk: unknown[], index: number) => (
      <ObjectArray
        key={`${pointer}/chunk/${index}`}
        src={chunk}
        type="array"
        indexOffset={index * ARRAY_GROUP_LIMIT}
        name={generateName(index)}
        opened={false}
        pointer={pointer}
      />
    ));

    return elements.current;
  };

  return <Collapse opened isArray name={name || ''} pointer={pointer} renderContent={renderContent} />;
};

ArrayGroup.propTypes = {
  array: PropTypes.array.isRequired,
  name: PropTypes.string,
  pointer: PropTypes.string.isRequired,
};

ArrayGroup.defaultProps = {
  name: '',
};

export default ArrayGroup;
