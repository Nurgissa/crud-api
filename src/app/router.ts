import { IncomingMessage, ServerResponse } from "http";
import { IncomingDataMessage } from "./application";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "*";

export type Handler = (
  request: IncomingDataMessage,
  response: ServerResponse
) => void;

const PARAM_REGEX = /[^{}]+(?=})/;

class Route {
  private readonly _url: string[];
  private readonly _method: HttpMethod;
  private readonly _handler: Handler;

  constructor(method: HttpMethod, url: string, handler: Handler) {
    this._method = method;
    this._handler = handler;
    this._url = url.split("/").map((chunk) => chunk.trim());
  }

  static get(url: string, callback: Handler) {
    return new Route("GET", url, callback);
  }

  static post(url: string, callback: Handler) {
    return new Route("POST", url, callback);
  }

  static put(url: string, callback: Handler) {
    return new Route("PUT", url, callback);
  }

  static delete(url: string, callback: Handler) {
    return new Route("DELETE", url, callback);
  }

  static notFound(callback: Handler) {
    return new Route("*", "*", callback);
  }

  process(req: IncomingDataMessage, res: ServerResponse) {
    if (this._canHandle(req)) {
      this._handler(req, res);
    }
  }

  _canHandle(req: IncomingDataMessage) {
    if (this._url[0] === "*") return true;
    if (req.method !== this._method) return false;

    const chunks = req.url?.split("/").map((chunk) => chunk.trim());

    if (!chunks || chunks.length !== this._url.length) return false;

    const params: Record<string, string> = {};
    for (let i = 0; i < this._url.length; i++) {
      const urlChunk = this._url[i];

      const match = urlChunk.match(PARAM_REGEX);

      if (match) {
        const [key] = match;
        params[key] = chunks[i];
      } else {
        if (urlChunk !== chunks[i]) return false;
      }
    }

    req.params = params;
    return true;
  }
}

export default Route;
