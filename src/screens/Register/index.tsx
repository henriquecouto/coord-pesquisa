import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Link as MuiLink,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { LockOutlined as Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
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
import { AcademicUnitsActions } from "../../redux/academicUnits/academicUnits.ducks";
import Course from "../../entities/Course";
import Skeleton from "./Skeleton";
import { UserActions } from "../../redux/user/user.ducks";
import routes from "../../constants/routes";
import Thanks from "../../components/Thanks";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100vh",
    overflow: "auto",
  },
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
  icon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "100%",
    padding: theme.spacing(0.8),
    color: theme.palette.grey[100],
    margin: theme.spacing(1),
  },
  thanks: {
    position: "static",
    bottom: 0,
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
  const { enqueueSnackbar } = useSnackbar();
  const userReducer = useSelector((state: IGlobalState) => state.userReducer);
  const knowledgeAreasReducer = useSelector(
    (state: IGlobalState) => state.knowledgeAreasReducer
  );
  const academicTitlesReducer = useSelector(
    (state: IGlobalState) => state.academicTitlesReducer
  );
  const academicUnitsReducer = useSelector(
    (state: IGlobalState) => state.academicUnitsReducer
  );
  const [courses, setCourses] = useState([] as Array<Course>);

  const {
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur",
  });
  const selectedAcademicUnitId = watch("academicUnit");

  const onSubmit = (data: IFormInputs) => {
    dispatch(UserActions.registerUserRequested(data, enqueueSnackbar));
  };

  useEffect(() => {
    dispatch(KnowledgeAreasActions.getKnowledgeAreasRequested());
    dispatch(AcademicTitlesActions.getAcademicTitlesRequested());
    dispatch(AcademicUnitsActions.getAcademicUnitsRequested());
  }, [dispatch]);

  useEffect(() => {
    setValue("course", "");
    const selectedAcademicUnit = academicUnitsReducer.academicUnits.find(
      (unit) => unit.id === selectedAcademicUnitId
    );
    setCourses(selectedAcademicUnit?.courses || []);
  }, [selectedAcademicUnitId, academicUnitsReducer.academicUnits, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <BaseScreen>
        <Paper className={classes.root}>
          <Grid container direction="column" alignItems="flex-end" spacing={2}>
            <Grid item container justify="center">
              <Typography variant="h4">Portal do Pesquisador</Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              className={classes.header}
            >
              {userReducer.loading ? (
                <CircularProgress size={35} className={classes.icon} />
              ) : (
                <Lock className={classes.icon} fontSize="large" />
              )}
              <Typography variant="h6">Faça seu cadastro</Typography>
            </Grid>
            {academicTitlesReducer.loading ||
            academicUnitsReducer.loading ||
            knowledgeAreasReducer.loading ? (
              <Skeleton />
            ) : (
              <>
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
                <FormSelect
                  name="academicUnit"
                  label="Unidade Acadêmica"
                  control={control}
                  options={academicUnitsReducer.academicUnits.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  error={!!errors.academicUnit?.message}
                  message={errors.academicUnit?.message}
                />
                <FormSelect
                  name="course"
                  label="Curso com maior carga horária"
                  control={control}
                  disabled={!courses.length}
                  options={courses.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
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
                    disabled={userReducer.loading}
                  >
                    Cadastrar
                  </Button>
                </Grid>
                <Grid item container justify="flex-end">
                  <MuiLink component={Link} to={routes.login.path}>
                    <Typography variant="subtitle2" align="right">
                      Já possui uma conta?
                    </Typography>
                  </MuiLink>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </BaseScreen>
      <div className={classes.thanks}>
        <Thanks />
      </div>
    </form>
  );
};

export default Register;
