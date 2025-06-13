import { publicApi } from "~/api/public"

export type Access = {
  userId: string
  accessToken: string
  accessExpiresAt: string
  refreshToken: string
  refreshExpiresAt: string
}

export type Renew = {
  accessToken: string
  expiresAt: string
}

type SignInDTO = {
  email: string
  password: string
}
export function SignIn(dto: SignInDTO): Promise<Access> {
  return publicApi.post("auth/sign-in", { json: dto }).json<Access>()
}

type SignUpDTO = {
  email: string
  password: string
  username: string
}
export function SignUp(dto: SignUpDTO): Promise<Access> {
  return publicApi.post("auth/sign-up", { json: dto }).json<Access>()
}

export function RenewAccess(refreshToken: string): Promise<Renew> {
  return publicApi.post("auth/renew", { json: { refreshToken } }).json<Renew>()
}
