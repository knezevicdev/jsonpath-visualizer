import React from 'react';
import { shallow } from 'enzyme';

import { ExpandedIcon, CollapsedIcon } from './ToggleIcons';

describe('ToggleIcons', () => {
  it('renders expanded icon snapshots', () => {
    const wrapper = shallow(<ExpandedIcon />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders collapsed icon snapshots', () => {
    const wrapper = shallow(<CollapsedIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
