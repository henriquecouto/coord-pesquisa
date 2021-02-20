import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import BaseScreen from "../../components/BaseScreen";
import Thanks from "../../components/Thanks";
import routes from "../../constants/routes";
import Route from "../../entities/Route";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(10, 2),
  },
  card: {
    width: 400,
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  thanks: {
    position: "static",
    bottom: 0,
    width: "100%",
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const navigate = (route: Route) => () => {
    history.push(route.path);
  };

  return (
    <BaseScreen withHeader direction="column">
      <Grid item className={classes.header}>
        <Typography variant="h3">Bem-vindo ao Portal do Pesquisador</Typography>
        <Typography>
          Aqui você pode gerenciar seus dados acadêmicos de forma muito simples
          e ter contato direto com as solicitações realizadas pela coordenação
          de pesquisa.
        </Typography>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item className={classes.card}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Gerenciamento de Perfil</Typography>
                <Typography>
                  Gerencie da forma que quiser as suas informações
                  profissionais!
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={navigate(routes.profile)}
                >
                  Editar Perfil
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item className={classes.card}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Biografia do Pesquisador</Typography>
                <Typography>
                  Crie e exporte uma biografia com seus dados acadêmicos!
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={navigate(routes.shortBio)}
                >
                  Criar Biografia
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item className={classes.card}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  Solicitações da Coordenação
                </Typography>
                <Typography>
                  Responda as solicitações da coordenação de pesquisa através de
                  questionários!
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={navigate(routes.questionaries)}
                >
                  Ver questionários
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.thanks}>
        <Thanks />
      </Grid>
    </BaseScreen>
  );
};

export default Home;
