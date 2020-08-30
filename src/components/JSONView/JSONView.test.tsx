import React from 'react';
import { shallow } from 'enzyme';

import { StoreProvider } from 'utils/store';

import JSONView from './JSONView';

describe('JSONView', () => {
  it('renders snapshots', () => {
    const wrapper = shallow(
      <StoreProvider>
        <JSONView />
      </StoreProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
