import { FacebookAccount } from './../../domain/models';
import { ILoadFacebookUserApi } from './../contracts/apis';
import { FacebookAuthentication } from 'domain/features';
import { AuthenticationError } from './../../domain/errors';
import { ILoadUserAccountRepository, ISaveFacebookAccountRepository } from 'data/contracts/repos';

export class FacebookAuthenticationService {
    constructor(
        private readonly facebookApi: ILoadFacebookUserApi,
        private readonly userAccountRepo: ILoadUserAccountRepository & ISaveFacebookAccountRepository
    ) {}

    async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        const fbData = await this.facebookApi.loadUser(params)
        if (fbData) {
            const accountData = await this.userAccountRepo.load({email : fbData.email})
            const fbAccount = new FacebookAccount(fbData, accountData)
            await this.userAccountRepo.saveWithFacebook(fbAccount)
        }
        return new AuthenticationError();
    }
}
