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
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import {SketchPicker} from 'react-color';
import Bold from '@material-ui/icons/FormatBold';
import Italic from '@material-ui/icons/FormatItalic';
import Underline from '@material-ui/icons/FormatUnderlined';
import {Typography} from '@material-ui/core';
const styles = theme => ({
  colors: {
    display: 'inline-block',
    height: '28px',
    width: '28px',
    margin: '2%',
    //   backgroundColor:"red"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 90,
  },
  fullWidth: {
    width: 'calc(100% - 16px)',
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
      color: '',
      age: '',
    };
  }
  selectedColor = color => {
    this.setState ({color: color});
  };
  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  render () {
    const {classes, context} = this.props;
    const contextState = context.state;
    const activeTemplate = contextState.activeTemplate;
    const activeComponent = contextState.activeLayer;
    const textState =
      contextState.templates[activeTemplate].layerData[activeComponent];
    // const Xorigin = contextState.templates[activeTemplate].background.x
    return (
      <div style={{width: '100%'}}>
        {activeComponent
          ? <React.Fragment>

              <Grid container>
              <Grid item xs={12}>
              <SketchPicker
                color={this.state.color}
                onChangeComplete={color => {
                  context.Color (color.hex);
                  this.selectedColor (color);
                }}
              />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  label="X"
                  id="XText"
                  type="number"
                  name="XText"
                  onChange={context.onTextXChange}
                  value={textState.x}
                  className={classNames (classes.margin, classes.textField)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">Px</InputAdornment>
                    ),
                  }}
                />
              </Grid>
                <Grid item xs={6}>
                <TextField
                  label="Y"
                  id="YText"
                  name="YText"
                  type="number"
                  onChange={context.onTextYChange}
                  value={textState.y}
                  className={classNames (classes.margin, classes.textField)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">Px</InputAdornment>
                    ),
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                  label="Width"
                  id="widthText"
                  type="number"
                  name="widthText"
                  onChange={context.onTextWidthChange}
                  value={textState.width}
                  className={classNames (classes.margin, classes.textField)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">Px</InputAdornment>
                    ),
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                  label="Height"
                  id="heightText"
                  name="heightText"
                  type="number"
                  onChange={context.onTextHeightChange}
                  value={textState.height}
                  className={classNames (classes.margin, classes.textField)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">Px</InputAdornment>
                    ),
                  }}
                />
                </Grid>

                <Grid item xs={6}><TextField
                  label="Font Size"
                  id="fontSize"
                  type="number"
                  name="fontSize"
                  onChange={context.onTextSizeChange}
                  value={textState.fontSize}
                  className={classNames (classes.margin, classes.textField)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">Px</InputAdornment>
                    ),
                  }}
                /></Grid>
                <Grid item xs={6}><FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="align-label-placeholder">
                    Align
                  </InputLabel>
                  <Select
                    value={textState.align}
                    onChange={context.onTextAligmnentChange}
                    input={<Input name="align" id="align-label-placeholder" />}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="" disabled>
                      Align
                    </MenuItem>
                    <MenuItem value={'left'}>Left</MenuItem>
                    <MenuItem value={'center'}>Center</MenuItem>
                    <MenuItem value={'right'}>Right</MenuItem>
                  </Select>
                </FormControl></Grid>
                <Grid item xs={12}><FormControl
                className={classes.formControl + ' ' + classes.fullWidth}
              >
                <InputLabel shrink htmlFor="family-label-placeholder">
                  Font Family
                </InputLabel>
                <Select
                  value={textState.fontFamily}
                  onChange={context.onTextVariantChange}
                  input={
                    <Input name="fontFamily" id="family-label-placeholder" />
                  }
                  className={classes.selectEmpty}
                >
                  <MenuItem value="" disabled>
                    Family
                  </MenuItem>
                  <MenuItem value={'arial'}>Arial</MenuItem>
                  <MenuItem value={'roboto'}>Roboto</MenuItem>
                  <MenuItem value={'Helvetica Neue'}>Helvetica Neue</MenuItem>
                  <MenuItem value={'sans-serif'}>Sans-serif</MenuItem>

                </Select>
              </FormControl></Grid>
              <Grid item xs={12}>
              <IconButton><Bold/></IconButton>
              <IconButton><Italic/></IconButton>
              <IconButton><Underline/></IconButton>
              </Grid>
                
              </Grid>
            </React.Fragment>
          : <Typography variant="subtitle1">
              Please select the text box
            </Typography>}
      </div>
    );
  }
}
TextTool.contextType = MyContext;

TextTool.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles (styles) (TextTool);
