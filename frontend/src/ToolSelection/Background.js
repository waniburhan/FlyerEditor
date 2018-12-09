import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import imgData from "../Common/TemplateData";
import { ButtonBase } from "@material-ui/core";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
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


class Background extends React.Component {
  state = {};

  render() {
    const { classes,context} = this.props;
    const contextState = context.state 
    return (
      <div className={classes.root}>
          {
            (contextState.templateList.map((data, index) => 
            <GridList key={index} className={classes.gridList} cols={1} component={ButtonBase}>
              <GridListTile
                key={index}
                onClick={() => context.setActiveTemplate(data)}
              >
                  <img
                    style={{ width: "100%" }}
                    src={contextState.templates[data].background.src}
                    alt={contextState.templates[data].title}
                  />
                  <GridListTileBar
                  title={contextState.templates[data].title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                />
              </GridListTile>
              </GridList>

            ))
          }

      
      </div>
    );
  }
}
Background.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Background);
