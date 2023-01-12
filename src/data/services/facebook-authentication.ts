import { ICreateFacebookAccountRepository } from './../contracts/repos/user-account';
import { ILoadFacebookUserApi } from './../contracts/apis';
import { FacebookAuthentication } from 'domain/features';
import { AuthenticationError } from './../../domain/errors';
import { ILoadUserAccountRepository } from 'data/contracts/repos';

export class FacebookAuthenticationService {
    constructor(
        private readonly loadFacebookUserApi: ILoadFacebookUserApi,
        private readonly loadUserAccountRepo: ILoadUserAccountRepository,
        private readonly createFacebookAccountRepo: ICreateFacebookAccountRepository
    ) {}

    async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        const fbData = await this.loadFacebookUserApi.loadUser(params)
        if (fbData != undefined) {
            await this.loadUserAccountRepo.load({email : fbData.email})
            await this.createFacebookAccountRepo.createFromFacebook(fbData)
        }
        return new AuthenticationError();
    }
}