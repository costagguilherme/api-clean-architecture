import { ILoadUserAccountRepository, ICreateFacebookAccountRepository, IUpdateFacebookAccountRepository } from './../../../src/data/contracts/repos';
import { AuthenticationError } from './../../../src/domain/errors/authentication';
import { FacebookAuthenticationService } from './../../../src/data/services';
import { ILoadFacebookUserApi } from './../../../src/data/contracts/apis';

import { mock, MockProxy } from 'jest-mock-extended'


describe('FacebookAuthenticationService', () => {

    let facebookApi: MockProxy<ILoadFacebookUserApi>
    let userAccountRepo: MockProxy<ILoadUserAccountRepository & ICreateFacebookAccountRepository & IUpdateFacebookAccountRepository> 
    let sut: FacebookAuthenticationService
    const token = 'any_token'

    beforeEach(() => {
        facebookApi = mock()
        facebookApi.loadUser.mockResolvedValue({
            name: 'any_fb_name',
            email: 'any_fb_email',
            facebookId : 'any_fb_id'
        })
        userAccountRepo = mock()
        sut = new FacebookAuthenticationService(facebookApi, userAccountRepo)
    })

    it('should call facebookApi with correct params', async () => {
        await sut.perform({token: token})
        expect(facebookApi.loadUser).toHaveBeenCalledWith({ token: token})
        expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticationError when facebookApi returns undefined', async () => {
        facebookApi.loadUser.mockResolvedValueOnce(undefined)
        const authResult = await sut.perform({token: 'any_token'})
        expect(authResult).toEqual(new AuthenticationError());
    })

    it('should call LoadUserAccountRepo when facebookApi returns data', async () => {
        await sut.perform({token: 'any_token'})
        expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
        expect(userAccountRepo.load).toHaveBeenCalledTimes(1)    
    })

    it('should call CreateFacebookAccountRepo when LoadUserAccountRepo returns undefined', async () => {
        userAccountRepo.load.mockResolvedValueOnce(undefined)
        await sut.perform({token: 'any_token'})
        expect(userAccountRepo.createFromFacebook).toHaveBeenCalledWith({
             email: 'any_fb_email' ,
             name: 'any_fb_name',
             facebookId: 'any_fb_id'
        })
        expect(userAccountRepo.createFromFacebook).toHaveBeenCalledTimes(1)    
    })

    it('should call UpdateFacebookAccountRepo when LoadUserAccountRepo returns data', async () => {
        userAccountRepo.load.mockResolvedValueOnce({
            id: 'any_id',
            name: 'any_name'
        })

        await sut.perform({token: 'any_token'})

        expect(userAccountRepo.updateWithFacebook).toHaveBeenCalledWith({
             id: 'any_id' ,
             name: 'any_name',
             facebookId: 'any_fb_id'
        })
        expect(userAccountRepo.updateWithFacebook).toHaveBeenCalledTimes(1)    
    })
})
