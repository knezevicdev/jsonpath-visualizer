import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { useStore } from 'utils/store';
import { FieldName } from 'styled/components';
import { ExpandedIcon, CollapsedIcon } from 'components';

import { Wrapper, Value, Content, Bracket, Ellipsis } from './Collapse.css';

type CollapseProps = {
  opened: boolean;
  name: string;
  path: string;
  isArray?: boolean;
  renderContent: () => JSX.Element[];
};

const Collapse: FunctionComponent<CollapseProps> = ({ opened, name, path, isArray, renderContent }) => {
  const [isOpened, setIsOpened] = useState(opened);
  const alreadyOpened = useRef(false);
  const { [path]: matched } = useStore();

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
        {name && name.length && <FieldName>{name}:&nbsp;</FieldName>}
      </span>
      <Value opened={isOpened} data-matched={matched}>
        <Bracket>{isArray ? '[' : '{'}</Bracket>
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
  path: PropTypes.string.isRequired,
  isArray: PropTypes.bool,
  renderContent: PropTypes.func.isRequired,
};

export default observer(Collapse);
