import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import React from "react";

interface ModalProps {
  onClose: () => void;
  open: boolean;
  actions: Array<React.ReactNode>;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, open, actions }) => {
  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth={"md"}>
      <DialogTitle>Visualizar impressão</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Grid container justify="flex-end" spacing={2}>
          {actions.map((action, index) => (
            <Grid item key={index}>
              {action}
            </Grid>
          ))}
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
