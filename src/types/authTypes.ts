export type UserData = {
    email: string
    login: string
    password: string
    phoneNumber: string
    username: string
}

export type LoginData = {
    login: string
    password: string
}

export type LoginTokens = {
    accessToken: string
    refreshToken: string
}

export type RegStatus = 'ok' | 'invalid' | 'dupl' | 'err' | 0