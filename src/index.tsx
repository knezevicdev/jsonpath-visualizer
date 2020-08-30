import React from 'react';
import ReactDOM from 'react-dom';
import 'mobx-react/batchingForReactDom';

import { App } from 'components';

ReactDOM.render(<App />, document.getElementById('app'));
