import './SortSelection.css';
import { Component } from 'react';
import Bar from './Bar';
import { NextIcon, PlayIcon, PreviousIcon } from './Icon';
import { NameOfSortingAlgorithm } from './SortingDropdown';

class SortSelection extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      array:[],
      arraySteps:[],
      colorKey:[],
      currentStep:0,
      count:props.count,
      delay:props.delay,
      algorithm:props.algorithm,
      timeouts:[],
    }
  }
  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout)=>clearTimeout(timeout));
    this.setState({
      timeouts:[],
    })
  }
  clearColorKey = () =>{
    let blankKey =new Array(this.state.count).fill(0)
    this.setState({
      colorKey:blankKey,
      colorSteps:[blankKey],
    })
  }
  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    NameOfSortingAlgorithm[this.state.algorithm](array,0,steps,colorSteps);
    this.setState({
      arraySteps: steps,
      colorSteps:colorSteps
    })
  }
  componentDidMount(){
    this.generateRandomArray();
  }
  generateRandomNumber = (min,max)=>{
    return Math.floor(Math.random()*(max-min)+min);
  }
  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const array = this.props.array;
    let temp = new Array();
    for(let i=0;i<count;i++){
      temp.push(this.generateRandomNumber(50,200))
    }
    if(array){
      temp =array;
    }
    console.log(this.state.array)
    this.setState({
      array:temp,
      arraySteps:[temp],
      currentStep:0,
    },()=>{
      this.generateSteps()
    })
  }
  
  changeArray = (index,value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array:arr,
      arraySteps:[arr],
      currentStep:0,
    })
  }
  start = () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;
    this.clearTimeouts();
    let timeouts = [];
    let i=0;

    while(i<steps.length - this.state.currentStep){
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array:steps[currentStep],
          colorKey:colorSteps[currentStep],
          currentStep:currentStep+1
        });
        timeouts.push(timeout);
      }, this.state.delay*i);
      i++;
    }
  }
  previousSteps = () => {
    let currentStep = this.state.currentStep;
    if(currentStep === 0) 
      return;
    currentStep -=1;
    this.setState({
      currentStep:currentStep,
      array:this.state.arraySteps[currentStep],
      colorKey:this.state.colorSteps[currentStep],
    })
  }
  nextSteps = () => {
    let currentStep = this.state.currentStep;
    if(currentStep > this.state.arraySteps.length-1) 
      return;
    currentStep +=1;
    this.setState({
      currentStep:currentStep,
      array:this.state.arraySteps[currentStep],
      colorKey:this.state.colorSteps[currentStep],
    })
  }
  render(){
    const max =Math.max(...this.state.array)+2;
    let bars = this.state.array.map((value,index)=>(
      <Bar 
        key={index}
        index={index}
        length={value}
        max = {max}
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}        
        />
    ));
    let playButton;
    if(this.state.arraySteps.length === this.state.currentStep){
      playButton = (
        <button className='controller' onClick={this.generateRandomArray}>
          <img src="https://cdn-icons-png.flaticon.com/128/6119/6119650.png" alt="Reset Icon" width={30}/>
        </button>
      )
    }
    else{
      playButton = (
        <button className='controller' onClick={this.start}>
          <PlayIcon />
        </button>
      )
    }
    return (
      <>
        <div className='frame'>
          <div className='barsDiv container card'>{bars}</div>
        </div>
        <div className='control-panel'>
          <div className='control-buttons'>
          <button className='controller' onClick={this.previousSteps}>
            <PreviousIcon />
          </button>
            {playButton}
            <button className='controller' onClick={this.nextSteps}>
            <NextIcon />
          </button>
          </div>
        </div>
        <div className='panel'></div>
      </>
    )
  }
}

export default SortSelection;
