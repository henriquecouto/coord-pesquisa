import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  Link as MuiLink,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { LockOutlined as Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validations";
import BaseScreen from "../../components/BaseScreen";
import FormInput from "../../components/FormInput";
import routes from "../../constants/routes";
import { useDispatch } from "react-redux";
import { UserActions } from "../../redux/user/user.ducks";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

interface IFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur",
  });

  const onSubmit = (data: IFormInputs) => {
    dispatch(UserActions.makeLogin(data.email, data.password, enqueueSnackbar));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <Typography variant="h6">Entrar</Typography>
            </Grid>
            <FormInput
              name="email"
              label="Email"
              control={control}
              error={!!errors.email?.message}
              message={errors.email?.message}
            />
            <FormInput
              name="password"
              label="Senha"
              control={control}
              error={!!errors.password?.message}
              message={errors.password?.message}
              type="password"
            />
            <Grid item className={classes.item}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Entrar
              </Button>
            </Grid>
            <Grid item container justify="space-between">
              <MuiLink component={Link} to={routes.recoverPassword.path}>
                <Typography variant="subtitle2" align="right">
                  Esqueceu a senha?
                </Typography>
              </MuiLink>
              <MuiLink component={Link} to={routes.register.path}>
                <Typography variant="subtitle2" align="right">
                  Não tem uma conta? Cadastre-se
                </Typography>
              </MuiLink>
            </Grid>
          </Grid>
        </Paper>
      </BaseScreen>
    </form>
  );
};

export default Login;
