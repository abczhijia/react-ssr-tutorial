require('babel-polyfill');
import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaStatic from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/app';
import fetch from 'isomorphic-fetch';
import serialize from 'serialize-javascript';
import { StaticRouter, matchPath } from 'react-router-dom';

const app = new Koa();
const router = new KoaRouter();

app.use(KoaStatic('build'));

router.get('*', async (ctx, next) => {
    const res = await fetch('http://www.hostedredmine.com/projects.json');
    const data = await res.json();
    const context = { data };

    const app = renderToString(<StaticRouter location={ctx.request.url} context={context}>
        <App data={data}/>
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

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening on 3000');
});