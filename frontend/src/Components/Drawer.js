import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MiniSideBar from './MiniSideBar.js';
import Typography from '@material-ui/core/Typography';
import Header from '../Common/Header';
import Main from './Main.js';
import Aside from './Aside.js';


const FlyerView = React.lazy (() => import ('../FlyerView'));

const drawerWidth = 350;
const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  emptyTemp: {
    margin: '20%',
  },
  emp: {
    color: 'blue',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create (['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
   
  },
  contentDrawer: {
    width: drawerWidth - theme.spacing.unit * 9 + 1,
  },
  customDrawer: {
    flexDirection: 'row',
    width: drawerWidth,
    border: "none"
  },
  toolbar: {
    minHeight:"56px !important",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: `calc(100% - ${drawerWidth}px)`,
    paddingTop: '5.5rem',
  },
  stageParent:{
    width: "100%"
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    ItemList: 'Template',
    imgSrc: ''
  };

  handleDrawerOpen = () => {
    this.setState ({open: true});
  };

  handleDrawerClose = () => {
    this.setState ({open: false});
  };

  templateChange = src => {
    this.setState ({imgSrc: src});
  };
  showComponent = text => {
    this.setState ({ItemList: text});
  };
  render () {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.customDrawer,
          }}
          open={this.state.open}
        >
          <MiniSideBar ItemList={this.state.ItemList} showComponent={this.showComponent} />
          <Aside
            templateChange={this.templateChange}
            ItemList={this.state.ItemList}
          />
        </Drawer>
        <main className={classes.content}>
          {this.state.imgSrc
            ? <Main selectedBackground={this.state.imgSrc} zoom={this.state.zoomDelta}/>
            : ''}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (MiniDrawer);
