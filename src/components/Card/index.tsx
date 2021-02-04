import React from "react";
import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";

interface CardProps {
  title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    color: theme.palette.grey[100],
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
  },
  content: {
    padding: theme.spacing(2),
  },
}));

const Card: React.FC<CardProps> = ({ children, title }) => {
  const classes = useStyles();
  return (
    <Paper>
      <Grid container direction="column">
        {!!title && (
          <>
            <Grid item className={classes.header}>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <Divider />
          </>
        )}
        <Grid item className={classes.content}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
