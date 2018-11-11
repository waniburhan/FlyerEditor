import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: "none",
    //   transition: theme.transitions.create (['width', 'margin'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    //   }),
    },
  });
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {classes} = this.props
        return (
            <AppBar position="fixed" className={classes.appBar} color="background">
          <Toolbar disableGutters={!this.state.open}>
          </Toolbar>
        </AppBar>
        );
    }
}

export default withStyles(styles)(Header);