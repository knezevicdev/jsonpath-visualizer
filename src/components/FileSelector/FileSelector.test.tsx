import React from 'react';
import { shallow } from 'enzyme';

import FileSelector from './FileSelector';
import { StoreProvider } from 'utils/store';

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
