import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import {
//   addProduct,
//   getProduct,
//   updateProduct,
//   deleteProduct,
// } from "../../Config";
import uuid from "react-uuid";
import styled from "styled-components";
import { DialogContentText } from "@mui/material";
import { addProduct, deleteDrink, getProducts } from "../../NewConfig";

const GreenBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #004625;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #004625;
    }
  }
`;

export function Row(props) {
  const { row, fetch } = props;
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, upName] = useState("");
  const [price, upPrice] = useState("");
  const [openDeletion, setOpenDeletion] = useState(false);
  const handleDeletionOpen = () => setOpenDeletion(true);
  const handleDeletionClose = () => setOpenDeletion(false);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);
  const updateOnClick = () => {
    const drink = {
      id: row.id,
      name: name,
      price: price,
      type: row.type,
    };
    // TODO: updateProduct(drink);
    setDialogOpen(false);
    fetch();
  };

  const deleteOnClick = async () => {
    await deleteDrink(row.id);
    fetch();
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: "#fff",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "#612335" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: "black", backgroundColor: "#fff" }}>
          {row.name}
        </TableCell>
        <TableCell sx={{ color: "black", backgroundColor: "#fff" }}>
          {row.price}
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "#612335" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, textAlign: "right" }}>
              <Button
                sx={{
                  backgroundColor: "#004625",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#fff", color: "black" },
                  marginRight: "10px",
                }}
                variant="contained"
                onClick={handleOpen}
              >
                Güncelle
              </Button>
              <Button
                sx={{
                  backgroundColor: "#004625",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#fff", color: "black" },
                }}
                variant="contained"
                onClick={handleDeletionOpen}
              >
                Sİl
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <div>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle textAlign="center" fontWeight="bold" fontSize="200%">
            Ürün Güncelle
          </DialogTitle>
          <DialogContent>
            <GreenBorderTextField
              onChange={(e) => {
                upName(e.target.value);
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Ürün İsmi"
              type="name"
              fullWidth
              variant="outlined"
              defaultValue={row.name}
            />
            <GreenBorderTextField
              onChange={(e) => {
                upPrice(e.target.value);
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Fiyat"
              type="price"
              fullWidth
              variant="outlined"
              defaultValue={row.price}
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: "lightgoldenrodyellow",
                backgroundColor: "#612325",
                "&:hover": { backgroundColor: "#fff", color: "black" },
              }}
              onClick={handleClose}
            >
              Vazgeç
            </Button>
            <Button
              sx={{
                color: "lightgoldenrodyellow",
                backgroundColor: "#004625",
                "&:hover": { backgroundColor: "#fff", color: "black" },
              }}
              type="submit"
              onClick={updateOnClick}
            >
              Kaydet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openDeletion}
          onClose={handleDeletionClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" fontWeight="bold">
            {"UYARI"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" fontWeight="bold">
              Ürün silinecektir,emin misiniz?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{
                color: "lightgoldenrodyellow",
                backgroundColor: "#612335",
                "&:hover": { backgroundColor: "#fff", color: "black" },
              }}
              onClick={handleDeletionClose}
              autoFocus
            >
              Hayır
            </Button>
            <Button
              sx={{
                color: "lightgoldenrodyellow",
                backgroundColor: "#004625",
                "&:hover": { backgroundColor: "#fff", color: "black" },
              }}
              onClick={deleteOnClick}
              autoFocus
            >
              Evet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [drink, setDrink] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const drinkData = await getProducts("drink");
    if (drinkData && drinkData.length > 0) {
      setDrink(drinkData);
    }
  }

  const onAddClick = () => {
    const id = uuid();
    addProduct(id, name, price, "drink");
    handleClose();
    fetchData();
  };

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow:
            "#612335 0px 2px 1px 3px, #612335 0px 1px 1px 0px, #612335 0px 1px 3px 0px",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fff" }}>
              <TableCell />
              <TableCell
                sx={{ fontSize: "100%", fontWeight: "bold", color: "black" }}
              >
                Ürün İsmi
              </TableCell>
              <TableCell
                sx={{ fontSize: "100%", fontWeight: "bold", color: "black" }}
              >
                Fiyat
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drink.map((row) => (
              <Row key={row.id} row={row} fetch={fetchData} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        style={{
          backgroundColor: "#004625",
          marginTop: "20px",
          width: "70px",
          height: "70px",
          color: "lightgoldenrodyellow",
        }}
        aria-label="expand row"
        size="small"
        onClick={handleOpen}
      >
        <AddIcon></AddIcon>
      </IconButton>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle textAlign="center" fontWeight="bold" fontSize="200%">
            Ürün Ekle
          </DialogTitle>
          <DialogContent>
            <GreenBorderTextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Ürün İsmi"
              type="name"
              fullWidth
              variant="outlined"
            />
            <GreenBorderTextField
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Fiyat"
              type="price"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: "lightgoldenrodyellow",
                backgroundColor: "#612325",
                "&:hover": { backgroundColor: "#fff", color: "black" },
              }}
              onClick={handleClose}
            >
              Vazgeç
            </Button>
            <Button
              sx={{
                color: "lightgoldenrodyellow",
                backgroundColor: "#004625",
                "&:hover": { backgroundColor: "#fff", color: "black" },
              }}
              type="submit"
              onClick={onAddClick}
            >
              Ekle
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
