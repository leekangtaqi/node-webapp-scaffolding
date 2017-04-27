"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
let app = new Koa();
app.use(ctx => {
    console.warn('....');
    ctx.body = '2222';
});
app.listen(3000);
//# sourceMappingURL=app.js.map