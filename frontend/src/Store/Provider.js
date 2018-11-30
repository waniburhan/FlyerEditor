import React, {Suspense, Component} from 'react';

export const MyContext = React.createContext ();

export default class Provider extends Component {
  state = {
    selectColor: '',
    textLayers: ['textn', 'texty', 'texto'],
    is_active: '',
    textObject: {
      textn: {
        fill: 'pink',
        fontSize: 25,
        fontFamily: 'arial',
        name: 'text',
        align: 'left',
        textData: 'IS YOUR TYPE 2 DIABETES MELLITUS UNCONTROLLED DESPITE TAKING METFORMIN',
        x: 250,
        y: 20,
        width: 370,
        height: 77,
      },
      texty: {
        fill: 'green',
        fontSize: 8,
        fontFamily: 'roboto',
        name: 'texty',
        align: 'left',
        textData: 'Over 10 million people in the US have a neurodegenrative condition',
        x: 250,
        y: 107,
        width: 364,
        height: 50,
      },
      texto: {
        c: 'orange',
        fontSize: 15,
        fontFamily: 'helvetica neue',
        name: 'texto',
        align: 'right',
        textData: 'Blessed i am',
        x: 400,
        y: 700,
        width: 500,
        height: 200,
      },
    },

    template: {
      template1: {
        name: 'untitiled 1',
        background:{
          x:"",
          y:"",
          src:""
        },
        LayersList: ['textn', 'texty', 'texto'],
        layersData: {
          textn: {
            fill: 'pink',
            fontSize: 25,
            fontFamily: 'arial',
            name: 'text',
            align: 'left',
            textData: 'IS YOUR TYPE 2 DIABETES MELLITUS UNCONTROLLED DESPITE TAKING METFORMIN',
            x: 250,
            y: 20,
            width: 370,
            height: 77,
          },
          texty: {
            fill: 'green',
            fontSize: 8,
            fontFamily: 'roboto',
            name: 'texty',
            align: 'left',
            textData: 'Over 10 million people in the US have a neurodegenrative condition',
            x: 250,
            y: 107,
            width: 364,
            height: 50,
          },
          texto: {
            fill: 'orange',
            fontSize: 15,
            fontFamily: 'helvetica neue',
            name: 'texto',
            align: 'right',
            textData: 'Blessed i am',
            x: 400,
            y: 700,
            width: 500,
            height: 200,
          },
        },
      },
    },
    // textData: ['hi there', 'hello', 'timbaktu'],
  };
  addField = i => {
    var active = this.state.is_active;
    var font = '';
    if (i == 'h1') {
      font = 100;
    } else if (i == 'h2') {
      font = 80;
    } else if (i == 'h3') {
      font = 60;
    } else if (i == 'h4') {
      font = 50;
    } else {
      font = 30;
    }
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          fontSize: font,
        },
      },
    }));
  };
  onTextChange = evt => {
    var active = this.state.is_active;
    let value = evt.target ? evt.target.value : '';
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          textData: value,
        },
      },
    }));
  };
  onTextColorChange = i => {
    this.setState ({selectColor: i});
  };
  onTextSizeChange = evt => {
    var active = this.state.is_active;
    let value = evt.target ? Number (evt.target.value) : '';
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          fontSize: value,
        },
      },
    }));
  };
  onTextWidthChange = evt => {
    var active = this.state.is_active;
    let value = evt.target ? Number (evt.target.value) : '';
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          width: value,
        },
      },
    }));
  };
  onTextHeightChange = evt => {
    var active = this.state.is_active;
    let value = evt.target ? Number (evt.target.value) : '';
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          height: value,
        },
      },
    }));
  };
  onTextVariantChange = (evt, variant) => {
    var active = this.state.is_active;
    let value = evt.target ? evt.target.value : '';
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          fontFamily: value,
        },
      },
    }));
  };
  onTextAligmnentChange = evt => {
    var active = this.state.is_active;
    let value = evt.target ? evt.target.value : '';
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          align: value,
        },
      },
    }));
  };
  Color = color => {
    const items = this.state.textObject;
    console.log (items, 'asdfghjk');
    items[this.state.selectColor].fill = color;
    this.setState ({text: items});
  };
  onTextXChange = (evt, dragdata) => {
    var active = this.state.is_active;
    let value = evt ? (evt.target ? Number (evt.target.value) : '') : dragdata;
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          x: value,
        },
      },
    }));
  };
  onTextYChange = (evt, dragdata) => {
    var active = this.state.is_active;
    let value = evt ? (evt.target ? Number (evt.target.value) : '') : dragdata;
    this.setState (prevState => ({
      ...prevState,
      textObject: {
        ...prevState.textObject,
        [active]: {
          ...prevState.textObject[active],
          y: value,
        },
      },
    }));
  };
  setActiveComponent = key => {
    this.setState ({is_active: key});
  };
  resetActiveComponent = () => {
    this.setState ({is_active: ''});
  };
  render () {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addField: this.addField,
          setActiveComponent: this.setActiveComponent,
          resetActiveComponent: this.resetActiveComponent,
          onTextChange: this.onTextChange,
          onTextColorChange: this.onTextColorChange,
          onTextSizeChange: this.onTextSizeChange,
          onTextAligmnentChange: this.onTextAligmnentChange,
          onTextVariantChange: this.onTextVariantChange,
          Color: this.Color,
          onTextWidthChange: this.onTextWidthChange,
          onTextHeightChange: this.onTextHeightChange,
          onTextXChange: this.onTextXChange,
          onTextYChange: this.onTextYChange,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
