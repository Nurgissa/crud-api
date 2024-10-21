import UserRepository from "../repositories/repository";
import UserService from "./service";

const repository = new UserRepository();
const service = new UserService(repository);

export default service;
