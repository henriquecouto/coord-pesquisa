import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Link as MuiLink,
} from "@material-ui/core";
import { LockOutlined as Lock } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BaseScreen from "../../components/BaseScreen";
import FormInput from "../../components/FormInput";
import Thanks from "../../components/Thanks";
import routes from "../../constants/routes";
import { UserActions } from "../../redux/user/user.ducks";
import schema from "./validations";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100vh",
  },
  root: {
    padding: theme.spacing(2),
    maxWidth: 500,
    width: "100%",
  },
  header: {
    margin: theme.spacing(4, 0),
  },
  item: {
    width: "100%",
  },
  icon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "100%",
    padding: theme.spacing(0.8),
    color: theme.palette.grey[100],
    margin: theme.spacing(1),
  },
  thanks: {
    position: "static",
    bottom: 0,
    width: "100%",
  },
}));

interface IFormInputs {
  email: string;
}

const RecoverPassword: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur",
  });

  const onSubmit = ({ email }: IFormInputs) => {
    dispatch(UserActions.recoverPasswordRequested(email, enqueueSnackbar));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <BaseScreen>
        <Paper className={classes.root}>
          <Grid container direction="column" alignItems="flex-end" spacing={2}>
            <Grid item container justify="center">
              <Typography variant="h4">Portal do Pesquisador</Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              className={classes.header}
            >
              <Lock className={classes.icon} fontSize="large" />
              <Typography variant="h6">Recuperar Senha</Typography>
            </Grid>
            <FormInput
              name="email"
              label="Email"
              control={control}
              error={!!errors.email?.message}
              message={errors.email?.message}
            />
            <Grid item className={classes.item}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Recuperar
              </Button>
            </Grid>
            <Grid item container justify="space-between">
              <MuiLink component={Link} to={routes.login.path}>
                <Typography variant="subtitle2" align="right">
                  Quer fazer login?
                </Typography>
              </MuiLink>
            </Grid>
          </Grid>
        </Paper>
      </BaseScreen>
      <div className={classes.thanks}>
        <Thanks />
      </div>
    </form>
  );
};

export default RecoverPassword;
