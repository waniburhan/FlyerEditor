import React, {Component,Suspense} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Shapes from '../ToolSelection/Shapes'
import {MyContext} from '../Store/Provider';
const TextTool = React.lazy (() => import ('../ToolSelection/Text'));
// const FlyerView = React.lazy (() => import ('../FlyerView'));
const Background = React.lazy (() => import ('../ToolSelection/Background'));

const styles = theme => ({
  contentDrawer: {
    width: "calc(100% - 73px)",
    marginLeft: theme.spacing.unit * 9 + 1,
  },
  container:{
    backgroundColor:"rgba(0,0,0,0.12)",
    padding: "1rem 2rem",
    minHeight:"100%"
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
        const {classes,context} = this.props
        
        return (<Paper className={classes.contentDrawer} elevation={0}>
             <div className={classes.container}>
            <div className={classes.toolbar}></div>
  
                {this.props.ItemList === 'Template'
                  &&  <Suspense fallback={<div>Loading...</div>}>
                        <Background templateChange={this.props.templateChange} context={context}/>
                      </Suspense>
                  }
                {this.props.ItemList === 'Format'
                  &&  <Suspense fallback={<div>Loading...</div>}>
                        <TextTool templateChange={this.props.templateChange} context={context}/>
                      </Suspense>}
                      {this.props.ItemList === 'Shapes'
                  &&  
                        <Shapes templateChange={this.props.templateChange} />
                     }
            </div> 
            </Paper>
        );
    }
}

export default withStyles(styles)(Aside);