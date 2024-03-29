import React from 'react';
import { shallow } from 'enzyme';

import { StoreProvider } from 'utils/store';

import FileSelector from './FileSelector';

describe('FileSelector', () => {
  it('renders snapshots', () => {
    const wrapper = shallow(
      <StoreProvider>
        <FileSelector />
      </StoreProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
