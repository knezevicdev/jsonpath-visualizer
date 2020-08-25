import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './Float.css';

type FloatProps = {
  value: number;
};

const Float: FunctionComponent<FloatProps> = ({ value }) => <Wrapper>{value}</Wrapper>;

Float.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Float;
