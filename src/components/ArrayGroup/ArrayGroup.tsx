import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { chunk as _chunk } from 'lodash';

import { JsonObject } from 'components/DataTypes';
import { ARRAY_GROUP_LIMIT } from 'utils/constants';

import { Wrapper, Name, IconWrapper, ContentWrapper, ValueWrapper } from './ArrayGroup.css';
import { CollapsedIcon, ExpandedIcon } from 'components/ToggleIcons/ToggleIcons';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import { useStore } from 'utils/store';

type ArrayGroupProps = {
  array: unknown[];
  name?: string;
  pointer: string;
};

const ArrayGroup: FunctionComponent<ArrayGroupProps> = ({ array, name, pointer }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [chunks, setChunks] = useState<unknown[][]>([[]]);
  const elements = useRef<JSX.Element[]>([]);
  const store = useStore();

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
    if (elements.current.length) return elements.current;

    elements.current = chunks.map((chunk: unknown[], index: number) => (
      <JsonObject
        key={index}
        src={chunk}
        type="array"
        indexOffset={index * ARRAY_GROUP_LIMIT}
        name={generateName(index)}
        expanded={false}
        pointer={pointer}
      />
    ));

    return elements.current;
  };

  return (
    <Wrapper collapsed={collapsed}>
      <span>
        <IconWrapper onClick={toggleCollapsed}>{collapsed ? <ExpandedIcon /> : <CollapsedIcon />}</IconWrapper>{' '}
        {name && name.length && <Name>{name}: </Name>}
      </span>
      <ValueWrapper collapsed={collapsed} data-matched={store.matched.includes(pointer)}>
        <span>{'['}</span>
        {(elements.current.length || collapsed) && (
          <ContentWrapper collapsed={collapsed}>{renderContent()}</ContentWrapper>
        )}
        {!collapsed && (
          <div onClick={toggleCollapsed}>
            <Ellipsis />
          </div>
        )}
        <span>{']'}</span>
      </ValueWrapper>
    </Wrapper>
  );
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
