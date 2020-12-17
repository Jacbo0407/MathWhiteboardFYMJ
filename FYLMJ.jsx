import './App.css';
import React, { useRef, useEffect, useState } from 'react';
//import Container from './components/container/Container';

export default App => {
  let canvasRef = useRef(null)
  let contextRef = useRef(null)
  let[isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2,2);
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;
  }, [])

  const startDrawing = () => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }
  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }
  const draw = () => {
    if(!isDrawing){
      return;
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    
  }

  return (<canvas onMouseDown={startDrawing}
    onMouseDown={finishDrawing}
    onMouseDown={draw}
    ref={canvasRef}
    />
  );
}
