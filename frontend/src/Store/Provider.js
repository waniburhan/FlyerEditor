import React, { Suspense, Component } from 'react';

export const MyContext = React.createContext();

export default class Provider extends Component {
  state = {
    selectColor: '',
    textLayers: [
      "text",
      "texty",
      "texto"
    ],
    is_active:"",
    textObject:{
      text: {
        fill: 'red',
        fontSize: '100',
        name: 'text',
        align: "center",
        textData: "boss is always right",
        x:100,
        y: 200

      },
      texty: {
        fill: 'blue',
        fontSize: '50',
        name: 'texty',
        align: "left",
        textData: "live life your way",
        x:300,
        y: 500
      },
      texto: {
        fill: 'orange',
        fontSize: '100',
        name: 'texto',
        align: "right",
        textData: "Blessed i am",
        x:400,
        y: 700,
      },
    },
    // textData: ['hi there', 'hello', 'timbaktu'],
  };
  addField = i => {
    var active =  this.state.is_active
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
    this.setState(prevState => ({
      ...prevState,
      textObject: {
          ...prevState.textObject,
          [active]: {
              ...prevState.textObject[active], 
              fontSize: font
          }
      }
  }))
  };
  onTextChange = (evt, name) => {
    console.log(name,"name")
    let value = evt.target.value;
    this.setState(prevState => ({
      ...prevState,
      textObject: {
          ...prevState.textObject,
          [name]: {
              ...prevState.textObject[name], 
              textData: value
          }
      }
  }))
    
  };
  onTextColorChange = i => {
    this.setState({ selectColor: i });
  };
  onTextSizeChange = (evt, size) => {
    this.setState({ fontSize: size });
  };
  onTextVariantChange = (evt, variant) => {
    this.setState({ fontVariant: variant });
  };
  onTextAligmnentChange = (event, key) => {
    this.setState({ textObject:{ [key]: {...this.state.event.textObject,[event.target.name]: event.target.value }}});
  }
  Color = color => {
    const items = this.state.textObject;
    console.log(items, "asdfghjk")
    items[this.state.selectColor].fill = color;
    this.setState({ text: items });
  };
  setActiveComponent = (key)=>{
    this.setState({is_active:key})
  }
  resetActiveComponent = ()=>{
    this.setState({is_active:""})
  }
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addField: this.addField,
          setActiveComponent:this.setActiveComponent,
          resetActiveComponent: this.resetActiveComponent,
          onTextChange: this.onTextChange,
          onTextColorChange: this.onTextColorChange,
          onTextSizeChange: this.onTextSizeChange,
          onTextAligmnentChange: this.onTextAligmnentChange,
          onTextVariantChange: this.onTextVariantChange,
          Color: this.Color,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
