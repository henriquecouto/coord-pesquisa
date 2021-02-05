import { makeStyles, Theme } from "@material-ui/core";
import { Print } from "@material-ui/icons";
import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import BiographyPreview from "../../components/BiographyPreview";
import Modal from "../../components/Modal";
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
      <Modal
        open={!!biography}
        onClose={() => setBiography(null)}
        action={{
          title: (
            <>
              Imprimir <Print className={classes.printIcon} />
            </>
          ),
          run: () => console.log("imprimir"),
        }}
      >
        {biography && <BiographyPreview biography={biography} />}
      </Modal>
      {children}
    </BiographyPrinterContext.Provider>
  );
};
