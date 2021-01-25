import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CircularProgressWithLabel } from '@/_components/CircularProgressWithLabel';
import { Link } from 'react-router-dom';
import { accountService, projectService } from '@/_services';
import { Role } from '@/_helpers';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
    //height: '100%'
  },
  cardRoot: {
    display: 'flex',
    margin: theme.spacing(2)
  },
  gridList: {
    width: '100%',
    height: 'auto'
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
  },
  empty: {
    width: '100%',
    height: '200px',
    margin: 'auto'
  }
}));

function List(props) {
  const { path } = props.match;
  const classes = useStyles();
  const user = accountService.userValue;
  const [projects, setProjects] = useState([]);

  function deleteProject(id) {
    setProjects(
      projects.map(x => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    projectService.delete(id).then(() => {
      setProjects(projects => projects.filter(x => x.id !== id));
    });
  }

  useEffect(() => {
    if (user.role === Role.Admin) {
      projectService.getAll().then(x => setProjects(x));
    } else if (user.role === Role.Manager) {
      projectService.getAllByManagerId(user.id).then(x => setProjects(x));
    }
  }, []);

  if (!projects || projects.length === 0)
    return (
      <div className={classes.empty}>
        <div>No Projects to display</div>
      </div>
    );
  else {
    return (
      <div className={classes.root}>
        {user.role !== Role.User && (
          <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
            Add Project
          </Link>
        )}
        {user.role === Role.User && (
          <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
            Add Project
          </Link>
        )}
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
                    {proj.manager && (
                      <Typography variant="subtitle1" color="textSecondary">
                        Manager: {proj.manager.firstName + ' ' + proj.manager.lastName}
                      </Typography>
                    )}
                    <Typography variant="body1">{proj.description}</Typography>
                    <Typography variant="subtitle2">{'Start date :' + proj.startDate}</Typography>
                    <Typography variant="subtitle2">{'Expected end date :' + proj.expectedEndDate}</Typography>
                  </CardContent>
                  <div className={classes.controls}>
                    <Link to={`${path}/edit/${proj.id}`} className="btn btn-sm mr-1">
                      <VisibilityIcon />
                    </Link>
                    <button onClick={() => deleteProject(proj.id)} className="btn btn-sm " disabled={user.isDeleting}>
                      {user.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <DeleteForeverIcon />
                      )}
                    </button>
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
}

export { List };
