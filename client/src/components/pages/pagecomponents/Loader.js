import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position:"relative",
    float:"left",
    marginTop:"0px",


    '& > * + *': {
      marginTop:"-1px"
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <LinearProgress />
    </div>
  );
}