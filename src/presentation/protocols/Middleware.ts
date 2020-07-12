import { HttpResponse, HttpRequest } from '@/presentation/protocols/Http'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
