import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Editable from '../components/EditableInline'
import { TextField } from '@mui/material';



export default function ImgMediaCard() {

  const [task, setTask] = useState("");

  return (
    <Card sx={{ maxWidth: 345,
                margin:'40px',
                backgroundColor: 'rgb(18, 18, 18)',
                borderRadius:'4px',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
                color:'rgb(255,255,255)',
    }}>
      <CardContent>
        <Editable
        text={task}
        placeholder="Masa Adı Giriniz :"
        type="input"
        >
        <TextField
        sx={{input:{color:'white'}}}
                  id="standard-basic" 
                  label="Masa Adı :"
                  variant="standard"
                  color='info'
                  type="text"
                  name="task"
                  value={task}
                  onChange={e => setTask(e.target.value)}>
        </TextField>
        </Editable>
      </CardContent>
      <CardActions>
        <Button size="small">EKLE</Button>
        <Button size="small">HESAP</Button>
      </CardActions>
    </Card>
  );
}