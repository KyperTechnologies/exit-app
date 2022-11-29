import React from 'react';
import Layout from '../Layout/Layout'
import MenuTableDrinks from '../components/Tables/MenuTableDrinks';
import MenuTableFoods from '../components/Tables/MenuTableFoods';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
        <Box sx={{ p: 3, height: '100vh' }}>
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

const Menu = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Layout>
        <AppBar position="static" style={{ marginTop: '20px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: '#fff', height: '5px' } }}
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{ backgroundColor: '#004225' }}
          >
            <Tab label="İçecekler" {...a11yProps(0)} />
            <Tab label="Yİyecekler" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{ width: '100%' }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <MenuTableDrinks></MenuTableDrinks>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <MenuTableFoods></MenuTableFoods>
          </TabPanel>
        </SwipeableViews>
      </Layout>
    </>
  );
};

export default Menu;