import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './Regexp.css';

type RegexpProps = {
  value: RegExp;
};

const Regexp: FunctionComponent<RegexpProps> = ({ value }) => <Wrapper>&quot;{value.toString()}&quot;</Wrapper>;

Regexp.propTypes = {
  value: PropTypes.instanceOf(RegExp).isRequired,
};

export default Regexp;
