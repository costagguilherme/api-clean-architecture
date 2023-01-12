import { AuthenticationError } from '../../../src/domain/errors/authentication'
import { FacebookAuthentication } from '../../../src/domain/features'


class FacebookAuthenticationService {
    constructor(private readonly loadFacebookUserApi: ILoadFacebookUserApi) {}
    async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        await this.loadFacebookUserApi.loadUser(params)
        return new AuthenticationError();
    }
}

interface ILoadFacebookUserApi {
    loadUser: (params: LoadFacebookUserApi.Params) => Promise <LoadFacebookUserApi.Result>
}

namespace LoadFacebookUserApi {
    export type Params = {
        token: string
    }

    export type Result = undefined
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