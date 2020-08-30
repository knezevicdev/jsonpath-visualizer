import React from 'react';
import { shallow } from 'enzyme';

import ObjectArray from './ObjectArray';

describe('ObjectArray', () => {
  it('renders snapshots', () => {
    const wrapper = shallow(<ObjectArray opened={true} name="" path="" src={[]} type="array" />);
    expect(wrapper).toMatchSnapshot();
  });
});
