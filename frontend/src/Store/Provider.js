import React, { Suspense, Component } from 'react';
import Diamond from '../Templates/template1.jpg';
import FlyerThree from "../Templates/Flyer_Letter-03.jpg"
import FlyerSix from "../Templates/Flyer_Letter-06.jpg"

export const MyContext = React.createContext();

export default class Provider extends Component {
  state = {
    stageWidth: (window.innerWidth - 398),
    stageHeight: (window.innerHeight - 112),
    selectColor: '',
    templateList: ['template1', 'template2'],
    layerList: ['textn', 'texty'],
    activeLayer: '',
    activeTemplate: '',
    showRect: false,
    showCircle: false,
    showLine: false,
    textObject: {
      textn: {
        fill: 'pink',
        fontSize: 27,
        fontFamily: 'arial',
        fontStyle: "bold",
        name: 'text',
        align: 'left',
        textData: 'IS YOUR TYPE 2 DIABETES MELLITUS UNCONTROLLED DESPITE TAKING METFORMIN',
        x: 237,
        y: 23,
        width: 396,
        height: 82,
      },
      texty: {
        fill: 'green',
        fontSize: 8,
        fontFamily: 'roboto',
        name: 'texty',
        align: 'left',
        textData: 'Over 10 million people in the US have a neurodegenrative condition Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        x: 238,
        y: 113,
        width: 364,
        height: 50,
      },
      // texto: {
      //   c: 'orange',
      //   fontSize: 15,
      //   fontFamily: 'helvetica neue',
      //   name: 'texto',
      //   align: 'right',
      //   textData: 'Blessed i am',
      //   x: 400,
      //   y: 700,
      //   width: 500,
      //   height: 200,
      // },
    },

    templates: {
      template1: {
        name: 'untitiled 1',
        title: "Diamond",
        background: {
          x: "",
          y: "",
          src: Diamond
        },
        layerData: {
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
      template2: {
        name: 'untitiled 2',
        title: "flyer two",
        background: {
          x: "",
          y: "",
          src: FlyerThree
        },
        layerData: {
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
      template3: {
        name: 'untitiled 3',
        title: "flyer six",
        background: {
          x: "",
          y: "",
          src: FlyerSix
        },
        layerData: {
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

  textLayerState = (prevState,key,value)=>{
    var activeTemplate = this.state.activeTemplate
    var activeLayer = this.state.activeLayer;
   return {
    templates: {
      ...prevState.templates,
      [activeTemplate]: {
        ...prevState.templates[activeTemplate],
        layerData: {
          ...prevState.templates[activeTemplate].layerData,
          [activeLayer]: {
            ...prevState.templates[activeTemplate].layerData[activeLayer],
            [key]: value,
          },
        },
      }
    }
  }
}
  addField = i => {
    var active = this.state.activeLayer;
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
    this.setState(prevState => ({
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
  onShapeChange = (field, value) => {
    this.setState({ [field]: !this.state[field] })

  }
  //done
  onTextChange = evt => {
    let value = evt.target ? evt.target.value : '';
    this.setState(prevState => (
      this.textLayerState(prevState,"textData",value)
    ));
  };
  onTextColorChange = i => {
    this.setState({ selectColor: i });
  };
  onTextSizeChange = evt => {
    let value = evt.target ? Number(evt.target.value) : '';
    this.setState(prevState => (
      this.textLayerState(prevState,"fontSize",value)
    ));
  };
  onTextWidthChange = evt => {
    let value = evt.target ? Number(evt.target.value) : '';
    this.setState(prevState => (
      this.textLayerState(prevState,"width",value)
    ));
  };
  onTextHeightChange = evt => {
    let value = evt.target ? Number(evt.target.value) : '';
    this.setState(prevState => (
      this.textLayerState(prevState,"height",value)
    ));
    
  };
  onTextVariantChange = (evt) => {
    let value = evt.target ? evt.target.value : '';
    this.setState(prevState => (
      this.textLayerState(prevState,"fontFamily",value)
    ));

  };
  onTextAligmnentChange = evt => {
    let value = evt.target ? evt.target.value : '';
    this.setState(prevState => (
      this.textLayerState(prevState,"align",value)
    ));
  };
  Color = color => {
    const items = this.state.textObject;
    items[this.state.selectColor].fill = color;
    this.setState({ text: items });
  };
  onTextXChange = (evt, dragdata) => {
    let value = evt ? (evt.target ? Number(evt.target.value) : '') : dragdata;
    this.setState(prevState => (
      this.textLayerState(prevState,"x",value)
    ));
  };
  onTextYChange = (evt, dragdata) => {
    let value = evt ? (evt.target ? Number(evt.target.value) : '') : dragdata;
    this.setState(prevState => (
      this.textLayerState(prevState,"y",value)
    ));
  };
  setActiveTemplate= key => {
    this.setState({ activeTemplate: key });
  };
  resetActiveTemplate = () => {
    this.setState({ activeTemplate: '' });
  };
  setActiveComponent = key => {
    this.setState({ activeLayer: key });
  };
  resetActiveComponent = () => {
    this.setState({ activeLayer: '' });
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addField: this.addField,
          setActiveComponent: this.setActiveComponent,
          resetActiveComponent: this.resetActiveComponent,
          setActiveTemplate: this.setActiveTemplate,
          resetActiveTemplatet: this.resetActiveTemplate,
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
          onShapeChange: this.onShapeChange
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
