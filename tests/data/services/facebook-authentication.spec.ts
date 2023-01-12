import { AuthenticationError } from './../../../src/domain/errors/authentication';
import { FacebookAuthenticationService } from './../../../src/data/services';
import { ILoadFacebookUserApi, LoadFacebookUserApi } from './../../../src/data/contracts/apis';

import { mock } from 'jest-mock-extended'


describe('FacebookAuthenticationService', () => {
    it('should call LoadFacebookUserApi with correct params', async () => {
        const loadFacebookUserApi = mock<ILoadFacebookUserApi>()
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        await sut.perform({token: 'any_token'})
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token'})
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        const loadFacebookUserApi = mock<ILoadFacebookUserApi>()
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
        const sut = new FacebookAuthenticationService(loadFacebookUserApi)
        const authResult = await sut.perform({token: 'any_token'})
        console.log(authResult)
        expect(authResult).toEqual(new AuthenticationError());
    })
})