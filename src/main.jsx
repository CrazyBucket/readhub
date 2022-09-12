import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'


const container = document.getElementById('root');
const root = createRoot(container);
export const main = () => {}
root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode> 
);