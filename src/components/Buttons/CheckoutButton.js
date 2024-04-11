import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import CheckoutSlider from "../sliders/CheckoutSlider";
import { addOrder, deleteOrderWithTableId } from "../../NewConfig";

export default function IconButtons(props) {
  const { row, fetchOrder, setSplitPrice } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newValue, setValue] = useState(1);

  const handleValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const existingOrder = row;

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
      setSplitPrice(order.totalPrice);
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
          <PointOfSaleIcon style={{ color: "#fff" }} />
        </IconButton>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ürün Ayır</DialogTitle>
          <DialogContent>
            <CheckoutSlider
              handleValue={handleValue}
              newValue={newValue}
              orderValue={row.value}
            ></CheckoutSlider>
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
              Ayır
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
