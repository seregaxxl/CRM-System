export type UserData = {
    email: string
    login: string
    password: string
    phoneNumber: string
    username: string
    id: number
    isAdmin: boolean
    isBlocked: boolean
    date: string
}

export type SearchData = {
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    isBlocked?: boolean
    limit?: number
    offset?: number
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