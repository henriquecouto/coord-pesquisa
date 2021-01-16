import React from "react";
import { Grid, GridProps, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    overflow: "auto",
  },
}));

const BaseScreen: React.FC<GridProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default BaseScreen;
