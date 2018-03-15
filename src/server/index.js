import Koa from 'koa';
import KoaStatic from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import router from './router';

const app = new Koa();

app.use(KoaStatic('build'));
app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening on 3000');
});