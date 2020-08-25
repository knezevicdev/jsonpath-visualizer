import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './String.css';

type StringProps = {
  value: string;
};

const String: FunctionComponent<StringProps> = ({ value }) => <Wrapper>&quot;{value}&quot;</Wrapper>;

String.propTypes = {
  value: PropTypes.string.isRequired,
};

export default String;
