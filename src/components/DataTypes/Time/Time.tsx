import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Value } from './Time.css';

const DISPLAY_OPTIONS = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

type TimeProps = {
  value: Date;
};

const Time: FunctionComponent<TimeProps> = ({ value }) => (
  <Wrapper>
    <Value>{value.toLocaleTimeString('en-us', DISPLAY_OPTIONS)}</Value>
  </Wrapper>
);

Time.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
};

export default Time;
