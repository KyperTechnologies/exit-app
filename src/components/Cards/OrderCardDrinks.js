import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions, Typography } from "@mui/material";
import OrderSliderButton from "../buttons/OrderSliderButton";
import { addOrder } from "../../NewConfig";
import { useLocation } from "react-router-dom";

export default function ActionAreaCard(props) {
  const { drink, fetch, fetchOrder, existingOrder } = props;
  const location = useLocation();

  const addOrderOnClick = async () => {
    const order = {
      id: existingOrder.id,
      productId: drink.id,
      tableId: location.state.tableId,
      nameOfOrder: drink.name,
      value: 1,
      unitPrice: Number(drink.price),
      totalPrice: Number(drink.price),
      productType: drink.type,
    };
    await addOrder({
      order,
    });
    await fetchOrder();
  };

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 2px 1px 2px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        color: "black",
        minWidth: "165px",
      }}
    >
      <CardActionArea onClick={addOrderOnClick}>
        <CardContent>
          <Typography variant="h5" key={drink.id} drink={drink}>
            {drink.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <OrderSliderButton
          fetch={fetch}
          product={drink}
          fetchOrder={fetchOrder}
        ></OrderSliderButton>
      </CardActions>
    </Card>
  );
}
