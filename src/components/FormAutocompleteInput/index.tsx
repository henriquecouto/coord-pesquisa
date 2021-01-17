import React from "react";
import {
  Grid,
  makeStyles,
  TextField,
  TextFieldProps,
  Theme,
} from "@material-ui/core";
import { Control, Controller } from "react-hook-form";
import { Autocomplete, AutocompleteProps } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
}));

interface IFormInput {
  control: Control<any>;
  error?: boolean;
  message?: string;
  name: string;
  label: string;
  options: Array<any>;
}

const FormAutocompleteInput: React.FC<
  IFormInput &
    Omit<AutocompleteProps<TextFieldProps, true, true, true>, "renderInput">
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
              onChange={(event: any, newValue: any) => {
                onChange(newValue);
              }}
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
