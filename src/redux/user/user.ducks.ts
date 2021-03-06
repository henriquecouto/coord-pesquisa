import { createActions, createReducer } from "reduxsauce";
import ShortBio from "../../entities/ShortBio";
import User from "../../entities/User";
import IUserState from "../definitions/UserState";

export const { Types: UserTypes, Creators: UserActions } = createActions({
  registerUserRequested: ["data", "callback"],
  registerUserSucceeded: ["data"],
  registerUserFailed: ["error"],

  recoverPasswordRequested: ["email", "callback"],
  recoverPasswordSucceeded: [],
  recoverPasswordFailed: ["error"],

  getLoggedUserRequested: [],
  getLoggedUserSucceeded: ["data"],
  getLoggedUserFailed: ["error"],

  changeProfile: ["data", "callback"],
  changeProfileFailed: ["error"],

  changePicture: ["file", "callback", "onError"],
  changePictureFailed: ["error"],

  makeLogin: ["email", "password", "callback"],
  makeLoginFailed: ["error"],

  makeLogout: [],
  makeLogoutFailed: ["error"],

  getShortBioRequested: [],
  getShortBioSucceeded: ["data"],
  getShortBioFailed: ["error"],

  changeShortBio: ["data", "callback"],
  changeShortBioSucceeded: ["data"],
  changeShortBioFailed: ["error"],
});

export const INITIAL_STATE: IUserState = {
  loggedUser: undefined,
  shortBio: undefined,
  loading: false,
  error: undefined,
};

const requested = (state: IUserState) => {
  return { ...state, loading: true, error: undefined };
};

const failed = (state: IUserState, { error }: { error: Error }) => {
  return { ...state, loading: false, error };
};

const succeeded = (state: IUserState, { data }: { data: User }) => {
  return { ...state, loading: false, loggedUser: data };
};

const succeededShortBio = (state: IUserState, { data }: { data: ShortBio }) => {
  return { ...state, loading: false, shortBio: data };
};

const succeededRecoverPassword = (state: IUserState) => {
  return { ...state, loading: false };
};

export const userReducer = createReducer(INITIAL_STATE, {
  [UserTypes.REGISTER_USER_REQUESTED]: requested,
  [UserTypes.REGISTER_USER_FAILED]: failed,
  [UserTypes.REGISTER_USER_SUCCEEDED]: succeeded,

  [UserTypes.RECOVER_PASSWORD_REQUESTED]: requested,
  [UserTypes.RECOVER_PASSWORD_FAILED]: failed,
  [UserTypes.RECOVER_PASSWORD_SUCCEEDED]: succeededRecoverPassword,

  [UserTypes.GET_LOGGED_USER_REQUESTED]: requested,
  [UserTypes.GET_LOGGED_USER_FAILED]: failed,
  [UserTypes.GET_LOGGED_USER_SUCCEEDED]: succeeded,

  [UserTypes.CHANGE_PROFILE]: requested,
  [UserTypes.CHANGE_PROFILE_FAILED]: failed,

  [UserTypes.CHANGE_PICTURE]: requested,
  [UserTypes.CHANGE_PICTURE_FAILED]: failed,

  [UserTypes.MAKE_LOGIN]: requested,
  [UserTypes.MAKE_LOGIN_FAILED]: failed,

  [UserTypes.MAKE_LOGOUT]: requested,
  [UserTypes.MAKE_LOGOUT_FAILED]: failed,

  [UserTypes.GET_SHORT_BIO_REQUESTED]: requested,
  [UserTypes.GET_SHORT_BIO_FAILED]: failed,
  [UserTypes.GET_SHORT_BIO_SUCCEEDED]: succeededShortBio,

  [UserTypes.CHANGE_SHORT_BIO]: requested,
  [UserTypes.CHANGE_SHORT_BIO_SUCCEEDED]: succeededShortBio,
  [UserTypes.CHANGE_SHORT_BIO_FAILED]: failed,
});
