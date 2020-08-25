import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './Boolean.css';

type BooleanProps = {
  value: boolean;
};

const Boolean: FunctionComponent<BooleanProps> = ({ value }) => <Wrapper>{value ? 'true' : 'false'}</Wrapper>;

Boolean.propTypes = {
  value: PropTypes.bool.isRequired,
};

export default Boolean;
