export interface ILoadUserAccountRepository {
    load: (params: LoadUserAccountRepository.Params) => Promise <void>
}

export namespace LoadUserAccountRepository {
    export type Params = {
        email: string
    }
}