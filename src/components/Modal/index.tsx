import {
  Button,
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
  action: { title: React.ReactNode; run: () => void };
}

const Modal: React.FC<ModalProps> = ({ children, onClose, open, action }) => {
  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth={"md"}>
      <DialogTitle>Visualizar impressão</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button color="primary" onClick={onClose}>
              Fechar
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={action.run}>
              {action.title}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
