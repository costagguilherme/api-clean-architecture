export interface ILoadUserAccountRepository {
    load: (params: LoadUserAccountRepository.Params) => Promise <Result>
}

export namespace LoadUserAccountRepository {
    export type Params = {
        email: string
    }
}

export type Result = undefined | {
    id: string,
    name?: string
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

export interface IUpdateFacebookAccountRepository {
    updateWithFacebook: (params: UpdateFacebookAccountRepository.Params) => Promise <void>
}

export namespace UpdateFacebookAccountRepository {
    export type Params = {
        id: string
        facebookId: string
        name: string
    }
}
