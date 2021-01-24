import React from "react";
import { Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import { Control, Controller } from "react-hook-form";
import { Autocomplete, AutocompleteProps } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
}));

interface IFormAutocompleteInput {
  control: Control<any>;
  error?: boolean;
  message?: string;
  name: string;
  label: string;
  options: Array<any>;
}

const FormAutocompleteInput: React.FC<
  IFormAutocompleteInput &
    Omit<AutocompleteProps<any, true, true, true>, "renderInput">
> = ({ control, error, message, name, label, ...props }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.root}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <Autocomplete
              value={
                props.options.find((option) => option.code === value) || null
              }
              onChange={(event: any, newValue: any) => {
                onChange(newValue?.code);
              }}
              getOptionSelected={(option, v) => option.code === v}
              noOptionsText="Nenhuma opção encontrada!"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant="outlined"
                  error={error}
                  helperText={message}
                />
              )}
              {...props}
            />
          );
        }}
      />
    </Grid>
  );
};

export default FormAutocompleteInput;
