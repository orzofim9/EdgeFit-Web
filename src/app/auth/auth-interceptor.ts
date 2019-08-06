/**
 * Interceptor take a regular http request and put the token in it's header.
 */

import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authSerive: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authToken = this.authSerive.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization',"Bearer " + authToken)
        });
        return next.handle(authRequest);
    }
}