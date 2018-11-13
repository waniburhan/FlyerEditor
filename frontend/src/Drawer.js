import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import html2canvas from 'html2canvas';
const TextTool = React.lazy (() => import ('./ToolSelection/Text'));
const FlyerView = React.lazy (() => import ('./FlyerView'));
const Background = React.lazy (() => import ('./ToolSelection/Background'));

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
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
  template: {
    marginLeft: '24%',
    marginRight: '10%',
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
  iconDrawer: {
    width: theme.spacing.unit * 9 + 1,
  },
  contentDrawer: {
    width: drawerWidth - theme.spacing.unit * 9 + 1,
  },
  customDrawer: {
    flexDirection: 'row',
    width: '300px',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {
  constructor (props) {
    super (props);
  }

  state = {
    open: false,
    ItemList: 'Template',
    imgSrc: '',
  };

  handleDrawerOpen = () => {
    this.setState ({open: true});
  };

  handleDrawerClose = () => {
    this.setState ({open: false});
  };
  showComponent = text => {
    this.setState ({ItemList: text});
  };
  templateChange = src => {

    this.setState ({imgSrc: srcx});
    console.log (this.state,'hellooi');

  };
  componentDidMount () {
    // this.updateCanvas(this.state.imgSrc)
  }

  PrintDiv = div => {
    html2canvas (div, {
      onrendered: function (canvas) {
        var myImage = canvas.toDataURL ();
        this.downloadURI (myImage, 'MaSimulation.png');
      },
    });
    html2canvas (document.querySelector (div)).then (canvas => {
      document.body.appendChild (canvas);
    });
  };

  downloadURI = (uri, name) => {
    var link = document.createElement ('a');

    link.download = name;
    link.href = uri;
    document.body.appendChild (link);
    link.click ();
    //after creating link you should delete dynamic link
    //clearDynamicLink(link);
  };

  updateCanvas = src => {
    console.log (src, 'src');
    if (this.state.imgSrc) {
      const ctx = this.refs.canvas.getContext ('2d');
      var img = <img src={src} />;
      ctx.drawImage (img, 10, 10);
    }
  };
  render () {
    const {classes, theme} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters={!this.state.open}>
            <Typography variant="h6" color="inherit" noWrap />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.customDrawer,
          }}
          open={this.state.open}
        >
          <div className={classes.iconDrawer}>
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl'
                  ? <ChevronRightIcon />
                  : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
                'Template',
                'Starred',
                'Send email',
                'Drafts',
              ].map ((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0
                      ? <InboxIcon onClick={() => this.showComponent (text)} />
                      : <MailIcon onClick={() => this.showComponent (text)} />}
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
            <Divider />
            {/* <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                </ListItem>
              ))}
            </List> */}
          </div>
          <Paper className={classes.contentDrawer} style={{width: '300px'}}>
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl'
                  ? <ChevronRightIcon />
                  : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {this.state.ItemList === 'Template'
                ? <ListItem button key={'Background'}>
                    {/* <ListItemText primary={"background"} /> */}
                    <Suspense fallback={<div>Loading...</div>}>
                      <div id="imgdiv">
                        {' '}<Background templateChange={this.templateChange} />
                      </div>
                    </Suspense>
                    {/* <MailIcon onClick={() => this.PrintDiv("#imgdiv")} /> */}
                  </ListItem>
                : ''}
              {this.state.ItemList === 'Starred'
                ? <ListItem button key={'Text'}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <TextTool templateChange={this.templateChange} />
                    </Suspense>
                    {/* <ListItemText primary={"background"} /> */}
                  </ListItem>
                : ''}
            </List>
            <Divider />
            {/* <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
          </Paper>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid item xs={6} className={classes.template}>
            {this.state.imgSrc
              ? <div>
                  <Suspense fallback={<div>Loading...</div>}>
                    <FlyerView imgSrc={this.state.imgSrc} />
                  </Suspense>
                </div>
              : <Typography
                  component="h2"
                  variant="display2"
                  gutterBottom
                  className={classes.emptyTemp}
                  active={classes.emp}
                >
                  <style>
                    {`
                    #${'xz'}:hover {
                      border: ${'2px solid grey'} !important;
                      padding: ${'10px'} !important;
                    }      
                  `}
                  </style>
                  <div id="xz"> Please Select A Template </div>
                </Typography>}
            {/* <canvas
              ref="canvas"
              width="200"
              height="100"
              style={{ border: "1px solid #d3d3d3" }}
            >
              Your browser does not support the HTML5 canvas tag.
            </canvas> */}
          </Grid>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles (styles, {withTheme: true}) (MiniDrawer);
