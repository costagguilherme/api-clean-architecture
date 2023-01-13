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


export interface ISaveFacebookAccountRepository{
    saveWithFacebook: (params: SaveFacebookAccountRepository.Params) => Promise <void>
}

export namespace SaveFacebookAccountRepository {
    export type Params = {
        id?: string
        email: string
        name: string
        facebookId: string
    }
}

