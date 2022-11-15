import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {addDrink,getDrink} from '../Config';


function createData(id, name, price, icon) {
  return {
    name,
    price,
    icon,
    id,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' },
      backgroundColor:'rgb(18, 18, 18)'}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color='primary'
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{color:'rgb(255,255,255)'}}>
          {row.icon}
        </TableCell>
        <TableCell sx={{color:'rgb(255,255,255)'}}>{row.name}</TableCell>
        <TableCell sx={{color:'rgb(255,255,255)'}}>{row.price}</TableCell>
      </TableRow>
      <TableRow sx={{backgroundColor:'rgb(18, 18, 18)'}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, textAlign: 'right' }}>
              <Button >Güncelle</Button>
              <Button >Sİl</Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(id, name, price, 'icon'),
];



export default function CollapsibleTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id,Setid] = useState(1);
  const [name, Setname] = useState('');
  const[price,Setprice] = useState('');
  
  


  const onAddClick = () => {
    Setid(id+1);
    addDrink(id, {
      "id" : id,
      "name": name,
      "price":price,
    });
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{backgroundColor:'rgb(18, 18, 18)'}}>
              <TableCell />
              <TableCell sx={{fontSize:'90%',fontWeight:'bold',color:'rgb(40,100,150)'}}>Icon</TableCell>
              <TableCell sx={{fontSize:'90%',fontWeight:'bold',color:'rgb(40,100,150)'}}>Ürün İsmi</TableCell>
              <TableCell sx={{fontSize:'90%',fontWeight:'bold',color:'rgb(40,100,150)'}}>Fiyat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={handleOpen}/>
        </Fab>
      </div>
      <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ürün Ekle</DialogTitle>
        <DialogContent onSubmit={addDrink}>
          <TextField
           onChange={(e)=>{Setname(e.target.value)}}
            autoFocus
            margin="dense"
            id="name"
            label="Ürün İsmi"
            type="name"
            fullWidth
            variant="standard"
          />
               <TextField
            onChange={(e)=>{Setprice(e.target.value)}}
            autoFocus
            margin="dense"
            id="name"
            label="Fiyat"
            type="price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Vazgeç</Button>
          <Button type ='submit' onClick={onAddClick} >Ekle</Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
}
