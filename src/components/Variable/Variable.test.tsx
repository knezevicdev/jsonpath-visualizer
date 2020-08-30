import React from 'react';
import { shallow } from 'enzyme';

import { StoreProvider } from 'utils/store';

import Variable from './Variable';

describe('Variable', () => {
  it('renders snapshots', () => {
    const wrapper = shallow(
      <StoreProvider>
        <Variable name="" path="" value="" type="string" />
      </StoreProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
