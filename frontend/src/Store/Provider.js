import React, {Suspense, Component} from 'react';

export const MyContext = React.createContext ();

export default class Provider extends Component {
  state = {
    selectColor: '',
    text: [
      {
        fill: 'red',
        fontSize: '100',
        name: 'text',
      },
      {
        fill: 'blue',
        fontSize: '50',
        name: 'texty',
      },
      {
        fill: 'orange',
        fontSize: '100',
        name: 'texto',
      },
    ],
    textData: ['hi there', 'hello', 'timbaktu'],
  };
  addField = i => {
    var items = this.state.textData;
    this.setState ({textData: [...items, 'hii how are you']});
    var font = '';
    if (i == 'h1') {
      font = '100';
    } else if (i == 'h2') {
      font = '80';
    } else if (i == 'h3') {
      font = '60';
    } else if (i == 'h4') {
      font = '50';
    } else {
      font = '30';
    }
    this.setState ({
      text: [
        ...this.state.text,
        {
          fill: 'orange',
          fontSize: font,
          name: 'text' + this.state.textData.length + 1,
        },
      ],
    });
  };
  onTextChange = (evt, i) => {
    const items = this.state.textData;
    items[i] = evt.target.value;
    this.setState ({textData: items});
  };
  onTextColorChange = i => {
    this.setState ({selectColor: i});
  };
  Color = color => {
    const items = this.state.text;
    console.log(items,"asdfghjk")
    items[this.state.selectColor].fill = color;
    this.setState ({text: items});
  };
  render () {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addField: this.addField,
          onTextChange: this.onTextChange,
          onTextColorChange: this.onTextColorChange,
          Color: this.Color,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
