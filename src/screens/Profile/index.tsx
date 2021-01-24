import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import IGlobalState from "../../redux/definitions/GlobalState";
import getNameInitials from "../../helpers/getNameInitials";
import { KnowledgeAreasActions } from "../../redux/knowledgeAreas/knowledgeAreas.ducks";
import { AcademicTitlesActions } from "../../redux/academicTitles/academicTitles.ducks";
import { AcademicUnitsActions } from "../../redux/academicUnits/academicUnits.ducks";
import ProfileForm from "../../components/ProfileForm";
import User from "../../entities/User";
import { UserActions } from "../../redux/user/user.ducks";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
  },
  header: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(["height", "transform"], {
      duration: 1000,
      easing: theme.transitions.easing.easeInOut,
    }),
    height: theme.spacing(35),
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(25),
    },
    marginBottom: theme.spacing(12),
  },
  avatar: {
    position: "absolute",
    bottom: theme.spacing(-7),
    width: theme.spacing(35),
    height: theme.spacing(35),
    fontSize: theme.typography.h1.fontSize,

    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.h2.fontSize,
      width: theme.spacing(25),
      height: theme.spacing(25),
    },

    transition: theme.transitions.create(
      ["height", "width", "font-size", "transform"],
      {
        duration: 1000,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
  },
  form: {
    padding: theme.spacing(2),
    maxWidth: 500,
    width: "100%",
  },
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userReducer = useSelector((state: IGlobalState) => state.userReducer);

  useEffect(() => {
    dispatch(KnowledgeAreasActions.getKnowledgeAreasRequested());
    dispatch(AcademicTitlesActions.getAcademicTitlesRequested());
    dispatch(AcademicUnitsActions.getAcademicUnitsRequested());
  }, [dispatch]);

  const onSubmit = (data: User) => {
    dispatch(UserActions.changeProfile(data, enqueueSnackbar));
  };

  if (userReducer.loading || !userReducer.loggedUser) {
    return <h1>loading...</h1>;
  }

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <Avatar className={classes.avatar}>
          {getNameInitials(userReducer.loggedUser?.fullName)}
        </Avatar>
      </Grid>
      <Grid item>
        <Paper className={classes.form}>
          <ProfileForm user={userReducer.loggedUser} onSubmit={onSubmit} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
