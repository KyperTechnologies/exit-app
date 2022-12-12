import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout'
import CreditCard from '../components/Cards/CreditCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getCredit } from '../Config';

const Credit = () => {

  const [credit, setCredit] = useState([]);

  useEffect(() => {
    fetchData();
  },)

  async function fetchData() {
    const creditOwnerData = await getCredit();
    if (creditOwnerData && creditOwnerData.length > 0) {
      setCredit(creditOwnerData);
    }
  }

  const getContent = () => {
    return (
      <Box sx={{ height: '100vh' }}>
        <Grid item xs={12} lg={12}>
          <Grid item xs={12} container spacing={2} justifyContent='space-evenly'>
            {credit.map(element => {
              return (
                <Grid m={8}>
                  <CreditCard key={credit.id} credit={element} totalPrice={element.totalPrice} fetch={fetchData} setCredit={setCredit}></CreditCard>
                </Grid>
              );
            })}
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

export default Credit;