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
    if (tableData && tableData.length >= 0) {
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
        <Grid item xl={10} lg={9} md={9} xs={6}  >
          <Grid container={true} spacing={2} justifyContent='space-evenly'>
            {table.map(element => {
              return (
                <Grid item xl={4} lg={4} md={5} xs={12} >
                  <TableCard key={table.id} table={element} fetch={fetchData}></TableCard>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xl={2} lg={3} md={3} xs={6}>
          <Grid itemdisplay='flex' justifyContent='center'>
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
              <AddCircle sx={{ height: '75px', width: '75px', }} />
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
