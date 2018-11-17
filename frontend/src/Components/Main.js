import React, {Component} from 'react';
import {Stage, Layer, Rect, Text, Image} from 'react-konva';
import ColoredRect from './Rectangle';
import Transformer from './TransformerComponent.js';
import Backgrounds from '../Common/TemplateData.js';
import {MyContext} from '../Store/Provider';
import {withStyles} from '@material-ui/core/styles';

class BackgroundObject extends React.Component {
  state = {
    image: null,
  };

  componentDidMount () {
    const image = new window.Image ();
    image.src = this.props.src;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState ({
        image: image,
      });
    };
  }
  componentWillReceiveProps (props) {
    const image = new window.Image ();
    image.src = props.src;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState ({
        image: image,
      });
    };
  }

  render () {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill={this.props.fill}
        name={this.props.name}
        image={this.state.image}
      />
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  invisibleInput: {
    border: 'none',
    position: 'absolute',
    top: '30%',
    background: 'transparent',
    color: 'transparent',
    outline: 'none',
  },
});
class Main extends Component {
  constructor (props, context) {
    super (props);
    this.myInput = React.createRef ();
    console.log (context, 'poolyeee');

    if (context) {
      console.log ('poolyeee');

      // context.state.textData.map ((rect, i) => (this['input_' + i] = React.createRef ()  ))
    }
    // this.createDynamicRef()
    this.state = {
      editBox: false,
      image: null,
      textData: [],
      rectangles: [
        {
          x: 10,
          y: 10,
          width: 721,
          height: 1081,
          fill: 'black',
          name: 'rect1',
        },
      ],
      text: {
        stroke: 'red',
        fontSize: '100',
        name: 'text1',
      },
      selectedShapeName: '',
    };
  }
  createDynamicRef = () => {
    let value = '';
    value = this.context;
    if (value) {
      return value.state.textData.map (
        (rect, i) => (this['input_' + i] = React.createRef ())
      );
      console.log ('calledy');
    }
    console.log ('calledyt');

    return (this.myInput = React.createRef ());
  };

  handleStageMouseDown = e => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage ()) {
      this.setState ({
        selectedShapeName: '',
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent ().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name ();
    const rect = this.state.rectangles.find (r => r.name === name);
    const text = this.state.text.name;
    if (rect) {
      this.setState ({
        selectedShapeName: '',
      });
    } else if (text) {
      this.setState ({
        selectedShapeName: name,
      });
    } else {
      this.setState ({
        selectedShapeName: '',
      });
    }
  };
  editTextBox = i => {
    this.setState ({editBox: true});
    this['input_' + i].current.focus ();
    this.context.onTextColorChange(i)
  };
  onTextChange = (evt, i) => {
    const items = this.state.textData;
    items[i] = evt.target.value;
    this.setState ({textData: items});
  };
  keyPress = e => {
    if (e.keyCode == 13) {
      this.setState ({textData: e.target.value});
      this.setState ({editBox: false});
    }
  };
  render () {
    const {classes} = this.props;
    this.createDynamicRef ();

    return (
      <div>
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              {' '} <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={this.handleStageMouseDown}
              >
                {/*<Stage width={window.innerWidth} height={window.innerHeight}>
                      <Layer>
                        <Text text="Try click on rect" />
                        <ColoredRect />
                        <Image image={this.state.image}/>
                        <Transformer
                          selectedShapeName={this.state.selectedShapeName}/>
                      </Layer>
                  </Stage>*/}
                <Layer>
                  {this.state.rectangles.map ((rect, i) => (
                    <BackgroundObject
                      key={i}
                      {...rect}
                      src={this.props.selectedBackground}
                    />
                  ))}
                  <Transformer
                    selectedShapeName={this.state.selectedShapeName}
                  />
                  {context.state.text.map ((rect, i) => (
                    <Text
                      key={i}
                      {...rect}
                      onClick={() => this.editTextBox (i)}
                      draggable
                      text={context.state.textData[i]}
                    />
                  ))}
                </Layer>
                <Layer>
                  {/* <Text
              color="white"
              {...this.state.text}
              onClick={this.editTextBox}
              draggable
              text={this.state.textData}
            /> */}

                </Layer>
              </Stage>
              {context.state.textData.map ((rect, i) => (
                <React.Fragment>
                  {this.state.editBox
                    ? <input
                        key={i}
                        ref={this['input_' + i]}
                        className={classes.invisibleInput}
                        type="text"
                        onChange={evt => context.onTextChange (evt, i)}
                        onKeyDown={this.keyPress}
                      />
                    : ''}
                  <button onClick={() => context.addField (i)}>
                    hieuuydcuygdc
                  </button>
                </React.Fragment>
              ))}
              <button onClick={() => this.createDynamicRef ()}>const</button>

            </React.Fragment>
          )}
        </MyContext.Consumer>

      </div>
    );
  }
}
Main.contextType = MyContext;

export default withStyles (styles) (Main);
