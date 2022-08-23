import React, { useState, useEffect} from 'react';
import Layout from '../layout/Layout'
import TableCard  from '../components/TableCard';
import Grid from '@mui/material/Grid';

const Home = () => {
  const [tables, setTables] = useState([]);

  useEffect(()=>{
    getTables()
  },[])
  
  const getTables = async () => {
    fetch('data/table.json',
    {
      headers : { 
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
      <Grid container spacing={3}>
        {tables.map(element => {
          return (
            <Grid xs={4} marginTop='20px' maxHeight='207px'>'
              <TableCard></TableCard>
            </Grid>
          );
        })}
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