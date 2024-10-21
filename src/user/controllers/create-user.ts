import { IncomingDataMessage } from "../../app/application";
import { ServerResponse } from "http";
import { parseJSON, toError, toJSON } from "../../utils";
import service from "../services";
import { UserError } from "../errors";

export function createUserController(
  req: IncomingDataMessage,
  res: ServerResponse
) {
  try {
    if (!req.body)
      throw new UserError({
        name: "MALFORMED_INPUT",
        message: "Empty body",
      });

    const dto = parseJSON(req.body);
    const user = service.create(dto);
    return toJSON(res, 201, user);
  } catch (e) {
    return toError(res, e);
  }
}
