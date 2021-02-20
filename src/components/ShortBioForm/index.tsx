import React from "react";
import { Button, Grid, makeStyles, Theme } from "@material-ui/core";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validations";
import FormInput from "../../components/FormInput";
import BaseScreen from "../../components/BaseScreen";
import FormInputArray from "../../components/FormInputArray";
import ShortBio from "../../entities/ShortBio";
import { Print } from "@material-ui/icons";
import { useBiographyPrinter } from "../../contexts/BiographyPrinter";

interface IFormInputs {
  researchGate: string;
  orcid: string;
  resume: string;
  publications: Array<{ value: string }>;
  education: Array<{ value: string }>;
}

interface ShortBioFormProps {
  onSubmit: (data: IFormInputs) => void;
  shortBio?: ShortBio;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: 1080,
    padding: theme.spacing(4),
  },
  printIcon: {
    marginLeft: theme.spacing(1.5),
  },
}));

const ShortBioForm: React.FC<ShortBioFormProps> = ({ onSubmit, shortBio }) => {
  const classes = useStyles();
  const { viewPrint } = useBiographyPrinter();

  const {
    control,
    handleSubmit,
    errors,
    reset,
    getValues,
    formState,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      ...shortBio,
      publications: shortBio?.publications || [{ value: "" }],
      education: shortBio?.education || [{ value: "" }],
    },
  });

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <BaseScreen>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Card title="Biografia">
              <FormInput
                outLabel
                margin="dense"
                name="researchGate"
                label="Link do Research Gate"
                placeholder="Ex.: https://www.researchgate.net/profile/Seu-Nome"
                control={control}
                error={!!errors.researchGate?.message}
                message={errors.researchGate?.message}
              />
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <FormInput
                outLabel
                margin="dense"
                name="orcid"
                label="Link do Orcid"
                placeholder="Ex.: https://orcid.org/0000-0001-5503-8274"
                control={control}
                error={!!errors.orcid?.message}
                message={errors.orcid?.message}
              />
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <FormInput
                outLabel
                multiline
                rows={3}
                rowsMax={5}
                margin="dense"
                name="resume"
                label="Resumo"
                placeholder="Forneça uma breve descrição da sua carreira de pesquisador e interesses"
                control={control}
                error={!!errors.resume?.message}
                message={errors.resume?.message}
              />
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <FormInputArray
                outLabel
                margin="dense"
                name="publications"
                label="Publicações recentes"
                control={control}
              />
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <FormInputArray
                outLabel
                margin="dense"
                name="education"
                label="Formação acadêmica"
                control={control}
                placeholder="Ex.: Bacharel em Sistemas de Informação - 2021"
              />
            </Card>
          </Grid>
          <Grid item container justify="space-between" direction="row">
            <Grid item xs>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!formState.isDirty || !formState.isValid}
                  >
                    Salvar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => reset()}
                    variant="contained"
                    color="secondary"
                    disabled={!formState.isDirty}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => viewPrint(new ShortBio(getValues()))}
              >
                Visualizar Impressão <Print className={classes.printIcon} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </BaseScreen>
    </form>
  );
};

export default ShortBioForm;
