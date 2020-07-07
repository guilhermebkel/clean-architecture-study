export type AuthenticationModel = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authencation: AuthenticationModel) => Promise<string>
}
