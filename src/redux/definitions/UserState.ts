import User from "../../entities/User";

export default interface IUserState {
  loggedUser?: User;
  loading: boolean;
  error?: Error;
}
