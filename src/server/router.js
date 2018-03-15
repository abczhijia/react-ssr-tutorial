require('babel-polyfill');
import React from 'react';
import KoaRouter from 'koa-router';
import { renderToString } from 'react-dom/server';
import fetch from 'isomorphic-fetch';
import serialize from 'serialize-javascript';
import App from '../shared/app';
import { StaticRouter, matchPath } from 'react-router-dom';
import routes from '../shared/routes';
import _ from 'lodash';

const router = new KoaRouter();

router.get('/api/*', async (ctx, next) => {
    const url = ctx.request.url.replace(/^\/api/, '');
    const res = await fetch(`http://www.hostedredmine.com${url}`);
    const data = await res.json();
    ctx.body = data;
});


router.get('*', async (ctx, next) => {
    const route = routes.find(r => matchPath(ctx.request.path, r));
    const context = {}, fn = _.get(route, 'component.prototype.prefetch');

    if (typeof fn == 'function') {
        context.prefetch = await fn(ctx.query);
    }

    const app = renderToString(<StaticRouter location={ctx.request.url} context={context}>
        <App/>
    </StaticRouter>);

    ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
            <div id="app">${app}</div>
            <script>window.__INITIAL_DATA__ = ${serialize(context.prefetch)}</script>
            <script src="/client.js"></script>
            
        </body>
        </html>
    `;
});

export default router;