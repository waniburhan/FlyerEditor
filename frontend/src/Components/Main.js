import React, {Component} from 'react';
import {Stage, Layer, Rect, Text, Image} from 'react-konva';
import ColoredRect from './Rectangle';
import Transformer from './TransformerComponent.js';
import Backgrounds from '../Common/TemplateData.js';

class BackgroundObject extends React.Component {
  state = {
    image: null,
    width: "",
    height: ""
  };

  componentDidMount () {
    const image = new window.Image ();
    image.src = this.props.src;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({width: image.width,height:image.height})
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
      this.setState({width: image.width,height:image.height})
      this.setState ({
        image: image,
      });
    };
  }

  render () {
    let aspectRatio = this.state.width/this.state.height
    return (
      <Image
        x={this.props.stageWidth/2 - (this.props.stageHeight * aspectRatio)/2}
        y={this.props.stageHeight - this.props.stageHeight}
        width = {this.props.stageHeight * aspectRatio}
        height = {this.props.stageHeight}
        fill={this.props.fill}
        name={this.props.name}
        image={this.state.image}
      />
    );
  }
}

class Main extends Component {
  state = {
    image: null,
    scale: {x:1,y:1},
    position: {x:0,y:0},
    rectangles: [
      {
        fill: 'black',
        name: 'rect1',
      },
    ],
    text: {

      stroke: 'orange',
      fontSize: '100',
      name:'text1'
    },
    selectedShapeName: '',
  };

  componentWillReceiveProps(nextProps){
    this.setState((prevState)=>({scale:{x:prevState.scale.x+nextProps.zoom,y:prevState.scale.y+nextProps.zoom}}))
  }
  // handleStageMouseDown = e => {
  //   // clicked on stage - cler selection
  //   if (e.target === e.target.getStage ()) {
  //     this.setState ({
  //       selectedShapeName: '',
  //     });
  //     return;
  //   }
  //   // clicked on transformer - do nothing
  //   const clickedOnTransformer =
  //     e.target.getParent ().className === 'Transformer';
  //   if (clickedOnTransformer) {
  //     return;
  //   }

  //   // find clicked rect by its name
  //   console.log("poo",e.target.name ())
  //   const name = e.target.name ();
  //   const rect = this.state.rectangles.find (r => r.name === name);
  //   if (rect) {
  //     this.setState ({
  //       selectedShapeName: name,
  //     });
  //   } else {
  //     this.setState ({
  //       selectedShapeName: '',
  //     });
  //   }
  // };
  handleWheelZoom=(e)=>{
    e.evt.preventDefault();
    var stage = this.node.getStage().attrs;
    var scaleBy = 1.01;
    var oldScale = stage.scaleX;

    var mousePointTo = {
        x: (e.evt.x-398) / oldScale - stage.x / oldScale,
        y: (e.evt.y-112 )/ oldScale - stage.y / oldScale,
    };

    var newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    this.setState({scale:{ x: newScale, y: newScale }})

    var newPos = {
        x: -(mousePointTo.x - (e.evt.x-398) / newScale) * newScale,
        y: -(mousePointTo.y - (e.evt.y - 112) / newScale) * newScale
    };
    this.setState({position:newPos})

  }
  render () {

    let stageWidth = (window.innerWidth - 398) 
    let stageHeight= (window.innerHeight - 112)
    return (
      <Stage width={stageWidth} height={stageHeight} x={this.state.position.x} y={this.state.position.y} onMouseDown={this.handleStageMouseDown}  className='container' scaleX={this.state.scale.x} scaleY={this.state.scale.y} ref={(node)=>this.node=node} onWheel={this.handleWheelZoom} draggable>
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
          <Transformer selectedShapeName={this.state.selectedShapeName} />

          <Text
            color="white"
            {...this.state.text}
            onClick={() => console.log ('yooo')}
            draggable
            text="Try click on rect"
          />
        </Layer>
      </Stage>
    );
  }
}
export default Main;
