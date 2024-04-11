import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import OrderSlider from "../sliders/OrderSlider";
import { useLocation } from "react-router-dom";
import uuid from "react-uuid";
import { addOrder } from "../../NewConfig";

export default function IconButtons(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { product, fetchOrder } = props;
  const [value, setValue] = useState(1);
  const location = useLocation();

  const handleValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const addOrderOnClick = async () => {
    const id = uuid();
    const order = {
      id: id,
      productId: product.id,
      tableId: location.state.tableId,
      nameOfOrder: product.name,
      value: value,
      unitPrice: Number(product.price),
      totalPrice: value * Number(product.price),
      productType: product.type,
    };
    await addOrder({
      order,
    });
    await fetchOrder();
    handleClose();
  };

  return (
    <>
      <div>
        <IconButton
          sx={{
            backgroundColor: "#004225",
            color: "lightgoldenrodyellow",
            "&:hover": {
              backgroundColor: "#612335",
              color: "lightgoldenrodyellow",
            },
          }}
          onClick={handleOpen}
        >
          <AddShoppingCartIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ color: "lightgoldenrodyellow" }}
        >
          <DialogTitle fontWeight="bold">Ürün Miktarı</DialogTitle>
          <DialogContent>
            <OrderSlider handleValue={handleValue} value={value}></OrderSlider>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#004225",
                "&:hover": {
                  backgroundColor: "#612335",
                  color: "lightgoldenrodyellow",
                },
              }}
              onClick={handleClose}
            >
              Vazgeç
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#004225",
                "&:hover": {
                  backgroundColor: "#612335",
                  color: "lightgoldenrodyellow",
                },
              }}
              onClick={addOrderOnClick}
            >
              Onayla
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
