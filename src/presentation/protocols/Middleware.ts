import { HttpResponse, HttpRequest } from './Http'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
