import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {MyContext} from '../Store/Provider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
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
        {context => (
          <div style={{width: '100%'}}>
            <ul className={classes.UList}>
              <li
                onClick={() => context.addField ('h1')}
                className={classes.list}
              >
                Title
              </li>
              <li
                onClick={() => context.addField ('h2')}
                className={classes.list}
              >
                Subtitle
              </li>
              <li
                onClick={() => context.addField ('h3')}
                className={classes.list}
              >
                {' '}Subtitle 2
              </li>
              <li
                onClick={() => context.addField ('h4')}
                className={classes.list}
              >
                Subtitle 3
              </li>
              <li
                onClick={() => context.addField ('h5')}
                className={classes.list}
              >
                Body text
              </li>

            </ul>
            <Divider />
            <ListItem button key={'1'}>
              <ListItemText primary={'Text Colors'} />
            </ListItem>
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

            </div>

          <TextField
          label="Font Size"
          id="fontSize"
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="start">Px</InputAdornment>,
          }}
        />
        <FormControl className={classes.formControl}>
          <Select
            value={this.props.align}
            onChange={this.props.onTextAligmnentChange}
            name="align"
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Align
            </MenuItem>
            <MenuItem value={"Left"}>Left</MenuItem>
            <MenuItem value={"Center"}>Center</MenuItem>
            <MenuItem value={"Right"}>Right</MenuItem>
          </Select>
        </FormControl>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
TextTool.contextType = MyContext;

TextTool.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles (styles) (TextTool);
