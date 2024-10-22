import { IncomingDataMessage } from "../../app/application";
import { ServerResponse } from "http";
import { toError, toJSON } from "../../utils";
import service from "../services";
import { UserError } from "../errors";

export function getUserController(
  req: IncomingDataMessage,
  res: ServerResponse
) {
  try {
    const param = req.params;

    if (!param || !param["userId"]) {
      throw new UserError({
        name: "MALFORMED_INPUT",
        message: "userId not provided",
      });
    }

    const id = param["userId"];

    const user = service.getById(id);
    return toJSON(res, 200, user);
  } catch (e) {
    return toError(res, e);
  }
}
