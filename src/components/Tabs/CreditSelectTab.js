import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreditOwnerSelection from '../Forms/CreditOwnerSelection';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';


const GreenBorderTextField = styled(TextField)`
& label.Mui-focused {
  color: #004625;
}
& .MuiOutlinedInput-root {
  &.Mui-focused fieldset {
    border-color: #004625;
  }
}
`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs(props) {
    const [value, setValue] = useState(0);
    const { creditOrder, setCreditOwner } = props;



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
                TabIndicatorProps={{ style: { background: '#004225', borderWidth: "10px" } }}
            >
                <Tab label="Eski Kişi" {...a11yProps(0)} />
                <Tab label="Yeni Kişi" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <CreditOwnerSelection creditOrder={creditOrder} setCreditOwner={setCreditOwner}></CreditOwnerSelection>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GreenBorderTextField
                    onChange={(event) => { setCreditOwner(event.target.value) }}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Müşteri İsmi"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </TabPanel>
        </Box>
    );
}