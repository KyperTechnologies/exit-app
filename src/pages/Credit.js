import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout'
import CreditCard from '../components/Cards/CreditCard';
import Grid from '@mui/material/Grid';
import { getCredit } from '../Config';

const Credit = () => {

  const [credit, setCredit] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const creditOwnerData = await getCredit();
    if (creditOwnerData && creditOwnerData.length > 0) {
      setCredit(creditOwnerData);
    }
  }

  const getContent = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xl={12}>
          <Grid container={true} spacing={2} justifyContent='space-evenly'>
            {credit.map(element => {
              return (
                <Grid xl={3}>
                  <CreditCard key={credit.id} credit={element} totalPrice={element.totalPrice} fetch={fetchData} setCredit={setCredit}></CreditCard>
                </Grid>
              );
            })}
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

export default Credit;