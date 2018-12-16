import React from 'react';
import {Image} from 'react-konva';

class CanvasImage extends React.Component {
  state = {
    image: new window.Image (),
    width: '',
    height: '',
    src: '',
  };

  componentDidMount () {
    this.state.image.src = this.props.src;
    this.state.image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState ({
        width: this.state.image.width,
        height: this.state.image.height,
      });
      this.props.isBackground &&
        this.props.context.setBackgroundData (
          this.state.image.width,
          this.state.image.height
        );
      this.props.isBackground &&
        this.props.context.fitToScreen (this.props.fitScreen);
      this.setState ({
        src: this.props.src,
      });
    };
  }
  componentWillReceiveProps (props) {
    if (props.src !== this.props.src) {
      this.state.image.src = props.src;
      this.state.image.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState ({
          width: this.state.image.width,
          height: this.state.image.height,
        });
        props.isBackground &&
          props.context.setBackgroundData (
            this.state.image.width,
            this.state.image.height
          );
        this.imageNode.getLayer ().batchDraw ();
      };
    }
  }
  //   static getDerivedStateFromProps(props, prevState){
  //   //   if(props.src !== prevState.src){

  //   //   const image = new window.Image ();
  //   //   image.src = props.src;
  //   //   return  image.onload = () => {
  //   //     // setState will redraw layer
  //   //     // because "image" property is changed
  //   //     // console.log(this.props.src,props.src,"src changed")
  //   //     prevState.isBackground && prevState.context.setBackgroundData(image.width,image.height)
  //   //     prevState.isBackground && prevState.context.fitToScreen(props.fitScreen)
  //   //     return {width: image.width, height: image.height,image: image};
  //   //   }
  //   // }
  //   // else{
  //   //   return null
  //   // }
  //     // this.imageNode.getLayer ().batchDraw ();
  //  }

  render () {
    // let aspectRatio = this.state.width / this.state.height;
    // let backgroundX = this.props.stageWidth / 2 - this.props.stageHeight * aspectRatio / 2
    // let backgroundY = 0
    let x = this.props.isBackground ? 0 : this.props.x;
    let y = this.props.isBackground ? 0 : this.props.y;
    // let width = this.props.stageHeight * aspectRatio
    // let height = this.props.stageHeight
    return (
      <Image
        x={x}
        y={y}
        opacity={this.props.opacity}
        stroke={this.props.stroke}
        name={this.props.name}
        image={this.state.image}
        onMouseOut={this.props.onMouseOut}
        onMouseOver={this.props.onMouseOver}
        onMouseEnter={this.props.onMouseEnter}
        onMouseDown={this.props.onMouseDown}
        draggable={this.props.draggable}
        ref={node => (this.imageNode = node)}
      />
    );
  }
}

export default CanvasImage;
