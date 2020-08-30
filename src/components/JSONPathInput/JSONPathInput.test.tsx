import React from 'react';
import { shallow } from 'enzyme';

import { StoreProvider } from 'utils/store';

import JSONPathInput from './JSONPathInput';

describe('JSONPathInput', () => {
  it('renders snapshots', () => {
    const wrapper = shallow(
      <StoreProvider>
        <JSONPathInput />
      </StoreProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
