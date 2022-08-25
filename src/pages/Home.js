import React, { useState, useEffect} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Layout from '../layout/Layout'
import TableCard  from '../components/TableCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {addTable, getTable} from '../Config';

const Home = () => {
  const [tables, setTables] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      const tableData = await getTable();
      if (tableData && tableData.length > 0) {
        setTables(tableData);
      }
    }
    fetchData();
  },[])
  
  const onAddClick = () => {
    addTable(1, {
      "id": 1,
      "name": "Masa1",
      "orders": [
        {
          "id": 1,
          "name": "Cay"
        }
      ]
    });
  }

  const getContent = () => {
    return (
      <Box sx={{height:'100vh'}}>
      <Grid container spacing={3}>
        {tables.map(element => {
          return (
            <Grid m={8} sx={{marginTop:'50px',maxHeight:'207px'}}>
              <TableCard></TableCard>
            </Grid>
          );
        })}
      </Grid>
      </Box>
    );
  }

  return (
    <>
      <Layout>
        <Button style={{marginTop: '100px'}} onClick={onAddClick} variant="contained" endIcon={<SendIcon />}>
          Ekle
        </Button>
        {getContent()}
      </Layout>
    </>
  );
};
  
export default Home;