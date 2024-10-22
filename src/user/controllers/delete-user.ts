import { IncomingDataMessage } from "../../app/application";
import { ServerResponse } from "http";
import { toError, toJSON } from "../../utils";
import { UserError } from "../errors";
import service from "../services";

export function deleteUserController(
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

    const isDeleted = service.deleteById(id);
    return toJSON(res, 204, isDeleted);
  } catch (e) {
    return toError(res, e);
  }
}
