import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaStatic from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/app';

const app = new Koa();
const router = new KoaRouter();

app.use(KoaStatic('build'));

router.get('*', (ctx, next) => {
    const app = renderToString(<App/>);

    ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
            <div id="app">${app}</div>
            <script src="/client.js"></script>
        </body>
        </html>
    `;
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening on 3000');
});