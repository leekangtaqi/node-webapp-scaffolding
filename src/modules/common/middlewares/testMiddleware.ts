import { Middleware, IMiddleware } from "../../../framework/app";

@Middleware()
export class MyMiddleware implements IMiddleware {

    use(request: any, response: any, next?: (err?: any) => any): any {
        console.log("do something...");
        next();
    }

}