import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import CheckoutCard from '../components/Cards/CheckoutCard';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    backgroundColor: '#004225',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

export default function LayoutWithoutToolbar({ item }) {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Box>
                    <Typography variant="h2" noWrap component="div" style={{ fontFamily: 'Arial Black', color: "#E9E0D2" }}>
                        EXIT
                    </Typography>
                </Box>
            </AppBar>
            <CheckoutCard></CheckoutCard>
        </Box>
    );
}