import { AuthenticationError } from './../../../src/domain/errors/authentication';
import { FacebookAuthenticationService } from './../../../src/data/services';
import { ILoadFacebookUserApi, LoadFacebookUserApi } from './../../../src/data/contracts/apis';


class LoadFacebookUserApiSpy implements ILoadFacebookUserApi {
    token?: string
    result = undefined
    callsCount = 0

    async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
        this.token = params.token
        this.callsCount++
        return this.result
    }
}

describe('FacebookAuthenticationService', () => {
    it('should call LoadFacebookUserApi with correct params', async () => {
        const loadFacebookUserApi = new LoadFacebookUserApiSpy();
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        await sut.perform({token: 'any_token'})
        expect(loadFacebookUserApi.token).toBe('any_token')
        expect(loadFacebookUserApi.callsCount).toBe(1)

    })

    it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        const loadFacebookUserApi = new LoadFacebookUserByTokenApiSpy();
        loadFacebookUserApi.result = undefined
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        const authResult = await sut.perform({token: 'any_token'})
        expect(authResult).toEqual(new AuthenticationError());
    })
})