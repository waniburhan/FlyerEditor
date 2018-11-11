import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Templates from '@material-ui/icons/Texture';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextFormat from '@material-ui/icons/TextFields';

const styles = theme => ({
    iconDrawer: {
        width: theme.spacing.unit * 9 + 1,
      },
      toolbar: {    
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      listItem:{
          flexDirection:"column"
      },
      icon:{
          margin: 0,
      }
})

class MiniSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.iconDrawer}>
            <div className={classes.toolbar}></div>
              <List>
                  <ListItem button className={classes.listItem}>
                    <ListItemIcon className={classes.icon}>
                     <Templates onClick={() => this.props.showComponent("Template")} />
                    </ListItemIcon>
                    <ListItemText primary="Template" />
                  </ListItem>
                  <ListItem button className={classes.listItem}>
                    <ListItemIcon className={classes.icon}>
                    <TextFormat onClick={() => this.props.showComponent("Format")} />
                    </ListItemIcon>
                    <ListItemText primary="Format"/>
                  </ListItem>
                  
              </List>
            </div>
        );
    }
}

export default withStyles(styles)(MiniSideBar);