import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'; //importa o app.tsx
//renderiza o que esta em app na tag root do index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <h1>TEste</h1>
  ,document.getElementById('teste')
)