import React from "react";
import {
  Grid,
  makeStyles,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from "@material-ui/core";
import { Control, Controller } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
}));

interface FormInputProps {
  control: Control<any>;
  error?: boolean;
  message?: string;
  name: string;
  label?: string;
  outLabel?: boolean;
}

const FormInput: React.FC<FormInputProps & TextFieldProps> = ({
  control,
  error,
  message,
  name,
  label,
  outLabel,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.root}>
      {outLabel && <Typography>{label}</Typography>}
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label={!outLabel && label}
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
