import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout'
import CreditCard from '../components/Cards/CreditCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getCreditOwner } from '../Config';

const Home = () => {
  const [creditOwner, setCreditOwner] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const creditOwnerData = await getCreditOwner();
    if (creditOwnerData && creditOwnerData.length > 0) {
      setCreditOwner(creditOwnerData);
    }
  }

  const getContent = () => {
    return (
      <Box sx={{ height: '100vh' }}>
        <Grid container spacing={3}>
          {creditOwner.map((owner) => {
            return (
              <Grid m={8} sx={{ marginTop: '50px', maxHeight: '207px' }}>
                <CreditCard key={owner.id} creditOwnerName={owner.name}></CreditCard>
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