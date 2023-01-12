import { AuthenticationError } from './../../../src/domain/errors/authentication';
import { FacebookAuthenticationService } from './../../../src/data/services';
import { ILoadFacebookUserApi } from './../../../src/data/contracts/apis';

import { mock, MockProxy } from 'jest-mock-extended'


describe('FacebookAuthenticationService', () => {

    let loadFacebookUserApi: MockProxy<ILoadFacebookUserApi>
    let sut: FacebookAuthenticationService
    const token = 'any_token'

    beforeEach(() => {
        loadFacebookUserApi = mock()
        sut = new FacebookAuthenticationService(loadFacebookUserApi)
    })

    it('should call LoadFacebookUserApi with correct params', async () => {
        await sut.perform({token: token})
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: token})
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
        const authResult = await sut.perform({token: 'any_token'})
        console.log(authResult)
        expect(authResult).toEqual(new AuthenticationError());
    })
})