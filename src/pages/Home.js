import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import Layout from '../layout/Layout'
import TableCard from '../components/TableCard';
import Grid from '@mui/material/Grid';
import { addTable, getTable } from '../Config';
import uuid from 'react-uuid';
import { AddCircle } from '@mui/icons-material';

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
      <Grid container spacing={2}>
        <Grid xs={11}>
          <Grid container spacing={2} justifyContent='space-evenly'>
            {table.map(element => {
              return (
                <Grid m={8}>
                  <TableCard key={table.id} table={element} fetch={fetchData}></TableCard>
                </Grid>
              );
            })}

          </Grid>
        </Grid>
        <Grid xs={1} display='flex' justifyContent='center'>
          <IconButton onClick={onAddClick} variant="outlined" sx={{
            color: 'lightgoldenrodyellow',
            backgroundColor: '#004225',
            position: 'fixed',
            bottom: '50%',
            width: '10%',
            height: '20%',
            transition: 0,
          }}>
            <AddCircle />
          </IconButton>
        </Grid>
      </Grid>
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
