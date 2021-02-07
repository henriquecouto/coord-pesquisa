import { Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseScreen from "../../components/BaseScreen";
import Card from "../../components/Card";
import IGlobalState from "../../redux/definitions/GlobalState";
import { QuestionariesActions } from "../../redux/questionaries/questionaries.ducks";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
  item: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  questionary: {
    width: 430,
    height: 150,
    overflow: "auto",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const Questionaries: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { loading, questionaries } = useSelector(
    (state: IGlobalState) => state.questionariesReducer
  );

  useEffect(() => {
    dispatch(QuestionariesActions.getAllQuestionariesRequested());
  }, [dispatch]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <BaseScreen
      withHeader
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
    >
      {questionaries?.map((questionary) => (
        <Grid item key={questionary.name} className={classes.item}>
          <Card className={classes.questionary}>
            <Typography variant="h6">{questionary.name}</Typography>
            <Typography>{questionary.description}</Typography>
          </Card>
        </Grid>
      ))}
    </BaseScreen>
  );
};

export default Questionaries;
