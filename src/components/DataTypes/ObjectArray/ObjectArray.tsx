import React, { FunctionComponent, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { toType } from 'utils/helpers';

import { CollapsedIcon, ExpandedIcon } from 'components/ToggleIcons/ToggleIcons';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import Variable from 'components/Variable/Variable';

import { Wrapper, Name, IconWrapper, ContentWrapper, ValueWrapper } from './ObjectArray.css';
import { ARRAY_GROUP_LIMIT } from 'utils/constants';
import ArrayGroup from 'components/ArrayGroup/ArrayGroup';
import { observer } from 'mobx-react';
import { useStore } from 'utils/store';

type ObjectProps = {
  name?: string;
  src: any;
  type: string;
  indexOffset?: number;
  expanded?: boolean;
  pointer: string;
};

const ObjectArray: FunctionComponent<ObjectProps> = ({ src, type, name, indexOffset, expanded, pointer }) => {
  const [collapsed, setCollapsed] = useState(!!expanded);
  const elements = useRef<JSX.Element[]>([]);
  const store = useStore();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
          <JSONObject
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
    <Wrapper collapsed={collapsed}>
      <span>
        <IconWrapper onClick={toggleCollapsed}>{collapsed ? <ExpandedIcon /> : <CollapsedIcon />}</IconWrapper>{' '}
        {name?.length && <Name>{name}: </Name>}
      </span>
      <ValueWrapper collapsed={collapsed} data-matched={store.matched.includes(pointer)}>
        <span>{type === 'array' ? '[' : '{'}</span>
        {(elements.current.length || collapsed) && (
          <ContentWrapper collapsed={collapsed}>{renderContent()}</ContentWrapper>
        )}
        {!collapsed && (
          <div onClick={toggleCollapsed}>
            <Ellipsis />
          </div>
        )}
        <span>{type === 'array' ? ']' : '}'}</span>
      </ValueWrapper>
    </Wrapper>
  );
};

ObjectArray.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  indexOffset: PropTypes.number.isRequired,
  expanded: PropTypes.bool,
  pointer: PropTypes.string.isRequired,
};

ObjectArray.defaultProps = {
  name: '',
  indexOffset: 0,
  expanded: true,
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

const JSONObject = observer(ObjectArray);

export default JSONObject;
