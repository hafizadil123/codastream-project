import React, { useState, useEffect } from 'react';
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
  useEffect(() => {
    async function fetch() {
      const data1 = await getContentfulData('category');
      const filterData = data1 && data1.filter(item => item.fields.name === parsed.type);
      const [first] = filterData || [];
      if(first && first.fields.songs) {
        setData(first.fields.songs);
      }

    }
    fetch();
  }, [parsed.type]);

  return (
    <>
      <div className={classes.wrapper}>

        {data && data.length > 0 && data.map(item => (
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

        ))}

      </div>
    </>
  );
}
