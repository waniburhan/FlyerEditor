import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import imgData from "../Common/TemplateData";
import { ButtonBase } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {MyContext} from '../Store/Provider';

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection:"column",
    justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor:"rgba(0,0,0,0.12)"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    paddingBottom:"1rem",
    width: "100%"

  },
  title: {
    color: theme.palette.primary.textContrast
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});


class Shapes extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
        <MyContext.Consumer>
        {context => {
            return(
      <div className={classes.root}>
         <Button variant="outlined"  className={classes.button} onClick={()=>context.onShapeChange("showRect")} >
        Rectangle
      </Button>
      <Button variant="outlined"  className={classes.button} onClick={()=>context.onShapeChange("showCircle")} >
        Circle
      </Button>
      <Button variant="outlined" className={classes.button} onClick={()=>context.onShapeChange("showLine")} >
        Line
      </Button>

      
      </div>
            )}}
        </MyContext.Consumer>
    );
  }
}
Shapes.contextType = MyContext;
Shapes.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Shapes);
