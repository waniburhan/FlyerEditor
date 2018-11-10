import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  list: {
    padding: '4px 12px',
    marginBottom: '6px',
    cursor: 'pointer',
    color: 'white',
    listStyle: 'none',
    backgroundColor: '#2f2f2f',
    lineHeight: '35px',
    borderRadius: '3px',
  },
  UList: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
    border: '0',
    font: 'inherit',
    fontSize: '100%',
    verticalAlign: 'baseline',
  },
  colors:{
      height:"28px",
      width:"28px",
      display:"inherit",
      margin:"2%"
    //   backgroundColor:"red"
  }
});

class TextTool extends Component {
  constructor (props) {
    super (props);

    this.state = {};
  }

  render () {
    const {classes} = this.props;
    return (
      <div style={{width: '100%'}}>
        <ul className={classes.UList}>
          <li className={classes.list}>Title</li>
          <li className={classes.list}>Subtitle</li>
          <li className={classes.list}> Subtitle 2</li>
          <li className={classes.list}>Subtitle 3</li>
          <li className={classes.list}>Body text</li>
        </ul>
        <Divider/>
        <ListItem button key={"1"}>
                  <ListItemText primary={"Text Colors"} />
                </ListItem>
                <div style={{display:"inline-block"}}>
                <div className={classes.colors} style={{backgroundColor:"red "}}></div>
                <div className={classes.colors} style={{backgroundColor:"white "}}></div>
                <div className={classes.colors} style={{backgroundColor:"pink "}}></div>
                <div className={classes.colors} style={{backgroundColor:"blue "}}></div>
                <div className={classes.colors} style={{backgroundColor:"orange "}}></div><br/>
                <div className={classes.colors} style={{backgroundColor:"yellow "}}></div>
                <div className={classes.colors} style={{backgroundColor:"green "}}></div>
                <div className={classes.colors} style={{backgroundColor:"brown "}}></div>
                <div className={classes.colors} style={{backgroundColor:"black "}}></div>
                <div className={classes.colors} style={{backgroundColor:"grey "}}></div>
                </div>
                
      </div>
    );
  }
}
TextTool.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles (styles) (TextTool);
