import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import imgData from "../Common/TemplateData";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});


class Background extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          {
            (imgData.map((data, index) => 
            <GridList key={index} className={classes.gridList} cols={2.5}>

              <GridListTile
                key={index}
                style={{ width: "100%", marginTop: "7%" }}
              >
                <IconButton onClick={() => this.props.templateChange(data.src)}>
                  <img
                    style={{ width: "100%" }}
                    src={data.src}
                    alt={data.title}
                  />
                </IconButton>
                <GridListTileBar
                  title={data.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                />
              </GridListTile>
              </GridList>

            ))
          }{" "}

      
      </div>
    );
  }
}
Background.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Background);
