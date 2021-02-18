import { Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import logoUfal from "../../assets/images/logo-ufal.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoUfal: {
    width: 25,
    marginRight: theme.spacing(1),
  },
}));

const Thanks: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Divider />
      <div className={classes.root} style={{ paddingBottom: 5 }}>
        <Typography variant="caption" align="justify">
          Desenvolvido pelo Grupo de Pesquisa em Estudos Avançados em Ciência de
          Dados e Engenharia de Software
        </Typography>
      </div>
      <Divider variant="fullWidth" />
      <div className={classes.root} style={{ paddingTop: 5 }}>
        <img src={logoUfal} alt="logo ufal" className={classes.logoUfal} />
        <Typography variant="caption" align="justify">
          Coordenação de Pesquisa - Unidade Educacional de Penedo
        </Typography>
      </div>
    </>
  );
};

export default Thanks;
