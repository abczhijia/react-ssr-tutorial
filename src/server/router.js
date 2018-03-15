require('babel-polyfill');
import React from 'react';
import KoaRouter from 'koa-router';
import { renderToString } from 'react-dom/server';
import fetch from 'isomorphic-fetch';
import serialize from 'serialize-javascript';
import App from '../shared/app';
import { StaticRouter, matchPath } from 'react-router-dom';
import routes from '../shared/routes';

const router = new KoaRouter();

router.get('/api/*', async (ctx, next) => {
    console.log('url: ', ctx.request.url);
    const url = ctx.request.url.replace(/^\/api/, '');
    const res = await fetch(`http://www.hostedredmine.com${url}`);
    const data = await res.json();
    ctx.body = data;
});


router.get('*', async (ctx, next) => {
    const route = routes.find(r => matchPath(ctx.request.url, r.path));
    let context = {}, data = null;

    console.log('route: ', route.prefetch);
    if (route && route.component && route.component.prefetch && typeof route.component.prefetch == 'function') {
        data = await route.component.prefetch();
        data = await data.json();
        context = { data };
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
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
            <script src="/client.js"></script>
            
        </body>
        </html>
    `;
});

export default router;