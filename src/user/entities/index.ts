import { validate as validateId } from "uuid";
import buildMakeUser from "./user";

const makeUser = buildMakeUser({ validateId });

export default makeUser;
