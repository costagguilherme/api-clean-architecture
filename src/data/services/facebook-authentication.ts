import { ICreateFacebookAccountRepository } from './../contracts/repos/user-account';
import { ILoadFacebookUserApi } from './../contracts/apis';
import { FacebookAuthentication } from 'domain/features';
import { AuthenticationError } from './../../domain/errors';
import { ILoadUserAccountRepository } from 'data/contracts/repos';

export class FacebookAuthenticationService {
    constructor(
        private readonly facebookApi: ILoadFacebookUserApi,
        private readonly userAccountRepo: ILoadUserAccountRepository & ICreateFacebookAccountRepository
    ) {}

    async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        const fbData = await this.facebookApi.loadUser(params)
        if (fbData != undefined) {
            await this.userAccountRepo.load({email : fbData.email})
            await this.userAccountRepo.createFromFacebook(fbData)
        }
        return new AuthenticationError();
    }
}