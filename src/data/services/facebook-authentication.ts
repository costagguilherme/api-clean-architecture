import { ILoadFacebookUserApi } from './../contracts/apis';
import { FacebookAuthentication } from 'domain/features';
import { AuthenticationError } from './../../domain/errors';

export class FacebookAuthenticationService {
    constructor(private readonly loadFacebookUserApi: ILoadFacebookUserApi) {}
    async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        await this.loadFacebookUserApi.loadUser(params)
        return new AuthenticationError();
    }
}