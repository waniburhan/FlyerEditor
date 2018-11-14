import React, {Component} from 'react';
import {Stage, Layer, Rect, Text, Image} from 'react-konva';
import ColoredRect from './Rectangle';
import Transformer from './TransformerComponent.js';
import Backgrounds from '../Common/TemplateData.js';

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
        draggable
        image={this.state.image}
      />
    );
  }
}

class Main extends Component {
  state = {
    image: null,
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

      stroke: 'orange',
      fontSize: '100',
      name:'text1'
    },
    selectedShapeName: '',
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
    console.log("poo",e.target.name ())
    const name = e.target.name ();
    const rect = this.state.rectangles.find (r => r.name === name);
    if (rect) {
      this.setState ({
        selectedShapeName: name,
      });
    } else {
      this.setState ({
        selectedShapeName: '',
      });
    }
  };
  render () {
    console.log (this.state, 'hellooi');

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}  onMouseDown={this.handleStageMouseDown}
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
          <Transformer selectedShapeName={this.state.selectedShapeName} />

          <Text
            color="white"
            {...this.state.text}
            onClick={() => console.log ('yooo')}
            draggable
            text="Try click on rect"
          />
        </Layer>
        <Layer>
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
