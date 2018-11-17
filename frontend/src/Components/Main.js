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
    zoom: 0,
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
  render () {
    let zoomDimension = this.props.zoom>1?this.props.zoom:1
    let stageWidth = (window.innerWidth - 350) * zoomDimension
    let stageHeight= (window.innerHeight - 64) * zoomDimension
    return (
      <Stage width={stageWidth} height={stageHeight}  onMouseDown={this.handleStageMouseDown}  className='container' scaleX={this.props.zoom} scaleY={this.props.zoom}>
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
