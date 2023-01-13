import { ITokenGenerator } from './../../../src/data/contracts/crypto';
import { ILoadUserAccountRepository, ISaveFacebookAccountRepository } from './../../../src/data/contracts/repos';
import { AuthenticationError } from './../../../src/domain/errors/authentication';
import { FacebookAuthenticationService } from './../../../src/data/services';
import { ILoadFacebookUserApi } from './../../../src/data/contracts/apis';
import { FacebookAccount } from '../../../src/domain/models'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('./../../../src/domain/models/facebook-account')

describe('FacebookAuthenticationService', () => {

    let facebookApi: MockProxy<ILoadFacebookUserApi>
    let crypto: MockProxy<ITokenGenerator>
    let userAccountRepo: MockProxy<ILoadUserAccountRepository & ISaveFacebookAccountRepository>
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
        userAccountRepo.load.mockResolvedValue(undefined)
        userAccountRepo.saveWithFacebook.mockResolvedValueOnce({id: 'any_account_id'})
        crypto = mock()
        sut = new FacebookAuthenticationService(facebookApi, userAccountRepo, crypto)
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

    it('should call SaveFacebookAccountRepository with FacebookAccount', async () => {
        const FacebookAccountStub = jest.fn().mockImplementation(() => {return {any: 'any'}})
        jest.mocked(FacebookAccount).mockImplementation(FacebookAccountStub)
        await sut.perform({token: 'any_token'})
        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({any : 'any'})
        expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)    
    })


    it('should call TokenGenerator with correct params', async () => {
        await sut.perform({token: 'any_token'})
        expect(crypto.generateToken).toHaveBeenCalledWith({key : 'any_account_id'})
        expect(crypto.generateToken).toHaveBeenCalledTimes(1)    
    })

})
