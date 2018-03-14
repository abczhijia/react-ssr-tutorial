import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/app';
import { BrowserRouter } from 'react-router-dom';

hydrate(<BrowserRouter>
    <App data={window.__INITIAL_DATA__}/>
</BrowserRouter>, document.getElementById('app'));


