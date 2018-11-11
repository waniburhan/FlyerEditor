import React, {Suspense} from 'react';
class FlyerView extends React.Component {
  render () {
    return (
      <img
        id="xy"
        style={{width: '100%'}}
        src={this.props.imgSrc}
        alt={'tile.title'}
      />
    );
  }
}
export default FlyerView;