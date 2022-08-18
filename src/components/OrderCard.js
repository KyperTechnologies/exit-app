import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Editable from '../components/EditableInline'
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function ActionAreaCard() {

    const [task, setTask] = useState("");

  return (
    <Card sx={{ maxWidth: 245,    
        backgroundColor: 'rgb(18, 18, 18)',
        borderRadius:'4px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
        color:'rgb(255,255,255)', }}>
        <CardContent>
          <Typography variant='h5'>Ürün İsmi</Typography>

        </CardContent>
        <CardActions style={{display:'flex',justifyContent:'space-evenly'}}>
          <Button variant="contained" color="success">
          ☑
          </Button>
          <Editable style={{fontSize:'15px'}}
                    text={task}
                    placeholder="ADET :"
                    type="input"
        >
          <TextField
          sx={{input:{color:'white'}}}
                    id="filled-basic" 
                    label="ADET :"
                    variant="filled"
                    color='info'
                    type="text"
                    name="task"
                    value={task}
                    onChange={e => setTask(e.target.value)}>
          </TextField>
        </Editable>
          <Button variant="outlined" color="error" >
            -
          </Button>
        </CardActions>
    </Card>
  );
}
