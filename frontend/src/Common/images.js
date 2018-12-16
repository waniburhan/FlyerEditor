import React from 'react';
import {
    Image,
  } from 'react-konva';


class CanvasImage extends React.Component {
    state = {
      image: null,
      width: '',
      height: '',
      src: this.props.src,
      isBackground: this.props.isBackground,
      context: this.props.context
    };
  
    componentDidMount () {
      const image = new window.Image ();
      image.src = this.props.src;
      image.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState ({width: image.width, height: image.height});
        this.props.isBackground && this.props.context.setBackgroundData(image.width,image.height)
        this.props.isBackground && this.props.context.fitToScreen(this.props.fitScreen)
        this.setState ({
          image: image,
        });
      };
    }
    // componentWillReceiveProps (props) {
    //   if(props.src !== this.state.src){
    
    //     const image = new window.Image ();
    //     image.src = props.src;
    //     return  image.onload = () => {
    //       // setState will redraw layer
    //       // because "image" property is changed
    //       // console.log(this.props.src,props.src,"src changed")
    //       this.state.isBackground && this.state.context.setBackgroundData(image.width,image.height)
    //       this.state.isBackground && this.state.context.fitToScreen(props.fitScreen)
    //       return {width: image.width, height: image.height,image: image};
    //     }
    //   }
    //   else{
    //     return null
    //   }
    //     // this.imageNode.getLayer ().batchDraw ();
    // }

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
      let x = this.props.isBackground?0:this.props.x
      let y = this.props.isBackground?0:this.props.y
      // let width = this.props.stageHeight * aspectRatio
      // let height = this.props.stageHeight
      return (
        <Image
          x={x}
          y={y}
          width={this.props.isBackground?this.state.width:this.props.width}
          height={this.props.isBackground?this.state.height:this.props.height}
          stroke = {this.props.stroke}
          name={this.props.name}
          image={this.state.image}
          opacity={this.state.opacity}
          onMouseOut={this.props.onMouseOut}
          onMouseOver={this.props.onMouseOver}
          onMouseEnter={this.props.onMouseEnter}
          onMouseDown={this.props.onMouseDown}
          draggable = {this.props.draggable}
          ref={node => this.imageNode = node}
        />
      );
    }
  }

  export default CanvasImage;