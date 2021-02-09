import React from "react";
import {
  Grid,
  makeStyles,
  MenuItem,
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

interface IFormSelect {
  control: Control<any>;
  error?: boolean;
  message?: string;
  name: string;
  label?: string;
  options: Array<{ value: any; label: string }>;
}

const FormSelect: React.FC<IFormSelect & TextFieldProps> = ({
  control,
  error,
  message,
  name,
  label,
  options,
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
            select
            fullWidth
            type="text"
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={message}
            variant="outlined"
            {...props}
          >
            {options.map((item: any) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Grid>
  );
};

export default FormSelect;
