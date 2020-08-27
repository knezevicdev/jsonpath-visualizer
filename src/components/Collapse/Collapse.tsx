import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'utils/store';

import { ExpandedIcon, CollapsedIcon } from 'components/ToggleIcons/ToggleIcons';

import { Wrapper, Value, Content, Bracket, Ellipsis } from './Collapse.css';
import { FieldName } from 'styled/components';
import { observer } from 'mobx-react';

type CollapseProps = {
  opened: boolean;
  name: string;
  pointer: string;
  isArray?: boolean;
  renderContent: () => JSX.Element[];
};

const Collapse: FunctionComponent<CollapseProps> = ({ opened, name, pointer, isArray, renderContent }) => {
  const [isOpened, setIsOpened] = useState(opened);
  const alreadyOpened = useRef(false);
  const store = useStore();

  useEffect(() => {
    if (opened) {
      alreadyOpened.current = true;
    }

    setIsOpened(opened);
  }, [opened]);

  const toggleOpened = () => {
    if (!isOpened) {
      alreadyOpened.current = true;
    }

    setIsOpened(!isOpened);
  };

  return (
    <Wrapper opened={isOpened}>
      <span onClick={toggleOpened}>
        {isOpened ? <ExpandedIcon /> : <CollapsedIcon />}&nbsp;
        {name && name.length && <FieldName>{name}: </FieldName>}
      </span>
      <Value opened={isOpened} data-matched={store.matched.includes(pointer)}>
        <Bracket>{isArray ? '[' : '{'}</Bracket>&nbsp;
        {(alreadyOpened.current || isOpened) && <Content opened={isOpened}>{renderContent()}</Content>}
        {!isOpened && (
          <div onClick={toggleOpened}>
            <Ellipsis>...</Ellipsis>
          </div>
        )}
        <Bracket>{isArray ? ']' : '}'}</Bracket>
      </Value>
    </Wrapper>
  );
};

Collapse.propTypes = {
  opened: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  pointer: PropTypes.string.isRequired,
  isArray: PropTypes.bool,
  renderContent: PropTypes.func.isRequired,
};

export default observer(Collapse);
