import React from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from "@material-ui/core";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
}));

interface FormInputArrayProps {
  control: Control<any>;
  error?: boolean;
  message?: string;
  name: string;
  label: string;
  outLabel?: boolean;
}

const FormInputArray: React.FC<FormInputArrayProps & TextFieldProps> = ({
  control,
  error,
  message,
  name,
  label,
  outLabel,
  ...props
}) => {
  const classes = useStyles();

  const { fields, remove, insert } = useFieldArray({ control, name });

  return (
    <Grid item className={classes.root}>
      {outLabel && <Typography>{label}</Typography>}
      {fields.map((field, index) => {
        return (
          <Controller
            key={field.id}
            name={`${name}[${index}].value`}
            control={control}
            defaultValue={field.value}
            as={
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                error={error}
                helperText={message}
                label={!outLabel && label}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        onClick={() => insert(index + 1, { value: "" })}
                      >
                        <Add />
                      </IconButton>

                      <IconButton
                        color="secondary"
                        onClick={() => remove(index)}
                        edge="end"
                        disabled={fields.length === 1}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...props}
              />
            }
          />
        );
      })}
    </Grid>
  );
};

export default FormInputArray;
