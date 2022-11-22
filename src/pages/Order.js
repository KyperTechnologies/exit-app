import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import OrderCardDrinks from '../components/OrderCardDrinks'
import OrderCardFoods from '../components/OrderCardFoods'
import OrderSummary from '../components/OrderSummary';
import Grid from '@mui/material/Grid';
import { getDrink } from '../Config';
import { getOrderWithTableId } from '../Config';
import { useLocation } from 'react-router-dom';


function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ margin: '60px', gap: '10px 5px', display: 'flex', flexFlow: 'row wrap' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Order = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [drink, setDrinks] = useState([]);
  const [order, setOrder] = useState([]);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    fetchData();
    fetchOrderData();
    // eslint-disable-next-line
  }, [])

  async function fetchData() {
    const drinkData = await getDrink();
    if (drinkData && drinkData.length > 0) {
      setDrinks(drinkData);
    }
  }

  async function fetchOrderData() {
    const orderData = await getOrderWithTableId(location.state.tableId);
    if (orderData && orderData.length > 0) {
      setOrder(orderData);
    }
  }

  const getContent = () => {
    return (
      <Box sx={{ height: '100vh' }}>
        <Grid container spacing={3}>
          {drink.map(element => {
            return (
              <Grid m={8} sx={{ marginTop: '50px', maxHeight: '207px' }} key={element.id}>
                <OrderCardDrinks key={element.id} drink={element} fetch={fetchData} fetchOrder={fetchOrderData}></OrderCardDrinks>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }

  return (
    <>
      <Box style={{ display: 'flex' }}>
        <Box style={{ marginTop: '45px' }}>
          <OrderSummary fetchOrder={fetchOrderData} order={order}>
          </OrderSummary>
        </Box>
        <AppBar>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="İçecekler" {...a11yProps(0)} />
            <Tab label="Yİyecekler" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {getContent()}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <OrderCardFoods></OrderCardFoods>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};

export default Order;