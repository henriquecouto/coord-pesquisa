import React, { useEffect } from "react";
import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import BaseScreen from "../../components/BaseScreen";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../../components/FormInput";
import { useForm } from "react-hook-form";
import schema from "./validations";
import { useDispatch, useSelector } from "react-redux";
import { KnowledgeAreasActions } from "../../redux/knowledgeAreas/knowledgeAreas.ducks";
import IGlobalState from "../../redux/definitions/GlobalState";
import FormAutocompleteInput from "../../components/FormAutocompleteInput";
import { AcademicTitlesActions } from "../../redux/academicTitles/academicTitles.ducks";
import FormSelect from "../../components/FormSelect";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    maxWidth: 500,
    width: "100%",
  },
  header: {
    margin: theme.spacing(4, 0),
  },
  item: {
    width: "100%",
  },
}));

interface IFormInputs {
  fullName: string;
  siape: number;
  course: string;
  lattes: string;
  academicTitle: string;
  academicUnit: string;
  knowledgeArea: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const knowledgeAreasReducer = useSelector(
    (state: IGlobalState) => state.knowledgeAreasReducer
  );
  const academicTitlesReducer = useSelector(
    (state: IGlobalState) => state.academicTitlesReducer
  );

  const { control, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur",
  });

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
  };

  useEffect(() => {
    dispatch(KnowledgeAreasActions.getKnowledgeAreasRequested());
    dispatch(AcademicTitlesActions.getAcademicTitlesRequested());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseScreen>
        <Paper className={classes.root}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item className={classes.header}>
              <Typography variant="h5">Faça seu cadastro</Typography>
            </Grid>
            <FormInput
              name="fullName"
              label="Nome completo"
              control={control}
              error={!!errors.fullName?.message}
              message={errors.fullName?.message}
            />
            <FormInput
              name="siape"
              label="Matrícula SIAPE"
              control={control}
              error={!!errors.siape?.message}
              message={errors.siape?.message}
            />
            <FormInput
              name="lattes"
              label="Link do Lattes"
              control={control}
              error={!!errors.lattes?.message}
              message={errors.lattes?.message}
            />
            <FormAutocompleteInput
              name="knowledgeArea"
              label="Área de Conhecimento"
              control={control}
              options={knowledgeAreasReducer.knowledgeAreas}
              getOptionLabel={(option: any) => option.name || ""}
              getOptionSelected={(option: any, value: any) => {
                return option.code === value.code;
              }}
              error={!!errors.knowledgeArea?.message}
              message={errors.knowledgeArea?.message}
            />
            <FormSelect
              name="academicTitle"
              label="Titulação"
              control={control}
              options={academicTitlesReducer.academicTitles.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              error={!!errors.academicTitle?.message}
              message={errors.academicTitle?.message}
            />
            <FormInput
              name="academicUnit"
              label="Unidade Acadêmica"
              control={control}
              error={!!errors.academicUnit?.message}
              message={errors.academicUnit?.message}
            />
            <FormInput
              name="course"
              label="Curso com maior carga horária"
              control={control}
              error={!!errors.course?.message}
              message={errors.course?.message}
            />
            <FormInput
              name="email"
              label="Email"
              control={control}
              error={!!errors.email?.message}
              message={errors.email?.message}
            />
            <FormInput
              name="password"
              label="Senha"
              control={control}
              error={!!errors.password?.message}
              message={errors.password?.message}
              type="password"
            />
            <Grid item className={classes.item}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Cadastrar
              </Button>
            </Grid>
            <Grid item container justify="flex-end">
              <Link href="/">
                <Typography variant="subtitle2" align="right">
                  Já possui uma conta?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </BaseScreen>
    </form>
  );
};

export default Register;
