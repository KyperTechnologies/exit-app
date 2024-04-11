import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OrderCardDrinks from "../components/cards/OrderCardDrinks";
import OrderCardFoods from "../components/cards/OrderCardFoods";
import OrderSummary from "../components/cards/OrderSummary";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import { getOrdersWithTableId, getProducts } from "../NewConfig";

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
        <Box
          style={{
            margin: "60px",
            gap: "10px 5px",
            display: "flex",
            flexFlow: "row wrap",
          }}
        >
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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Order = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);
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
  }, []);

  async function fetchData() {
    const drinkData = await getProducts("drink");
    const foodData = await getProducts("food");

    if (drinkData && drinkData.length > 0) {
      setDrinks(drinkData);
    }
    if (foodData && foodData.length > 0) {
      setFoods(foodData);
    }
  }

  async function fetchOrderData() {
    const orderData = await getOrdersWithTableId(location.state.tableId);
    setOrder(orderData);
  }

  const getDrinkContent = () => {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <Grid container={true} spacing={3} justifyContent="space-evenly">
          {drinks
            .filter((element) => element.type === "drink")
            .map((element) => {
              return (
                <Grid item xl={3} lg={4} md={6} sm={12} key={element.id}>
                  <OrderCardDrinks
                    key={element.id}
                    drink={element}
                    fetch={fetchData}
                    fetchOrder={fetchOrderData}
                    existingOrder={order}
                  ></OrderCardDrinks>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    );
  };

  const getFoodContent = () => {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <Grid container={true} spacing={3} justifyContent="space-evenly">
          {foods
            .filter((element) => element.type === "food")
            .map((element) => {
              return (
                <Grid
                  item
                  xl={3}
                  lg={4}
                  md={5}
                  sm={12}
                  xs={12}
                  key={element.id}
                >
                  <OrderCardFoods
                    key={element.id}
                    food={element}
                    fetch={fetchData}
                    fetchOrder={fetchOrderData}
                    existingOrder={order}
                  ></OrderCardFoods>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <Grid container={true} justifyContent="space-evenly">
        <Grid item xl={4} lg={5} md={6} sm={7} xs={7}>
          <Grid marginTop="50px">
            <OrderSummary
              fetchOrder={fetchOrderData}
              order={order}
            ></OrderSummary>
          </Grid>
        </Grid>
        <Grid item xl={8} lg={7} md={6} sm={5} xs={5}>
          <Grid container={true} justifyContent="space-evenly">
            <AppBar>
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { background: "#fff", height: "5px" },
                }}
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                sx={{ backgroundColor: "#004225" }}
              >
                <Tab label="İçecekler" {...a11yProps(0)} />
                <Tab label="Yiyecekler" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                {getDrinkContent()}
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {getFoodContent()}
              </TabPanel>
            </SwipeableViews>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Order;
