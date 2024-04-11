import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import CancelOrderSlider from "../sliders/CancelOrderSlider";
import { addOrder, deleteOrderWithTableId } from "../../NewConfig";

export default function IconButtons(props) {
  const [newValue, setValue] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { fetchOrder, order } = props;
  const existingOrder = order;
  const handleValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const updateOnClick = async () => {
    const value = Number(existingOrder.value) - newValue;

    if (value === 0) {
      await deleteOrderWithTableId(existingOrder.tableId, existingOrder.id);
    } else {
      const order = {
        ...existingOrder,
        value: -Number(newValue),
        totalPrice: -Number(existingOrder.unitPrice) * newValue,
      };
      await addOrder({ order });
    }

    await fetchOrder();
    handleClose();
  };

  return (
    <>
      <div>
        <IconButton
          style={{ backgroundColor: "#612335" }}
          onClick={handleOpen}
          color="primary"
          aria-label="add to shopping cart"
        >
          <DeleteIcon style={{ color: "#fff" }} />
        </IconButton>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ayrım İptali</DialogTitle>
          <DialogContent>
            <CancelOrderSlider
              orderValue={order.value}
              handleValue={handleValue}
              newValue={newValue}
            ></CancelOrderSlider>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              sx={{
                backgroundColor: "#004225",
                "&:hover": {
                  backgroundColor: "#612335",
                  color: "lightgoldenrodyellow",
                },
              }}
              variant="contained"
              onClick={handleClose}
            >
              Vazgeç
            </Button>
            <Button
              sx={{
                backgroundColor: "#004225",
                "&:hover": {
                  backgroundColor: "#612335",
                  color: "lightgoldenrodyellow",
                },
              }}
              variant="contained"
              onClick={updateOnClick}
            >
              İptalİ Onayla
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
