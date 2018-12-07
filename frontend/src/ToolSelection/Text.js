import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {MyContext} from '../Store/Provider';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
const styles = theme => ({
  colors: {
    display: "inline-block",
    height: '28px',
    width: '28px',
    margin: '2%',
    //   backgroundColor:"red"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 90
  },
  fullWidth:{
    width:"100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: 90,
  },
});

class TextTool extends Component {
  constructor (props) {
    super (props);
    this.textInput = React.createRef ();

    this.state = {
      age: ''
    };
  }
  selectedColor = () => {
    // this.textInput
    console.log ('][][][]');
  };
  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  render () {
    const {classes} = this.props;
    return (
      <MyContext.Consumer>
        {context => {
         let activeTextbox = context.state.activeLayer
         console.log(context)
         return <div style={{width: '100%'}}>
         {activeTextbox?<React.Fragment>
            <ListItem button key={'1'}>
              <ListItemText primary={'Text Colors'} />
            </ListItem>
            <Divider />
            <div>
              <div
                onClick={() => context.Color ('white')}
                className={classes.colors}
                style={{backgroundColor: 'white '}}
              />
              <div
                onClick={() => context.Color ('pink')}
                className={classes.colors}
                style={{backgroundColor: 'pink '}}
              />

              <div
                onClick={() => context.Color ('blue')}
                className={classes.colors}
                style={{backgroundColor: 'blue '}}
              />

              <div
                onClick={() => context.Color ('orange')}
                className={classes.colors}
                style={{backgroundColor: 'orange '}}
              />

              <br />

              <div
                onClick={() => context.Color ('yellow')}
                className={classes.colors}
                style={{backgroundColor: 'yellow '}}
              />

              <div
                onClick={() => context.Color ('green')}
                className={classes.colors}
                style={{backgroundColor: 'green '}}
              />

              <div
                onClick={() => context.Color ('brown')}
                className={classes.colors}
                style={{backgroundColor: 'brown '}}
              />

              {' '}
              <div
                onClick={() => context.Color ('black')}
                className={classes.colors}
                style={{backgroundColor: 'black '}}
              />

              {' '}
              <div
                onClick={() => context.Color ('grey')}
                className={classes.colors}
                style={{backgroundColor: 'grey '}}
              />
               {' '}
              <div
                onClick={() => context.Color ('#18637a')}
                className={classes.colors}
                style={{backgroundColor: '#18637a '}}
              />

            </div>

          <Grid container ><TextField
          label="X"
          id="XText"
          type="number"
          name="XText"
          onChange = {context.onTextXChange}
          value = {context.state.textObject[activeTextbox].x}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="start">Px</InputAdornment>,
          }}
        />
        <TextField
          label="Y"
          id="YText"
          name="YText"
          type="number"
          onChange = {context.onTextYChange}
          value = {context.state.textObject[activeTextbox].y}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="start">Px</InputAdornment>,
          }}
        />
        </Grid>

          <Grid container ><TextField
          label="Width"
          id="widthText"
          type="number"
          name="widthText"
          onChange = {context.onTextWidthChange}
          value = {context.state.textObject[activeTextbox].width}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="start">Px</InputAdornment>,
          }}
        />
        <TextField
          label="Height"
          id="heightText"
          name="heightText"
          type="number"
          onChange = {context.onTextHeightChange}
          value = {context.state.textObject[activeTextbox].height}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="start">Px</InputAdornment>,
          }}
        />
        </Grid>
        <Grid container >
          <TextField
          label="Font Size"
          id="fontSize"
          type="number"
          name="fontSize"
          onChange = {context.onTextSizeChange}
          value = {context.state.textObject[activeTextbox].fontSize}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="start">Px</InputAdornment>,
          }}
        />
        <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="align-label-placeholder">
            Align
          </InputLabel>
          <Select
            value={context.state.textObject[activeTextbox].align}
            onChange={context.onTextAligmnentChange}            
            input={<Input name="align" id="align-label-placeholder" />}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Align
            </MenuItem>
            <MenuItem value={"left"}>Left</MenuItem>
            <MenuItem value={"center"}>Center</MenuItem>
            <MenuItem value={"right"}>Right</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <FormControl className={classes.formControl+" "+classes.fullWidth}>
        <InputLabel shrink htmlFor="family-label-placeholder">
            Font Family
          </InputLabel>
          <Select
            value={context.state.textObject[activeTextbox].fontFamily}
            onChange={context.onTextVariantChange}            
            input={<Input name="fontFamily" id="family-label-placeholder" />}
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Family
            </MenuItem>
            <MenuItem value={"arial"}>Arial</MenuItem>
            <MenuItem value={"roboto"}>Roboto</MenuItem>
            <MenuItem value={"Helvetica Neue"}>Helvetica Neue</MenuItem>
            <MenuItem value={"sans-serif"}>Sans-serif</MenuItem>
            
          </Select>
        </FormControl>
        </React.Fragment>:<Typography variant="subtitle1">Please select the text box</Typography>}
          </div>
        }}
      </MyContext.Consumer>
    );
  }
}
TextTool.contextType = MyContext;

TextTool.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles (styles) (TextTool);
