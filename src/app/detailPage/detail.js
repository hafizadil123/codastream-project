import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import RegisterImage from '../../assets/images/auth/login-bg.jpg';
import { getContentfulData } from '../../utils/index';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import Grid from '@material-ui/core/Grid';
import ModalContext from "../shared/context";

const queryString = require('query-string');

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

export default function DetailPage() {
  const [data, setData] = useState(null);
  const classes = useStyles();
  const parsed = queryString.parse(window.location.search);
  const context = useContext(ModalContext);
  console.log('calleeee', context);
  const callApi = async () => {
    const data1 = await getContentfulData('category');
    const filterData = data1 && data1.filter(item => item.fields.name === parsed.type);
    const [first] = filterData || [];
    return first;
  }
  useEffect(() => {
    async function fetch() {
      const first = await callApi();
      if(first && first.fields.songs) {
        localStorage.setItem('songs', JSON.stringify(first.fields.songs));
        setData(first.fields.songs);
      }
    }
    fetch();
  }, [parsed.type]);




  useEffect(() => {
    if(context.search){
      const filterData = data && data?.filter(item => item.fields.name.toLowerCase().includes(context.search.toLowerCase()));
      if(filterData) {
        setData(filterData);
      } 
    } else {
      const orignalData = JSON.parse(localStorage.getItem('songs'))
      setData(orignalData)
    }
   
  
  }, [context.search])

  return (
    <>
      <div className={classes.wrapper}>
      {data && data.length === 0 && <Typography variant="h6" component="h6">
  No data found!
</Typography> }

      <Grid container spacing={3}>
        {data && data.length > 0 && data.map(item => (
          <Grid xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={item.fields.image.fields.file.url || RegisterImage}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.fields.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                 {documentToPlainTextString(item.fields.lyrics)}
                </Typography>
                <br />
               
                <Typography variant="body2" color="textSecondary" component="p">
                <strong>Duration: </strong> {item.fields.duration}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <strong>Album Name: </strong> {item.fields.albumName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <strong>By :</strong> {item.fields.singerName}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            <Rating
          name="read-only"
          value={+(item.fields.rating)}
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
