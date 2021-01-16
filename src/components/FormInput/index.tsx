import React from "react";
import {
  Grid,
  makeStyles,
  TextField,
  TextFieldProps,
  Theme,
} from "@material-ui/core";
import { Control, Controller } from "react-hook-form";

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
}

const FormInput: React.FC<IFormInput & TextFieldProps> = ({
  control,
  error,
  message,
  name,
  label,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.root}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={message}
            {...props}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
