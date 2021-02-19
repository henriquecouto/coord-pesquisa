import React from "react";
import { Skeleton as MuiSkeleton } from "@material-ui/lab";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    margin: theme.spacing(1, 0),
  },
}));

const Skeleton: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={56}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width="100%"
        height={36}
        className={classes.input}
      />
      <MuiSkeleton
        variant="rect"
        width={139}
        height={21}
        className={classes.input}
      />
    </>
  );
};

export default Skeleton;
