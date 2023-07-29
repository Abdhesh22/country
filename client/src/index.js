import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Country from './component/countryList/country';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode> <Country></Country> </React.StrictMode>);