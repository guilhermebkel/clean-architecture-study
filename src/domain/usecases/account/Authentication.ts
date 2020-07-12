export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authencation: AuthenticationParams) => Promise<string>
}
