import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Course from "../../entities/Course";
import User from "../../entities/User";
import IGlobalState from "../../redux/definitions/GlobalState";
import FormAutocompleteInput from "../FormAutocompleteInput";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import schema from "./validations";

interface ProfileFormProps {
  user: User;
  onSubmit: (data: User) => void;
  formId?: string;
}

interface IFormInputs {
  fullName: string;
  siape: string;
  course: string;
  lattes: string;
  academicTitle: string;
  academicUnit: string;
  knowledgeArea: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  onSubmit,
  formId = "profile-form",
}) => {
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
    reset,
    formState,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      ...user,
      knowledgeArea: user.knowledgeArea.code,
      academicTitle: user.academicTitle.id,
      academicUnit: user.academicUnit.id,
      course: user.course.name,
    },
  });
  const selectedAcademicUnitId = watch("academicUnit");

  useEffect(() => {
    setValue("course", "");
  }, [selectedAcademicUnitId, setValue]);

  useEffect(() => {
    const selectedAcademicUnit = academicUnitsReducer.academicUnits.find(
      (unit) => unit.id === selectedAcademicUnitId
    );
    setCourses(selectedAcademicUnit?.courses || []);
  }, [selectedAcademicUnitId, academicUnitsReducer.academicUnits, setValue]);

  useEffect(() => {
    if (user) {
      const { course } = user;
      setValue("course", course.name);
    }
  }, [user, setValue]);

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
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
        <Grid item container spacing={2}>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!Object.keys(formState.touched).length}
            >
              Salvar
            </Button>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => reset()}
              disabled={!Object.keys(formState.touched).length}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
