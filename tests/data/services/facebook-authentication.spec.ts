import { AuthenticationError } from './../../../src/domain/errors/authentication';
import { FacebookAuthenticationService } from './../../../src/data/services';
import { ILoadFacebookUserApi, LoadFacebookUserApi } from './../../../src/data/contracts/apis';

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
    sut: FacebookAuthenticationService
    loadFacebookUserApi: MockProxy<ILoadFacebookUserApi>
}

function makeSut(): SutTypes {
    const loadFacebookUserApi = mock<ILoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    return {sut, loadFacebookUserApi}
}


describe('FacebookAuthenticationService', () => {
    it('should call LoadFacebookUserApi with correct params', async () => {
        const  { sut, loadFacebookUserApi } = makeSut()
        await sut.perform({token: 'any_token'})
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token'})
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        const  { sut, loadFacebookUserApi } = makeSut()
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
        const authResult = await sut.perform({token: 'any_token'})
        console.log(authResult)
        expect(authResult).toEqual(new AuthenticationError());
    })
})