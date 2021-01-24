import React from "react";
import {
  CssBaseline,
  Grid,
  GridProps,
  makeStyles,
  Theme,
} from "@material-ui/core";
import classnames from "classnames";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    overflow: "auto",
  },
  withHeader: {
    padding: 0,
    height: "calc(100vh - 64px)",
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 56px)",
    },
  },
}));

interface BaseScreenProps {
  withHeader?: boolean;
}

const BaseScreen: React.FC<BaseScreenProps & GridProps> = ({
  children,
  withHeader,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classnames(classes.root, withHeader && classes.withHeader)}
        {...props}
      >
        {children}
      </Grid>
    </>
  );
};

export default BaseScreen;
