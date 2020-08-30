import React from 'react';
import { shallow } from 'enzyme';

import ArrayGroup from './ArrayGroup';

describe('ArrayGroup', () => {
  it('renders snapshots', () => {
    const wrapper = shallow(<ArrayGroup name="" path="" array={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
