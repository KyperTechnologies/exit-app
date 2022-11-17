import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Layout from '../layout/Layout'
import TableCard from '../components/TableCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { addTable, getTable } from '../Config';
import uuid from 'react-uuid';

const Home = () => {
  const [table, setTable] = useState([]);
  const [tableName] = useState("");

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
      "name": tableName
    });
    fetchData();
  }

  const getContent = () => {
    return (
      <Box sx={{ height: '100vh' }}>
        <Grid container spacing={3}>
          {table.map(element => {
            return (
              <Grid m={8} sx={{ marginTop: '50px', maxHeight: '207px' }}>
                <TableCard table={element} fetch={fetchData}></TableCard>
              </Grid>
            );
          })}
        </Grid>
      </Box >
    );
  }

  return (
    <>
      <Layout>
        <Button style={{ marginTop: '40px' }} onClick={onAddClick} variant="contained" endIcon={<SendIcon />}>
          Ekle
        </Button>
        {getContent()}
      </Layout>
    </>
  );
};

export default Home;