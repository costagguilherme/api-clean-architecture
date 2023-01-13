import { ILoadFacebookUserApi } from './../contracts/apis';
import { FacebookAuthentication } from 'domain/features';
import { AuthenticationError } from './../../domain/errors';
import { ILoadUserAccountRepository, IUpdateFacebookAccountRepository, ICreateFacebookAccountRepository } from 'data/contracts/repos';

export class FacebookAuthenticationService {
    constructor(
        private readonly facebookApi: ILoadFacebookUserApi,
        private readonly userAccountRepo: ILoadUserAccountRepository & ICreateFacebookAccountRepository & IUpdateFacebookAccountRepository
    ) {}

    async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        const fbData = await this.facebookApi.loadUser(params)
        if (fbData != undefined) {
            const accountData = await this.userAccountRepo.load({email : fbData.email})
            if (accountData?.name != undefined) {
                await this.userAccountRepo.updateWithFacebook({id: accountData.id, name: accountData.name, facebookId: fbData.facebookId})
            } else {
                await this.userAccountRepo.createFromFacebook(fbData)
            }
        }
        return new AuthenticationError();
    }
}