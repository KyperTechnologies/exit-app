import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import CreditCard from "../components/cards/CreditCard";
import Grid from "@mui/material/Grid";
import { addCredit, getCredits } from "../NewConfig";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import uuid from "react-uuid";
import styled from "styled-components";

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

const Credit = () => {
  const [credit, setCredit] = useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);
  const [creditOwnerName, setCreditOwnerName] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const creditOwnerData = await getCredits();
    if (creditOwnerData && creditOwnerData.length >= 0) {
      setCredit(creditOwnerData);
    }
  }

  const addTableNameOnClick = async () => {
    const id = uuid();
    const newCredit = {
      id,
      ownerName: creditOwnerName,
      totalPrice: -Number(balance),
    };
    await addCredit(newCredit);
    handleClose();
    await fetchData();
  };

  const onAddClick = async () => {
    handleOpen();
  };

  const getContent = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xl={10} lg={9} md={9} xs={6}>
          <Grid container={true} spacing={2} justifyContent="space-evenly">
            {credit.map((element) => {
              return (
                <Grid xl={3}>
                  <CreditCard
                    key={credit.id}
                    credit={element}
                    totalPrice={element.totalPrice}
                    fetch={fetchData}
                    setCredit={setCredit}
                  ></CreditCard>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xl={2} lg={3} md={3} xs={6}>
          <Grid itemdisplay="flex" justifyContent="center">
            <IconButton
              onClick={onAddClick}
              variant="outlined"
              sx={{
                color: "lightgoldenrodyellow",
                backgroundColor: "#004225",
                position: "fixed",
                bottom: "50%",
                "&:hover": {
                  backgroundColor: "#612335",
                  color: "lightgoldenrodyellow",
                },
              }}
            >
              <AddCircle sx={{ height: "75px", width: "75px" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle fontSize="200%" fontWeight="bold">
            Yeni Kişi
          </DialogTitle>
          <DialogContent>
            <GreenBorderTextField
              onChange={(e) => {
                setCreditOwnerName(e.target.value);
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Ad"
              type="name"
              fullWidth
              variant="outlined"
            />
            <GreenBorderTextField
              onChange={(e) => {
                setBalance(e.target.value);
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Bakiye"
              type="name"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#612335",
                color: "lightgoldenrodyellow",
                "&:hover": { backgroundColor: "#fff", color: "black" },
              }}
              onClick={handleClose}
            >
              Vazgeç
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#004625",
                color: "lightgoldenrodyellow",
                "&:hover": { backgroundColor: "#fff", color: "black" },
              }}
              type="submit"
              onClick={addTableNameOnClick}
            >
              Kaydet
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  };

  return (
    <>
      <Layout>{getContent()}</Layout>
    </>
  );
};

export default Credit;
