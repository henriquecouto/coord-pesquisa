import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Print } from "@material-ui/icons";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Biography from "../../entities/Biography";
import ShortBio from "../../entities/ShortBio";
import IGlobalState from "../../redux/definitions/GlobalState";

const useStyles = makeStyles((theme: Theme) => ({
  printIcon: {
    marginLeft: theme.spacing(1.5),
  },
}));

interface IBiographyPrinterContext {
  viewPrint: (shortBio: ShortBio) => void;
}

const BiographyPrinterContext = createContext<IBiographyPrinterContext>({
  viewPrint: () => {},
});

export function useBiographyPrinter(): IBiographyPrinterContext {
  return useContext(BiographyPrinterContext);
}

export const BiographyPrinterProvider: React.FC = ({ children }) => {
  const classes = useStyles();
  const [biography, setBiography] = useState<Biography | null>(null);
  const loggedUser = useSelector(
    (state: IGlobalState) => state.userReducer.loggedUser
  );
  const loading = useSelector(
    (state: IGlobalState) => state.userReducer.loading
  );

  if (loading || !loggedUser) {
    return <h1>loading...</h1>;
  }

  const viewPrint = (shortBio: ShortBio) => {
    setBiography(
      new Biography({ academicData: shortBio, personalData: loggedUser })
    );
  };

  return (
    <BiographyPrinterContext.Provider value={{ viewPrint }}>
      <Dialog
        fullWidth
        onClose={() => setBiography(null)}
        open={!!biography}
        maxWidth={"md"}
      >
        <DialogTitle>Visualizar impressão</DialogTitle>
        <DialogContent dividers>IMPRESSÃO</DialogContent>
        <DialogActions>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button color="primary" onClick={() => setBiography(null)}>
                Fechar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Imprimir <Print className={classes.printIcon} />
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      {children}
    </BiographyPrinterContext.Provider>
  );
};
