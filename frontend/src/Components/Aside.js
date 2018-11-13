import React, {Component,Suspense} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const TextTool = React.lazy (() => import ('../ToolSelection/Text'));
// const FlyerView = React.lazy (() => import ('../FlyerView'));
const Background = React.lazy (() => import ('../ToolSelection/Background'));

const styles = theme => ({
  contentDrawer: {
    width: "100%",
    marginLeft: theme.spacing.unit * 9 + 1,
    backgroundColor:"rgba(0,0,0,0.12)"
  },

  toolbar: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class Aside  extends Component {
    render() {
        const {classes} = this.props
        return (
            <Paper className={classes.contentDrawer} elevation={false}>
            <div className={classes.toolbar}></div>
  
                {this.props.ItemList === 'Template'
                  &&  <Suspense fallback={<div>Loading...</div>}>
                        <Background templateChange={this.props.templateChange} />
                      </Suspense>
                  }
                {this.props.ItemList === 'Format'
                  &&  <Suspense fallback={<div>Loading...</div>}>
                        <TextTool templateChange={this.props.templateChange} />
                      </Suspense>}
  
            </Paper>
        );
    }
}

export default withStyles(styles)(Aside);