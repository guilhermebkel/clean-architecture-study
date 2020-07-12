import { HttpResponse, HttpRequest } from '@/presentation/protocols/Http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
