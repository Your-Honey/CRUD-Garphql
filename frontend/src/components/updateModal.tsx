import { Box, Button, Modal, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ChangeEvent } from "react";

interface IProps {
  open: boolean;
  handleClose: () => void;
  updateDetail: { id: string; name: string; instagram: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
}

function UpdateModal({
  open,
  handleClose,
  updateDetail,
  handleChange,
  handleUpdate,
}: Readonly<IProps>) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          label="Name"
          name="name"
          variant="standard"
          value={updateDetail.name}
          onChange={handleChange}
        />
        <TextField
          sx={{ margin: "0px 0px 20px 0px" }}
          label="Instagram"
          variant="standard"
          name="instagram"
          value={updateDetail.instagram}
          onChange={handleChange}
        />
        <Grid2 container spacing={4}>
          <Grid2>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Grid2>
          <Grid2>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
}

export { UpdateModal };
