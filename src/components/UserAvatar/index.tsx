import { Avatar, Fab, makeStyles, Theme } from "@material-ui/core";
import { CameraAltOutlined } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import getNameInitials from "../../helpers/getNameInitials";
import IGlobalState from "../../redux/definitions/GlobalState";
import { UserActions } from "../../redux/user/user.ducks";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    borderRadius: "100%",
  },
  avatar: {
    position: "absolute",
    width: "inherit",
    height: "inherit",
    fontSize: "inherit",
  },
  translucent: {
    opacity: 0.8,
  },
  icon: {
    fontSize: "inherit",
  },
}));

const inputId = "avatar-input";

interface UserAvatarProps {
  changeable?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ changeable }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userReducer = useSelector((state: IGlobalState) => state.userReducer);

  const [newPicture, setNewPicture] = useState("");
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangePicture = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files[0]) {
      setNewPicture(URL.createObjectURL(files[0]));
      dispatch(
        UserActions.changePicture(files[0], enqueueSnackbar, () =>
          setNewPicture("")
        )
      );
    }
  };

  return (
    <>
      <input
        hidden
        type="file"
        accept="image/png"
        id={inputId}
        ref={inputRef}
        onChange={onChangePicture}
      />

      <div
        className={classnames(classes.avatar, classes.root)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Avatar
          className={classes.avatar}
          src={newPicture || userReducer.loggedUser?.picture}
        >
          {getNameInitials(userReducer.loggedUser?.fullName)}
        </Avatar>

        {changeable && hover && (
          <label htmlFor={inputId} className={classes.avatar}>
            <Avatar
              className={classnames(classes.avatar, classes.translucent)}
              component={Fab}
              onClick={() => inputRef.current?.click()}
            >
              <CameraAltOutlined className={classes.icon} />
            </Avatar>
          </label>
        )}
      </div>
    </>
  );
};

export default UserAvatar;
