// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


// Load up the application styles
import '../styles/application.scss';

ReactDOM.render(<App />, document.getElementById('react-root'));
