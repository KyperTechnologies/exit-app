import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import Layout from "../layout/Layout";
import TableCard from "../components/Cards/TableCard";
import Grid from "@mui/material/Grid";
import uuid from "react-uuid";
import { AddCircle } from "@mui/icons-material";

const Home = () => {
  const [table, setTable] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    fetch("http://localhost:3000/getTables")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tables");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length >= 0) {
          setTable(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const onAddClick = () => {
    const id = uuid();
    const name = `Masa ${table.length + 1}`;
    fetch("http://localhost:3000/addTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to add table");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getContent = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xl={10} lg={9} md={9} xs={6}>
          <Grid container={true} spacing={2} justifyContent="space-evenly">
            {table.map((element) => {
              return (
                <Grid item xl={4} lg={4} md={5} xs={12}>
                  <TableCard
                    key={table.id}
                    table={element}
                    fetch={fetchData}
                  ></TableCard>
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
      </Grid>
    );
  };

  return (
    <>
      <Layout>{getContent()}</Layout>
    </>
  );
};

export default Home;
