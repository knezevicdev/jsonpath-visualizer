import React, { FunctionComponent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { chunk as _chunk } from 'lodash';

import { JsonObject } from 'components/DataTypes';
import { ARRAY_GROUP_LIMIT } from 'utils/constants';

import { Wrapper, Name, IconWrapper } from './ArrayGroup.css';
import { CollapsedIcon, ExpandedIcon } from 'components/ToggleIcons/ToggleIcons';
import Ellipsis from 'components/Ellipsis/Ellipsis';

type ArrayGroupProps = {
  array: any[];
  name?: string;
};

const ArrayGroup: FunctionComponent<ArrayGroupProps> = ({ array, name }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [chunks, setChunks] = useState<any[][]>([[]]);

  useEffect(() => {
    setChunks(_chunk(array, ARRAY_GROUP_LIMIT));
  }, [array]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const generateName = (chunkIndex: number): string => {
    if (chunkIndex === chunks.length - 1) {
      return `${chunkIndex * ARRAY_GROUP_LIMIT}-${array.length - 1}`;
    }

    return `${chunkIndex * ARRAY_GROUP_LIMIT}-${(chunkIndex + 1) * ARRAY_GROUP_LIMIT - 1}`;
  };

  const renderContent = (): JSX.Element[] => {
    return chunks.map((chunk: any[], index: number) => (
      <JsonObject
        key={index}
        depth={1}
        src={chunk}
        type="array"
        indexOffset={index * ARRAY_GROUP_LIMIT}
        name={generateName(index)}
        expanded={false}
      />
    ));
  };

  return (
    <Wrapper collapsed={collapsed}>
      <span>
        <IconWrapper onClick={toggleCollapsed}>{collapsed ? <ExpandedIcon /> : <CollapsedIcon />}</IconWrapper>{' '}
        {name && name.length && <Name>{name}: </Name>} <span>{'['}</span>
      </span>
      {collapsed ? (
        <div>{renderContent()}</div>
      ) : (
        <div onClick={toggleCollapsed}>
          <Ellipsis />
        </div>
      )}
      <span>{']'}</span>
    </Wrapper>
  );
};

ArrayGroup.propTypes = {
  array: PropTypes.array.isRequired,
  name: PropTypes.string,
};

ArrayGroup.defaultProps = {
  name: '',
};

export default ArrayGroup;
