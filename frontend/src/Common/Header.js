import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import GetApp from '@material-ui/icons/GetApp';
import Export from '@material-ui/icons/OpenInBrowser';
import {MyContext} from '../Store/Provider';
import Logo from '../Templates/logo.png'

const styles = theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: "none",
      padding: "0 0.5rem"
    //   transition: theme.transitions.create (['width', 'margin'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    //   }),
    },
    button:{
        marginLeft: "auto"
    },
    logo:{
        height: 36,
        marginLeft: 12
    }
  });
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            uri:""
         };
    }
    handleExport=()=>{
        let uri = document.getElementsByTagName('canvas')[0].toDataURL('image/png')
        this.setState({uri: uri})
        }
    render() {
        const {classes} = this.props
        return (<MyContext.Consumer>
            {(context)=>{
            return (<AppBar position="fixed" className={classes.appBar} color="background">
          <Toolbar disableGutters={!this.state.open}>
          <img className={classes.logo} src={Logo} />
          {this.state.uri?<Button size="small" variant="contained" color="primary" className={classes.button} component="a" href={this.state.uri} download="my-file-name.png"><GetApp/>&nbsp;Download</Button>:
          <Button size="small" variant="contained"  color="primary" className={classes.button} onClick={this.handleExport}><Export/>&nbsp; Make Exportable</Button>}
          </Toolbar>
        </AppBar>)}}
        </MyContext.Consumer>
        );
    }
}

export default withStyles(styles)(Header);