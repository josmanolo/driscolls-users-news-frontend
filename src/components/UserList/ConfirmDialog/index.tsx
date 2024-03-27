import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ open, onClose, onConfirm }: ConfirmDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
  >
    <DialogTitle id="confirm-dialog-title">Confirm Delete</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-description">
        Are you sure you want to delete this user?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
