import { Server, createServer, IncomingMessage, ServerResponse } from "node:http";
import Route from "./router";

export interface IncomingDataMessage extends IncomingMessage {
  body?: string;
  params?: Record<string, string>;
}

class Application {
  routes: Route[] = [];
  server: Server;

  constructor() {
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      this._handleRequest(req, res);
    });
  }

  use(route: Route) {
    this.routes.push(route);
  }

  start(PORT: number) {
    if (!this.server) {
      throw new Error("Internal error");
    }

    if (this.routes.length === 0) {
      throw new Error("No routes registered!");
    }

    this.server.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  }

  _handleRequest(request: IncomingDataMessage, response: ServerResponse) {
    let chunks: any[] = [];
    request
      .on("error", (err) => {
        throw new Error(err.message);
      })
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const body = Buffer.concat(chunks).toString();
        request.body = body;
        for (let route of this.routes) {
          if (route._canHandle(request)) {
            route.process(request, response);
            return;
          }
        }
      });
  }
}

export default Application;
