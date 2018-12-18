import React, {Suspense, Component} from 'react';
import Diamond from '../Templates/template1.jpg';
import FlyerThree from '../Templates/Flyer_Letter-03.jpg';
import FlyerSix from '../Templates/Flyer_Letter-06.jpg';

export const MyContext = React.createContext ();

export default class Provider extends Component {
  state = {
    fileName: 'IconnectFlyer.png',
    stageWidth: window.innerWidth - 398,
    stageHeight: window.innerHeight - 160,
    selectColor: '',
    templateList: ['template2', 'template3', 'template1'],
    layerList: ['textn', 'texty'],
    activeLayer: '',
    activeTemplate: '',
    showRect: false,
    showCircle: false,
    showLine: false,
    templates: {
      template1: {
        name: 'untitiled 1',
        title: 'Diamond',
        background: {
          x: '',
          y: 0,
          height: '',
          width: '',
          src: Diamond,
          aspectRatio: '',
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
          barcode: {
            x: 400,
            y: 700,
            width: 50,
            height: 50,
            name: 'barcode',
            src: 'https://konvajs.github.io/assets/darth-vader.jpg',
          },
        },
      },
      template2: {
        name: 'untitiled 2',
        title: 'flyer two',
        background: {
          x: '',
          y: 0,
          height: '',
          width: '',
          src: FlyerThree,
          aspectRatio: '',
        },
        layerData: {
          textn: {
            fill: 'pink',
            fontSize: 60,
            fontFamily: 'helvetica neue',
            name: 'text',
            align: 'left',
            textData: 'IS YOUR TYPE 2 DIABETES MELLITUS UNCONTROLLED DESPITE TAKING METFORMIN',
            x: 50,
            y: 20,
            width: 1166,
            height: 182,
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
          barcode: {
            x: 400,
            y: 700,
            width: 50,
            height: 50,
            name: 'barcode',
            src: 'https://konvajs.github.io/assets/darth-vader.jpg',
          },
        },
      },
      template3: {
        name: 'untitiled 3',
        title: 'flyer six',
        background: {
          src: FlyerSix,
          x: '',
          y: 0,
          height: '',
          width: '',
          aspectRatio: '',
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
          barcode: {
            x: 400,
            y: 700,
            width: 50,
            height: 50,
            name: 'barcode',
            src: 'https://konvajs.github.io/assets/darth-vader.jpg',
          },
        },
      },
    },
    // textData: ['hi there', 'hello', 'timbaktu'],
  };

  textLayerState = (prevState, key, value) => {
    var activeTemplate = this.state.activeTemplate;
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
        },
      },
    };
  };
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
  onShapeChange = (field, value) => {
    this.setState ({[field]: !this.state[field]});
  };
  //done
  onTextChange = evt => {
    let value = evt.target ? evt.target.value : '';
    this.setState (prevState =>
      this.textLayerState (prevState, 'textData', value)
    );
  };
  onFlyerNameChange = evt => {
    this.setState ({fileName: evt.target.value});
  };
  onTextColorChange = i => {
    this.setState ({selectColor: i});
  };
  onTextSizeChange = evt => {
    let value = evt.target ? Number (evt.target.value) : '';
    this.setState (prevState =>
      this.textLayerState (prevState, 'fontSize', value)
    );
  };
  onTextWidthChange = evt => {
    let value = evt.target ? Number (evt.target.value) : '';
    this.setState (prevState =>
      this.textLayerState (prevState, 'width', value)
    );
  };
  onTextHeightChange = evt => {
    let value = evt.target ? Number (evt.target.value) : '';
    this.setState (prevState =>
      this.textLayerState (prevState, 'height', value)
    );
  };
  onTextVariantChange = evt => {
    let value = evt.target ? evt.target.value : '';
    this.setState (prevState =>
      this.textLayerState (prevState, 'fontFamily', value)
    );
  };
  onTextAligmnentChange = evt => {
    let value = evt.target ? evt.target.value : '';
    this.setState (prevState =>
      this.textLayerState (prevState, 'align', value)
    );
  };
  Color = color => {
    // const items = this.state.textObject;
    // items[this.state.selectColor].fill = color;
    // this.setState({ text: items });
    console.log (this.state.templates, 'templates');
    const {layerList} = this.state.layerList[0];
    this.setState (prevState => {
      return {
        templates: {
          ...prevState.templates,
          [this.state.activeTemplate]: {
            ...prevState.templates[this.state.activeTemplate],
            layerData: {
              ...prevState.templates[this.state.activeTemplate].layerData,
              [this.state.activeLayer]: {
                ...prevState.templates[this.state.activeTemplate].layerData[
                  this.state.activeLayer
                ],
                fill: color,
              },
            },
          },
        },
      };
    });
  };
  onTextXChange = (evt, dragdata) => {
    let value = evt ? (evt.target ? Number (evt.target.value) : '') : dragdata;
    this.setState (prevState => this.textLayerState (prevState, 'x', value));
  };
  onTextYChange = (evt, dragdata) => {
    let value = evt ? (evt.target ? Number (evt.target.value) : '') : dragdata;
    this.setState (prevState => this.textLayerState (prevState, 'y', value));
  };

  getBase64 = file => {
    var reader = new FileReader ();
    reader.readAsDataURL (file);
    reader.onload = () => {
      // this.state.imgSrc = reader.result;
      // this.forceUpdateHandler()
      // this.setState({imgSrc:reader.result})
      this.setState (prevState =>
        this.textLayerState (prevState, 'src', reader.result)
      );
    };
  };

  onImageOptionChange = (field, files) => {
    if (files && files.length > 0) {
      this.getBase64 (files[0]);
    }
  };
  setBackgroundData = (width, height) => {
    var activeTemplate = this.state.activeTemplate;
    let aspectRatio = width / height;
    let backgroundX =
      this.state.stageWidth / 2 - this.state.stageHeight * aspectRatio / 2;

    this.setState (prevState => {
      return {
        templates: {
          ...prevState.templates,
          [activeTemplate]: {
            ...prevState.templates[activeTemplate],
            background: {
              ...prevState.templates[activeTemplate].background,
              x: backgroundX,
              width: width,
              height: height,
              

            },
          },
        },
      };
    });
    // Object.keys(myObject).map((key, index) =>{
    //  return this.setState((prevState)=>  {
    //   return {
    //     templates: {
    //       ...prevState.templates,
    //       [activeTemplate]: {
    //         ...prevState.templates[activeTemplate],
    //         layerData: {
    //           ...prevState.templates[activeTemplate].layerData,
    //           [key]: {
    //             ...prevState.templates[activeTemplate].layerData[key],
    //             x: prevState.templates[activeTemplate].layerData[key].x + backgroundX,
    //           },
    //         },
    //       }
    //     }
    //   }})})

    this.setState (prevState => {
      return {
        templates: {
          ...prevState.templates,
          [activeTemplate]: {
            ...prevState.templates[activeTemplate],
            background: {
              ...prevState.templates[activeTemplate].background,
              aspectRatio: aspectRatio,
            },
          },
        },
      };
    });
  };
  fitToScreen = zoomTrigger => {
    var stageHeight = this.state.stageHeight;
    var activeTemplate = this.state.activeTemplate;
    var bgImageHeight = this.state.templates[activeTemplate].background.height;
    var FitToScreenScale = stageHeight / bgImageHeight;
    
    zoomTrigger (FitToScreenScale);
  };
  setActiveTemplate = key => {
    this.setState ({activeTemplate: key});
  };
  resetActiveTemplate = () => {
    this.setState ({activeTemplate: ''});
  };
  setActiveComponent = key => {
    this.setState ({activeLayer: key});
  };
  resetActiveComponent = () => {
    this.setState ({activeLayer: ''});
  };
  render () {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addField: this.addField,
          fitToScreen: this.fitToScreen,
          setBackgroundData: this.setBackgroundData,
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
          onShapeChange: this.onShapeChange,
          onFlyerNameChange: this.onFlyerNameChange,
          onImageOptionChange: this.onImageOptionChange,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
