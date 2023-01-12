export interface ILoadUserAccountRepository {
    load: (params: LoadUserAccountRepository.Params) => Promise <Result>
}

export namespace LoadUserAccountRepository {
    export type Params = {
        email: string
    }
}


export interface ICreateFacebookAccountRepository{
    createFromFacebook: (params: LoadUserAccountRepository.Params) => Promise <void>
}

export namespace CreateFacebookAccountRepository {
    export type Params = {
        email: string
        facebookId: string
        name: string
    }
}

export type Result = undefined


