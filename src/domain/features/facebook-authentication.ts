import { AuthenticationError } from './../errors/authentication';
import { AccessToken } from './../models/access-token';

export interface IFacebookAuthentication {
    perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
    export type Params = {
        token: string
    }

    export type Result = AccessToken | AuthenticationError
    
}