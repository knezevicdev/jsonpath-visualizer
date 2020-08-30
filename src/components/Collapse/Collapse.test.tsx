import React from 'react';
import { shallow } from 'enzyme';

import { StoreProvider } from 'utils/store';

import Collapse from './Collapse';

describe('Collapse', () => {
  it('renders snapshots', () => {
    const wrapper = shallow(
      <StoreProvider>
        <Collapse opened={true} name="" path="" renderContent={() => []} />
      </StoreProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
