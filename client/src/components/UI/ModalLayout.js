import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setModalMessage } from "../../actions";
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
const ModalLayout = (props) => {
  const modalOpen = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const modalHandle = () => {
    dispatch(setModal());
    dispatch(setModalMessage(""));
  };
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={modalHandle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalLayout;
