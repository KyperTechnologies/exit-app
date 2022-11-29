import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import Layout from '../Layout/Layout'
import TableCard from '../components/Cards/TableCard';
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
        <Grid xs={11} lg={11}>
          <Grid xs={12} container spacing={2} justifyContent='space-evenly'>
            {table.map(element => {
              return (
                <Grid m={8}>
                  <TableCard key={table.id} table={element} fetch={fetchData}></TableCard>
                </Grid>
              );
            })}

          </Grid>
        </Grid>
        <Grid lg={1} xs={1}>
          <Grid xs={12} display='flex' justifyContent='center'>
            <IconButton onClick={onAddClick} variant="outlined" sx={{
              color: 'lightgoldenrodyellow',
              backgroundColor: '#004225',
              position: 'fixed',
              bottom: '50%',
              '&:hover': {
                backgroundColor: '#612335',
                color: 'lightgoldenrodyellow',
              }
            }}>
              <AddCircle sx={{ height: '100px', width: '100px', }} />
            </IconButton>
          </Grid>
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
