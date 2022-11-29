import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout'
import CreditCard from '../components/Cards/CreditCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Home = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    getTables()
  }, [])

  const getTables = async () => {
    fetch('data/table.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setTables(myJson.tables)
      });
  }

  const getContent = () => {
    return (
      <Box sx={{ height: '100vh' }}>
        <Grid container spacing={3}>
          {tables.map(element => {
            return (
              <Grid m={8} sx={{ marginTop: '50px', maxHeight: '207px' }}>
                <CreditCard></CreditCard>
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
        {getContent()}
      </Layout>
    </>
  );
};

export default Home;