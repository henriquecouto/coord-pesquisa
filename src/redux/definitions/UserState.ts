import ShortBio from "../../entities/ShortBio";
import User from "../../entities/User";

export default interface IUserState {
  loggedUser?: User;
  shortBio?: ShortBio;
  loading: boolean;
  error?: Error;
}
