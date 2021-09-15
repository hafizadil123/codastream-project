import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogText: {
    color: 'red'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DialogContentTexts = withStyles((theme) => ({
  root: {
    color: 'red'
  }
}))(MuiDialogActions)

export default function CustomizedDialogs({show, title, text, type, onCloseHandle, data = [], history}) {
  const [songName, setSongName] = useState('');
  const [customName, setCustomName] = useState('');
  const [isError, setError] = useState(null);
  const profile = JSON.parse(localStorage.getItem('profile'));
  console.log('profile', data);
  const handleClose = () => {
    const apiUrl = 'http://localhost:5000/api';
    const filterData = data?.filter(item => item.name === songName);
    const reqObject = {
      songName,
      customName,
      userId: profile.sub,
      email: profile.email,
      albumName: filterData[0]?.albumName || '',
      duration: filterData[0]?.duration || '',
      imageUrl: filterData[0]?.image.fields.file.url || '',
      rating: filterData[0]?.rating || '',
      singerName: filterData[0]?.singerName || '',
      lyrics: documentToPlainTextString(filterData[0].lyrics) || ''
    };
    axios.post(`${apiUrl}/users/create-playlist`, reqObject).then((res) => {
      const { success } = res.data || {};
      if(success) {
        setError(false);
        onCloseHandle(false);
        history.push('/dashboard/your-library');
      }
      setError(true)

    }).catch = (err) => {
      setError(true)
    }

  };
  
  const handleCloseCancel = () => {
    setError(null)
    onCloseHandle(false);
  }

  const handleChange = (event) => {
    setSongName(event.target.value);
  }
  const handleChangeName = (event) => {
    setCustomName(event.target.value);
  }
  const handleCloseDialog = () => {
    onCloseHandle(false);
  }
  const getErrorMessage = () => {
    if(isError) {
      return 'something wents wrong';
    } else if(isError == null) {
      return 'To add your wish song, please select from the options'
    }
    else {
      return 'song has been added in your library'
    }
  }
  
  return (
    type === 'text' ? <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={show}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
         {title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           {text}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog} color="primary">
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </div> : 
     <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add song in your Playlist</DialogTitle>
        <DialogContent>
         <DialogContentText>
            {getErrorMessage()}
          </DialogContentText> 
           <FormControl>

           <TextField
            autoFocus
            margin="dense"
            onChange={handleChangeName}
            id="name"
            label="Custom Name"
            type="playlist_name"
            fullWidth
          />

        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={songName}
          onChange={handleChange}
          displayEmpty
          className={''}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data && data?.map(item =>  <MenuItem value={item.name}>{item.name || ''}</MenuItem>)}

        </Select>
        <FormHelperText>Add song in your library</FormHelperText>
      </FormControl>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
}