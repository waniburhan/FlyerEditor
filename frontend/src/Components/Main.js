import React, {Component} from 'react';
import {Stage, Layer, Group, Rect, Text, Circle, Line} from 'react-konva';
import ColoredRect from './Rectangle';
import CanvasImage from '../Common/images.js';
import Transformer from './TransformerComponent.js';
import Backgrounds from '../Common/TemplateData.js';
import {MyContext} from '../Store/Provider';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import Range from '../Common/Slider.js';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  invisibleInput: {
    border: 'none',
    position: 'absolute',
    top: '30%',
    left: '-200%',
    background: 'transparent',
    color: 'transparent',
    outline: 'none',
  },
  fixedBottom: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: 'calc(100% - 350px)',
    backgroundColor: theme.palette.background.paper,
    zIndex: 9999,
  },
  fitToScreenButton:{
   position: "absolute",
   right: "0.5rem",
   top:"calc(50% - 16px)"
  },
  range: {
   display: "flex",
   margin: "auto"
  },
});
class Main extends Component {
  constructor (props, context) {
    super (props);
    this.myInput = React.createRef ();

    if (context) {

      // context.state.textData.map ((rect, i) => (this['input_' + i] = React.createRef ()  ))
    }
    // this.createDynamicRef()
    this.state = {
      opacity: 1,
      imgSrc: '',
      image: null,
      textData: [],
      scale: {x: 1, y: 1},
      position: {x: 0, y: 0},
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
      // image: new window.Image (),
    };
  }

  // createDynamicRef = () => {
  //   let value = '';
  //   value = this.context;
  //   if (value) {
  //     return value.state.layerList.map (
  //       (rect, i) => (this['input_' + i] = React.createRef ())
  //     );
  //     console.log ('calledy');
  //   }
  //   console.log ('calledyt');

  //   return (this.myInput = React.createRef ());
  // };

  componentDidMount () {
    window.addEventListener (
      'keydown',
      e => {
        if (e.keyCode === 27) {
          this.context.state.activeLayer &&
            this.context.resetActiveComponent ();
          this.setState ({
            selectedShapeName: '',
          });
        }
      },
      false
    );
    // this.state.image.src = 'https://konvajs.github.io/assets/darth-vader.jpg';
    // this.state.image.onload = () => {
    //   // calling set state here will do nothing
    //   // because properties of Konva.Image are not changed
    //   // so we need to update layer manually
    //   this.imageNode.getLayer ().batchDraw ();
    // };
  }

