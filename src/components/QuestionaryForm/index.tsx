import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Control, useForm } from "react-hook-form";
import Questionary from "../../entities/Questionary";
import BaseScreen from "../BaseScreen";
import Card from "../Card";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";

interface InputParams {
  name: string;
  control: Control<any>;
  options?: Array<{ value: any; label: string }>;
}

const input = ({ name, control, options }: InputParams) => ({
  number: (
    <FormInput
      name={name}
      control={control}
      margin="dense"
      type="number"
      inputProps={{ min: 0 }}
    />
  ),
  select: options && (
    <FormSelect
      name={name}
      control={control}
      options={options}
      margin="dense"
    />
  ),
});

interface IQuestionaryFormProps {
  onSubmit: (data: any) => void;
  respondingQuestionary?: Questionary;
  respondingQuestionaryResponses: any;
}

const QuestionaryForm: React.FC<IQuestionaryFormProps> = ({
  onSubmit,
  respondingQuestionary,
  respondingQuestionaryResponses,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: respondingQuestionaryResponses,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseScreen direction="column" spacing={2} alignItems="flex-start">
        {respondingQuestionary?.sections?.map((section) =>
          section.subsections?.map((subsection) =>
            subsection.questions?.map((question) => (
              <Grid item style={{ width: 1000 }} key={question.id}>
                <Card
                  title={
                    question.priority === "1"
                      ? `${section.name.toUpperCase()} • ${subsection.name}`
                      : ""
                  }
                  style={{ width: "100%" }}
                >
                  <Grid container direction="column">
                    <Grid item>
                      <Typography>{question.name}</Typography>
                    </Grid>
                    <Grid item style={{ maxWidth: 350 }}>
                      {
                        input({
                          name: question.id,
                          control,
                          options: question.options?.map((v) => ({
                            value: v.value,
                            label: v.name,
                          })),
                        })[question.type]
                      }
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
          )
        )}
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Salvar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => reset()}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </BaseScreen>
    </form>
  );
};

export default QuestionaryForm;
