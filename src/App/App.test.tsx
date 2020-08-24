import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.html()).toMatch(/Test/);
  });

  it('renders snapshots', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
