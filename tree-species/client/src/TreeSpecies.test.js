import React from 'react';
import ReactDOM from 'react-dom';
import TreeSpecies from './TreeSpecies';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TreeSpecies />, div);
  ReactDOM.unmountComponentAtNode(div);
});
