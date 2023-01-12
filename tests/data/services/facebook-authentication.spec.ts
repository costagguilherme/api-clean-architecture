import { AuthenticationError } from '../../../src/domain/errors/authentication'
import { FacebookAuthentication } from '../../../src/domain/features'
import { ILoadFacebookUserApi, LoadFacebookUserApi } from './../../../src/data/contracts/apis';


class FacebookAuthenticationService {
    constructor(private readonly loadFacebookUserApi: ILoadFacebookUserApi) {}
    async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        await this.loadFacebookUserApi.loadUser(params)
        return new AuthenticationError();
    }
}


class LoadFacebookUserByTokenApiSpy implements ILoadFacebookUserApi {
    token?: string
    result = undefined

    async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
        this.token = params.token
        return this.result
    }

}

describe('FacebookAuthenticationService', () => {
    it('should call LoadFacebookUserApi with correct params', async () => {
        const loadFacebookUserApi = new LoadFacebookUserByTokenApiSpy();
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        await sut.perform({token: 'any_token'})
        expect(loadFacebookUserApi.token).toBe('any_token')
    })

    it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        const loadFacebookUserApi = new LoadFacebookUserByTokenApiSpy();
        loadFacebookUserApi.result = undefined
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        await sut.perform({token: 'any_token'})
        expect(loadFacebookUserApi.token).toBe('any_token')
    })
})