import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckoutButton from "../buttons/CheckoutButton";
import { updateSplitOrder, getSplitOrder } from "../../Config";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SpanningTable(props) {
  const { order, fetchOrder } = props;
  const [splitPrice, setSplitPrice] = useState([""]);

  useEffect(() => {
    fetchSplitData();
  }, []);

  async function fetchSplitData() {
    const splitData = await getSplitOrder();
    if (splitData && splitData.length > 0) {
      setSplitPrice(splitData);
    }
  }

  const getTotalPrice = () => {
    return order.reduce((acc, obj) => acc + obj.totalPrice, 0);
  };

  const mapPrice = splitPrice.map((value) => value.totalSplitPrice);

  const deleteAllOnClick = async () => {
    const newSplit = { ...mapPrice, value: 0, totalSplitPrice: 0 };
    updateSplitOrder(newSplit);
    await fetchSplitData();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        color: "black",
        height: "60vh",
      }}
    >
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontSize: "100%", fontWeight: "bold", textAlign: "center" }}
            >
              Ürün İsmi
            </TableCell>
            <TableCell
              sx={{ fontSize: "100%", fontWeight: "bold", textAlign: "center" }}
            >
              Tane
            </TableCell>
            <TableCell
              sx={{ fontSize: "100%", fontWeight: "bold", textAlign: "center" }}
            >
              Birim Fiyat
            </TableCell>
            <TableCell
              sx={{ fontSize: "100%", fontWeight: "bold", textAlign: "center" }}
            >
              Tutar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ height: "max-content" }}>
          {order.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ textAlign: "center" }}>
                {row.nameOfOrder}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>{row.value}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {row.unitPrice} ₺
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {row.totalPrice} ₺
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <CheckoutButton
                  row={row}
                  fetchOrder={fetchOrder}
                  fetchSplitData={fetchSplitData}
                ></CheckoutButton>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={2}
              sx={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}
            >
              Ayrılan Tutar : {Number(mapPrice)} ₺
              {mapPrice > 0 && (
                <IconButton
                  style={{ backgroundColor: "#612335" }}
                  onClick={deleteAllOnClick}
                  color="primary"
                  aria-label="add to shopping cart"
                >
                  <DeleteIcon style={{ color: "#fff" }} />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={2}
              sx={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}
            >
              Toplam Tutar : {getTotalPrice()} ₺
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
