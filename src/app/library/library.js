import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RegisterImage from '../../assets/images/auth/register-bg.jpg';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import Grid from '@material-ui/core/Grid';
import ModalContext from "../shared/context";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'start',
    flexWrap: 'wrap',
  },
  media: {
    height: 140,
  },
});

export default function Library() {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const context = useContext(ModalContext);
  const apiUrl = 'http://localhost:5000/api'

  const profile = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    axios.get(`${apiUrl}/users/get-library?userId=${profile.sub}&email=${profile.email}`).then(res => {
      const { success, library } = res.data || {};
      console.log('dataaaaa', success, library);
      localStorage.setItem('library', JSON.stringify(library));
      setData(library);
    });
  },[profile.email, profile.sub]);

  useEffect(() => {
    if(context.search){
      const filterData = data && data?.filter(item => item.name?.toLowerCase().includes(context.search.toLowerCase()));
      if(filterData) {
        setData(filterData);
      } 
    } else {
      const orignalData = JSON.parse(localStorage.getItem('library'))
      setData(orignalData)
    }
   
  
  }, [context.search, data])

  return (
      <>
<div className={classes.wrapper}>
{data && data.length === 0 && <Typography variant="h6" component="h6">
  No data found!
</Typography> }
  <Grid container spacing={3}>
  
  {data && data.length > 0 && data.map(item => (
<Grid item xs={4}>
<Card className={classes.root}>
  <CardActionArea>
    <CardMedia
      className={classes.media}
      image={item.imageUrl || RegisterImage}
      title="Contemplative Reptile"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {item.name}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
       {documentToPlainTextString(item.lyrics)}
      </Typography>
      <br />
     
      <Typography variant="body2" color="textSecondary" component="p">
      <strong>Duration: </strong> {item.duration}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
      <strong>Album Name: </strong> {item.albumName}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
      <strong>By :</strong> {item.singerName}
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
  <Rating
name="read-only"
value={+(item.rating)}
precision={0.5}
read-only
/>
  </CardActions>
</Card>
</Grid>
))}
  
  
</Grid>


</div>
    </>
  );
}
