import User from "../../entities/User";

export default interface IUserState {
  loggedAccount?: User;
  loading: boolean;
  error?: Error;
}
