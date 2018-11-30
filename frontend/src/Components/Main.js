import React, {Component} from 'react';
import {Stage, Layer,Group, Rect, Text, Image} from 'react-konva';
import ColoredRect from './Rectangle';
import Transformer from './TransformerComponent.js';
import Backgrounds from '../Common/TemplateData.js';
import {MyContext} from '../Store/Provider';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';

class BackgroundObject extends React.Component {
  state = {
    image: null,
    width: '',
    height: '',
  };

  componentDidMount () {
    const image = new window.Image ();
    image.src = this.props.src;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState ({width: image.width, height: image.height});
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
      this.setState ({width: image.width, height: image.height});
      this.setState ({
        image: image,
      });
    };
  }

  render () {
    let aspectRatio = this.state.width / this.state.height;
    return (
      <Image
        x={this.props.stageWidth / 2 - this.props.stageHeight * aspectRatio / 2}
        y={this.props.stageHeight - this.props.stageHeight}
        width={this.props.stageHeight * aspectRatio}
        height={this.props.stageHeight}
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
  fixedBottom: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    zIndex: 9999,
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
        scale: {x:1,y:1},
        position: {x:0,y:0},
        textWidth:[500,500,500],
        textHeight:[200,200,200],
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
      return value.state.textLayers.map (
        (rect, i) => (this['input_' + i] = React.createRef ())
      );
    }
    return (this.myInput = React.createRef ());
  };
  zoomTrigger = (delta)=>{
    this.setState((prevState)=>({scale:{x:prevState.scale.x+delta,y:prevState.scale.y+delta}}))
  }
  handleStageMouseDown = (e,i) => {
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
    // find clicked object by its name
    const name = e.target.name ();
    console.log(e.target.attrs,"rectangle")
    const transformedAttrs = e.target.attrs
    this.setState(prevState=>{
      const newArray = [...prevState.textWidth]
      newArray[i]=transformedAttrs.width*transformedAttrs.scaleX
      return {textWidth: newArray}})

      this.setState(prevState=>{
        const newArray = [...prevState.textWidth]
        newArray[i]=transformedAttrs.height*transformedAttrs.scaleY
        return {textHeight: newArray}})
    // const rect = this.state.rectangles.find (r => r.name === name);
    // const text = this.state.text.name;
    this.setState ({
          selectedShapeName: name,
        });
    // if (rect) {
    //   this.setState ({
    //     selectedShapeName: name,
    //   });
    // } 
    // else if (text) {
    //   this.setState ({
    //     selectedShapeName: name,
    //   });
    // } 
    // else {
    //   this.setState ({
    //     selectedShapeName: '',
    //   });
    // }
  };
  handleWheelZoom = e => {
    e.evt.preventDefault ();
    var stage = this.node.getStage ().attrs;
    var scaleBy = 1.01;
    var oldScale = stage.scaleX;

    var mousePointTo = {
      x: (e.evt.x - 398) / oldScale - stage.x / oldScale,
      y: (e.evt.y - 112) / oldScale - stage.y / oldScale,
    };

    var newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    this.setState ({scale: {x: newScale, y: newScale}});

    var newPos = {
      x: -(mousePointTo.x - (e.evt.x - 398) / newScale) * newScale,
      y: -(mousePointTo.y - (e.evt.y - 112) / newScale) * newScale,
    };
    this.setState ({position: newPos});
  };

  editTextBox = (evt,key) => {
    console.log(evt,"evttt")
    console.log(this.node.getStage().attrs,"fd")
    this.setState ({editBox: true});
    this.context.setActiveComponent(key)
    document.getElementById(key).focus();
    this.context.onTextColorChange(key)
  };
  onTextChange = (evt, i) => {
    const items = this.state.textData.i;
    items[i] = evt.target.value;
    this.setState ({textData: items});
  };
  keyPress = e => {
    if (e.keyCode === 13) {
      this.setState ({textData: e.target.value});
      this.setState ({editBox: false});
    }
  };
  handleExport=()=>{
  this.uri = document.getElementsByTagName('canvas')[0].toDataURL('image/png')
  }
  render () {
    const {classes} = this.props;
    this.createDynamicRef ();
    return (
      <MyContext.Consumer>
        {context => {
          let stageWidth = window.innerWidth - 398;
          let stageHeight = window.innerHeight - 112;
          return (
            <React.Fragment>
              <Stage
              width={stageWidth} 
              height={stageHeight} 
              x={this.state.position.x} 
              y={this.state.position.y} 
              // onMouseDown={this.handleStageMouseDown}  
              className='container' 
              scaleX={this.state.scale.x} 
              scaleY={this.state.scale.y} 
              ref={(node)=>this.node=node} 
              onWheel={this.handleWheelZoom} 
              draggable
              >
                <Layer>
                  {this.state.rectangles.map ((rect, i) => (
                    <BackgroundObject
                      stageWidth={stageWidth}
                      stageHeight={stageHeight}
                      key={i}
                      {...rect}
                      src={this.props.selectedBackground}
                    />
                  ))}
                  <Transformer
                    selectedShapeName={this.state.selectedShapeName}
                  />
                  {context.state.textLayers.map ((key, i) => 
                  {
                    const {x,y,...textProps}=context.state.textObject[key]
                    console.log(this.textRect,"textRect")
                    return <Group  x={x} y={y} draggable>
                    <Rect
                     name={"textRect"+(i+1)}
                     width={500}
                     height={200}
                     stroke={(context.state.is_active === key)?"#00bfff":""} 
                     dash= {[10,15]}            
                    //  onMouseDown={(evt)=>this.handleStageMouseDown(evt,i)}
                     
                    //  ref={`textRect+${i}`}
                   />
                    <Text
                      key={i}
                      width={this.state.textWidth[i]}
                      height={this.state.textHeight[i]}
                      // ref={`text+${i}`}
                      {...textProps}
                      onClick={(evt) => this.editTextBox (evt,key)}
                      text={context.state.textObject[key].textData}
                      // wrap="char"
                      // align="center"
                      // width={700}
                      // height={200}
                      // fontSize={60}
                    />
                    </Group>
                  })}
                  
                </Layer>
              </Stage>
              {context.state.textLayers.map ((key, i) => (
                <React.Fragment>
                  {this.state.editBox
                    ? <input
                        key={i}
                        id={key}
                        className={classes.invisibleInput}
                        type="text"
                        onChange={(evt )=> context.onTextChange(evt, key)}
                        // onKeyDown={(evt,key)=>this.keyPress(evt,key)}
                        value={context.state.textObject[key].textData}
                      />
                    : ''}
                </React.Fragment>
              ))}
              <button onClick={() => this.createDynamicRef ()}>const</button>
              <Grid container className={classes.fixedBottom}>
              <a href={this.uri} download="my-file-name.png">Download</a>
            <IconButton size="small" color="" onClick={this.handleExport}><ZoomOut/></IconButton>
            <IconButton size="small" color="" onClick={()=>{this.zoomTrigger(-0.1)}}><ZoomOut/></IconButton>
            <IconButton size="small"  onClick={()=>{this.zoomTrigger(0.1)}}><ZoomIn/></IconButton>
           </Grid>  
            </React.Fragment>
          );
        }}

      </MyContext.Consumer>
    );
  }
}
Main.contextType = MyContext;

export default withStyles (styles) (Main);
