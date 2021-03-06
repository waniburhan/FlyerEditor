import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Templates from '@material-ui/icons/Texture';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextFormat from '@material-ui/icons/TextFields';
import FormatShapes from '@material-ui/icons/FormatShapes';

const styles = theme => ({
    iconDrawer: {
        width: theme.spacing.unit * 9 + 1,
        position: "fixed",
        height:"100%"
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
      listItemSelected:{
        backgroundColor:"rgba(0,0,0,0.12) !important",
        flexDirection:"column"
      },
      icon:{
          margin: 0,
      },
      list:{
      padding: 0,
      },
      text:{
        marginTop: 5
      }
})

class MiniSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props.ItemList,"xyz")
        const {classes} = this.props;
        return (
            <div className={classes.iconDrawer}>
            <div className={classes.toolbar}></div>
              <List className={classes.list}>
                  <ListItem button className={this.props.ItemList === "Template"?classes.listItemSelected:classes.listItem} onClick={() => this.props.showComponent("Template")}>
                    <ListItemIcon className={classes.icon}>
                     <Templates  />
                    </ListItemIcon>
                    <ListItemText primary="Template" className={classes.text}/>
                  </ListItem>
                  <ListItem button className={this.props.ItemList === "Format"?classes.listItemSelected:classes.listItem} onClick={() => this.props.showComponent("Format")}>
                    <ListItemIcon className={classes.icon} >
                    <TextFormat  />
                    </ListItemIcon>
                    <ListItemText primary="Format" className={classes.text}/>
                  </ListItem>
                  <ListItem button className={this.props.ItemList === "Shapes"?classes.listItemSelected:classes.listItem} onClick={() => this.props.showComponent("Shapes")}>
                    <ListItemIcon className={classes.icon} >
                    <FormatShapes  />
                    </ListItemIcon>
                    <ListItemText primary="Shapes" className={classes.text}/>
                  </ListItem>
                  
              </List>
            </div>
        );
    }
}

export default withStyles(styles)(MiniSideBar);