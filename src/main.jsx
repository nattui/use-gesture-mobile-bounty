import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.scss';

// Commented out since I don't know if you are familiar with React 18 strict mode
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
