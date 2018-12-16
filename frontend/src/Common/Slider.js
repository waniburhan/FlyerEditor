import React, {Component} from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
export default class Range extends Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      volume: 0,
      val: 0,
    };
  }

  handleOnChange = value => {
    if (this.props.scale.x > value) {
      this.props.zoomTrigger (-0.2);
      this.setState ({
        val: this.state.val - 0.2,
      });
    } else if (this.props.scale.x < value) {
      this.props.zoomTrigger (+0.2);
      this.setState ({
        val: this.state.val + 0.2,
      });
    }
    this.setState ({
      volume: value,
    });
  };

  render () {
    let {volume} = this.state;
    return (<div className="range" style={{width:"230px",height:"15px"}}>
      <Slider     
        step={0.2}
        min={0}
        max={20}
        value={this.props.scale.x}
        orientation="horizontal"
        onChange={this.handleOnChange}
      /></div>
    );
  }
}
