import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './Integer.css';

type IntegerProps = {
  value: number;
};

const Integer: FunctionComponent<IntegerProps> = ({ value }) => <Wrapper>{value}</Wrapper>;

Integer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Integer;
