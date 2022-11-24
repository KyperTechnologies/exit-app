import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Layout from '../layout/Layout'
import TableCard from '../components/TableCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { addTable, getTable } from '../Config';
import uuid from 'react-uuid';

const Home = () => {
  const [table, setTable] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const tableData = await getTable();
    if (tableData && tableData.length > 0) {
      setTable(tableData);
    }
  }

  const onAddClick = () => {
    const id = uuid();
    addTable(id, {
      "id": id,
      "name": `Masa ${table.length + 1}`,
    });
    fetchData();
  }

  const getContent = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={10}>
            <Grid container spacing={2}>
              {table.map(element => {
                return (
                  <Grid m={8}>
                    <TableCard key={table.id} table={element} fetch={fetchData}></TableCard>
                  </Grid>
                );
              })}

            </Grid>
          </Grid>
          <Grid xs={2}>
            <Button style={{ display: 'flex', }} onClick={onAddClick} variant="contained" endIcon={<SendIcon />}>
              Ekle
            </Button>
          </Grid>
        </Grid>
      </Box >
    );
  }

  return (
    <>
      <Layout>
        {getContent()}
      </Layout>
    </>
  );

};

export default Home;
