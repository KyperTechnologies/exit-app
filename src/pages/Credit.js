import React from 'react';
import Layout from '../Layout/Layout'
import CreditCard from '../components/Cards/CreditCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Home = () => {


  const getContent = () => {
    return (
      <Box sx={{ height: '100vh' }}>
        <Grid container spacing={3}>
          <Grid m={8} sx={{ marginTop: '50px', maxHeight: '207px' }}>
            <CreditCard></CreditCard>
          </Grid>
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