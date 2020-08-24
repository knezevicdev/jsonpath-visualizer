import React from 'react';
import { shallow } from 'enzyme';

import JSONView from './JSONView';
import { StoreProvider } from 'utils/store';

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
