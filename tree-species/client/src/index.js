import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TreeSpecies from './TreeSpecies';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TreeSpecies />, document.getElementById('root'));
registerServiceWorker();
