import React from 'react';
import {
    Image,
  } from 'react-konva';


class CanvasImage extends React.Component {
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
        this.imageNode.getLayer ().batchDraw ();
      };
    }
  
    render () {
      let aspectRatio = this.state.width / this.state.height;
      let backgroundX = this.props.stageWidth / 2 - this.props.stageHeight * aspectRatio / 2
      let backgroundY = this.props.stageHeight - this.props.stageHeight
      let x = this.props.isBackground?backgroundX:this.props.x
      let y = this.props.isBackground?backgroundY:this.props.y
      let width = this.props.stageHeight * aspectRatio
      let height = this.props.stageHeight
      return (
        <Image
          x={x}
          y={y}
          width={this.props.width?this.props.width:this.state.width}
          height={this.props.height?this.props.height:this.state.height}
          stroke = {this.props.stroke}
          name={this.props.name}
          image={this.state.image}
          onMouseEnter={this.props.onMouseEnter}
          onMouseDown={this.props.onMouseDown}
          draggable = {this.props.draggable}
          ref={node => this.imageNode = node}
        />
      );
    }
  }

  export default CanvasImage;