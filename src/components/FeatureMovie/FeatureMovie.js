import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import banner from '../../assets/images/banner.jpeg'

import useStyles from './styles';

function FeaturedMovie({ movie }) {
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box component={Link} to={`/movie/${movie.id}`} className={classes.featuredCardContainer}>
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <img src={banner}>
        </img>
        <Box padding="20px">
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>{movie.film_name}</Typography>
            <Typography variant="body2">{movie.description}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedMovie;
