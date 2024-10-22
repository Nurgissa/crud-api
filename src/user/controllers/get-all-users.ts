import { ServerResponse } from "http";
import { IncomingDataMessage } from "../../app/application";
import { toError, toJSON } from "../../utils";
import services from "../services";

export function getAllUsersController(
  req: IncomingDataMessage,
  res: ServerResponse
) {
  try {
    const users = services.getAll();
    return toJSON(res, 200, users);
  } catch (e) {
    return toError(res, e);
  }
}
