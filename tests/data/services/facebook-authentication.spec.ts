import { ILoadUserAccountRepository } from './../../../src/data/contracts/repos';
import { AuthenticationError } from './../../../src/domain/errors/authentication';
import { FacebookAuthenticationService } from './../../../src/data/services';
import { ILoadFacebookUserApi } from './../../../src/data/contracts/apis';

import { mock, MockProxy } from 'jest-mock-extended'


describe('FacebookAuthenticationService', () => {

    let loadFacebookUserApi: MockProxy<ILoadFacebookUserApi>
    let loadUserAccountRepo: MockProxy<ILoadUserAccountRepository>
    let sut: FacebookAuthenticationService
    const token = 'any_token'

    beforeEach(() => {
        loadFacebookUserApi = mock()
        loadFacebookUserApi.loadUser.mockResolvedValue({
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId : 'any_fb_id'
        })
        loadUserAccountRepo = mock()
        sut = new FacebookAuthenticationService(loadFacebookUserApi, loadUserAccountRepo)
    })

    it('should call LoadFacebookUserApi with correct params', async () => {
        await sut.perform({token: token})
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: token})
        expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
        loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
        const authResult = await sut.perform({token: 'any_token'})
        expect(authResult).toEqual(new AuthenticationError());
    })

    it('should call LoadUserAccountRepoRepo when LoadFacebookUserApi returns data', async () => {
        await sut.perform({token: 'any_token'})
        expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
        expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1)    
    })
})