  zoomTrigger = delta => {
    this.setState (prevState => ({
      scale: {x: prevState.scale.x + delta, y: prevState.scale.y + delta},
    }));
    this.setState (prevState => ({
      position: {
        x: prevState.position.x - delta * 430,
        y: prevState.position.y - delta * 330,
      },
    }));
  };
  zoomScale=(x,y)=>{
    let delta = x-this.state.scale.x
    this.setState (prevState => ({
      scale: {x: x, y: y},
      position: {
        x: prevState.position.x  - delta * 430,
        y: prevState.position.y - delta * 330,
      },
    }));
  }
  fitScreen = zoomScale => {
    this.setState ({
      position: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1 * zoomScale,
        y: 1 * zoomScale,
      },
    });
    // this.node.to({
    //   scaleX: this.state.scale.x * zoomScale,
    //   scaleY: this.state.scale.y * zoomScale,
    //   duration: 0.5
    // })
  };
  handleStageClick = () => {
    // this.context.resetActiveComponent()
  };
  handleStageMouseDown = (e, i) => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage ()) {
      this.setState ({
        selectedShapeName: '',
      });
      // console.log(this.context.resetActiveComponent(),"clicked stage")
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

    // const transformedAttrs = e.target.attrs

    //trial for transform change
    // this.setState(prevState=>{
    //   const newArray = [...prevState.textWidth]
    //   newArray[i]=transformedAttrs.width*transformedAttrs.scaleX
    //   return {textWidth: newArray}})

    //   this.setState(prevState=>{
    //     const newArray = [...prevState.textWidth]
    //     newArray[i]=transformedAttrs.height*transformedAttrs.scaleY
    //     return {textHeight: newArray}})
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
  handleWheelZoom = (e, Xorigin) => {
    e.evt.preventDefault ();
    var stage = this.node.getStage ().attrs;
    var scaleBy = 1.01;
    var oldScale = stage.scaleX;

    var mousePointTo = {
      x: (e.evt.x - (398 + Xorigin)) / oldScale - stage.x / oldScale,
      y: (e.evt.y - 112) / oldScale - stage.y / oldScale,
    };

    var newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    this.setState ({scale: {x: newScale, y: newScale}});

    var newPos = {
      x: -(mousePointTo.x - (e.evt.x - (398 + Xorigin)) / newScale) * newScale,
      y: -(mousePointTo.y - (e.evt.y - 112) / newScale) * newScale,
    };
    this.setState ({position: newPos});
  };
  hitUploadTrigger = key => {
    this.context.setActiveComponent (key);
    this.uploadTrigger.click ();
  };
  editTextBox = (evt, key) => {
    this.context.setActiveComponent (key);
    document.getElementById (key).focus ();
    this.context.onTextColorChange (key);
  };
  // onTextChange = (evt, i) => {
  //   const items = this.state.textData.i;
  //   items[i] = evt.target.value;
  //   this.setState ({textData: items});
  // };
  getXY = e => {
    this.context.onTextXChange (null, e.target.attrs.x);
    this.context.onTextYChange (null, e.target.attrs.y);
  };
  handleStageDrag= e =>{
   this.setState({position:{
     x: e.currentTarget.attrs.x,
     y: e.currentTarget.attrs.y
   }})
  }

  render () {
    const {classes} = this.props;
    return (
      <MyContext.Consumer>
        {context => {
          const contextState = context.state;
          const activeTemplate = contextState.activeTemplate;
          const activeComponent = contextState.activeLayer;
          const Xorigin = contextState.templates[activeTemplate].background.x;
          return (
            <React.Fragment>
              <input
                id={`file-upload`}
                ref={node => (this.uploadTrigger = node)}
                style={{display: 'none'}}
                type="file"
                accept="image/*"
                onChange={({target}) =>
                  this.context.onImageOptionChange ('select', target.files)}
              />
              <Stage
                width={context.state.stageWidth}
                height={context.state.stageHeight}
                x={this.state.position.x}
                y={this.state.position.y}
                // onMouseDown={this.handleStageMouseDown}
                onClick={this.handleStageClick}
                className="container"
                scaleX={this.state.scale.x}
                scaleY={this.state.scale.y}
                offsetX={-Xorigin / this.state.scale.x}
                ref={node => (this.node = node)}
                onDragEnd={this.handleStageDrag}
                onWheel={e => this.handleWheelZoom (e, Xorigin)}
                draggable
              >
                <Layer>
                  <CanvasImage
                    stageWidth={context.state.stageWidth}
                    stageHeight={context.state.stageHeight}
                    context={context}
                    name="background"
                    src={contextState.templates[activeTemplate].background.src}
                    draggable={false}
                    isBackground={true}
                    fitScreen={this.fitScreen}
                  />
                  {context.state.showRect
                    ? <Rect
                        x={20}
                        y={50}
                        width={100}
                        height={100}
                        fill="red"
                        shadowBlur={10}
                        name="rect"
                        draggable
                        onMouseDown={this.handleStageMouseDown}
                      />
                    : null}
                  <Transformer
                    selectedShapeName={this.state.selectedShapeName}
                  />
                  <CanvasImage
                    {...contextState.templates[activeTemplate].layerData
                      .barcode}
                    opacity={this.state.opacity}
                    onMouseOut={() => {
                      this.setState ({opacity: 1});
                    }}
                    onMouseOver={() => {
                      this.setState ({opacity: 0.5});
                    }}
                    draggable={false}
                    onMouseDown={() =>
                      this.hitUploadTrigger (
                        contextState.templates[activeTemplate].layerData.barcode
                          .name
                      )}
                    stroke={
                      activeComponent ===
                        contextState.templates[activeTemplate].layerData.barcode
                          .name
                        ? '#0fb4bb'
                        : ''
                    }
                  />
                  {context.state.layerList.map ((key, i) => {
                    const {x, y, ...textProps} = contextState.templates[
                      activeTemplate
                    ].layerData[key];
                    const draggable = key === activeComponent ? true : false;
                    return (
                      <Group
                        x={x}
                        y={y}
                        draggable={draggable}
                        onDragEnd={this.getXY}
                      >
                        <Rect
                          name={'textRect' + (i + 1)}
                          width={
                            contextState.templates[activeTemplate].layerData[
                              key
                            ].width
                          }
                          height={
                            contextState.templates[activeTemplate].layerData[
                              key
                            ].height
                          }
                          stroke={activeComponent === key ? '#0fb4bb' : ''}
                          //  onMouseDown={this.handleStageMouseDown}

                          //  ref={`textRect+${i}`}
                        />
                        <Text
                          key={i}
                          opacity={this.state.opacity}

                          width={
                            contextState.templates[activeTemplate].layerData[
                              key
                            ].textWidth
                          }
                          height={
                            contextState.templates[activeTemplate].layerData[
                              key
                            ].textHeight
                          }
                          // ref={`text+${i}`}
                          {...textProps}
                          onClick={evt => this.editTextBox (evt, key)}
                          text={
                            contextState.templates[activeTemplate].layerData[
                              key
                            ].textData
                          }
                          // wrap="char"
                          // align="center"
                          // width={700}
                          // height={200}
                          // fontSize={60}
                        />
                      </Group>
                    );
                  })}

                  {context.state.showCircle
                    ? <Circle
                        x={200}
                        y={100}
                        radius={50}
                        fill="green"
                        name="circle"
                        onMouseDown={this.handleStageMouseDown}
                        draggable
                      />
                    : null}
                  {context.state.showLine
                    ? <Line
                        onMouseDown={this.handleStageMouseDown}
                        draggable
                        x={20}
                        y={200}
                        points={[0, 0, 100, 0, 100, 100]}
                        tension={0.5}
                        closed
                        stroke="black"
                        name="line"
                        fillLinearGradientStartPoint={{x: -50, y: -50}}
                        fillLinearGradientEndPoint={{x: 50, y: 50}}
                        fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
                      />
                    : null}

                </Layer>

              </Stage>
              {context.state.layerList.map ((key, i) => (
                <React.Fragment>
                  <input
                    key={i}
                    id={key}
                    className={classes.invisibleInput}
                    type="text"
                    onChange={context.onTextChange}
                    // onKeyDown={(evt,key)=>this.keyPress(evt,key)}
                    value={
                      contextState.templates[activeTemplate].layerData[key]
                        .textData
                    }
                  />
                </React.Fragment>
              ))}
              <Grid container className={classes.fixedBottom}>
                <div  className={classes.range}>
                  <IconButton
                  size="small"
                  color=""
                  onClick={() => {
                    this.zoomTrigger (-0.2);
                  }}
                  disabled={this.state.scale.x < 0.2}
                >
                  <ZoomOut />
                </IconButton>
                <Range zoomScale={this.zoomScale} scale={this.state.scale} />
                <IconButton
                  size="small"
                  onClick={() => {
                    this.zoomTrigger (0.2);
                  }}
                  disabled={this.state.scale.x > 4.8}
                >
                  <ZoomIn />
                </IconButton>
                </div>
                <Button variant="outlined" size="small" onClick={()=>context.fitToScreen(this.fitScreen)} className={classes.fitToScreenButton}>
                Fit To Screen
                </Button>
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
// export default withStyles (styles)(props => ( <MyContext.Consumer>
//   {({context}) => {
//      return <Main {...props} context={context}/>
//   }}
// </MyContext.Consumer> ))
