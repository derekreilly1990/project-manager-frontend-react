import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { CircularProgressWithLabel } from '@/_components/CircularProgressWithLabel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  cardRoot: {
    display: 'flex'
  },
  gridList: {
    width: '100%',
    height: 480
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 160,
    height: 160,
    margin: 'auto'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

function List(props) {
  const classes = useStyles();
  const theme = useTheme();
  console.log('props', props);

  const [projects, setProjects] = useState([
    {
      id: 'njcisavnjkvbasv',
      title: 'example project 1',
      description: 'this is a description of the project',
      progress: 20,
      startDate: '10012020',
      expectedEndDate: '10122020',
      actualEndDate: undefined,
      manager: 'Made up company name',
      mainImageUrl: 'https://via.placeholder.com/100x160'
    },
    {
      id: 'gehbrwhttwvbasv',
      title: 'example project 2',
      description: 'this is a description of the project',
      progress: 82,
      startDate: '10012020',
      expectedEndDate: '10122020',
      actualEndDate: undefined,
      manager: 'Made up company name 2',
      mainImageUrl: 'https://via.placeholder.com/100x160'
    },
    {
      id: 'njhjilgymjuyysv',
      title: 'example project 3',
      description: 'this is a description of the project',
      progress: 43,
      startDate: '10012020',
      expectedEndDate: '10122020',
      actualEndDate: 14122020,
      manager: 'Made up company name',
      mainImageUrl: 'https://via.placeholder.com/100x160'
    }
  ]);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1} cellHeight={'auto'}>
        {projects.map(proj => {
          return (
            <Card className={classes.cardRoot} key={proj.id}>
              <CardMedia className={classes.cover} image={proj.mainImageUrl} title={proj.title} />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {proj.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {proj.manager}
                  </Typography>
                  <Typography variant="body1">{proj.description}</Typography>
                  <Typography variant="subtitle2">{proj.startDate + ' - ' + proj.expectedEndDate}</Typography>
                </CardContent>
                <div className={classes.controls}>
                  <IconButton aria-label="show">
                    <VisibilityIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.cover}>
                <CircularProgressWithLabel value={proj.progress} size={120} />
              </div>
            </Card>
          );
        })}
      </GridList>
    </div>
  );
}

export { List };
