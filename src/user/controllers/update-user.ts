import { ServerResponse } from "http";
import { IncomingDataMessage } from "../../app/application";
import { parseJSON, toError, toJSON } from "../../utils";
import { UserError } from "../errors";
import service from "../services";

export function updateUserController(
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
    if (!req.body)
      throw new UserError({
        name: "MALFORMED_INPUT",
        message: "Empty body",
      });

    const id = param["userId"];
    const dto = parseJSON(req.body);

    const user = service.update(id, dto);
    return toJSON(res, 200, user);
  } catch (e) {
    return toError(res, e);
  }
}
