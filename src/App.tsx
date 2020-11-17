import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { StoreContext } from './store'
import styled from 'styled-components'
import { Mandelbrot, AxisSegment } from './mandelbrot'
import { observer } from 'mobx-react'

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 3%;
    display: flex;
    flex-direction: row;
    align-items: space-between;
`

const FractalsList = styled.div`
    width: 10%;
`

const FractalContainer = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const FractalCanvas = styled.canvas`
    width: 800px;
    height: 600px;
`

function drawMandelbrotFractal(): number | null {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    if (!canvas) {
        return null
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    ctx.clearRect(0, 0,  canvas.width, canvas.height)

    const xAxis: AxisSegment = {
        start: -2,
        end: 1,
        countPixels: canvas.width
    }
    const yAxis: AxisSegment = {
        start: 1,
        end: -1,
        countPixels: canvas.height
    }

    const paintPixel = (x: number, y: number, color: string) => {
        ctx.fillStyle = color
        ctx.fillRect( x, y, 1, 1)
    }

    return Mandelbrot.calculate(xAxis, yAxis, paintPixel)
}

function App() {
    const { store, uiStore } = useContext(StoreContext)

    const onClick = () => {
        const time = drawMandelbrotFractal()
        uiStore.setTimeToDrawMs(time)
    }

    return (
        <AppContainer className="App">
            <FractalsList>
                <button onClick={onClick}>draw</button>
                {uiStore.timeToDrawMs != null && <div>TTD: {Math.floor(uiStore.timeToDrawMs)} ms</div>}
                <h1>cau</h1>
                <h1>cau</h1>
                <h1>cau</h1>
                <h1>cau</h1>
                <h1>cau</h1>
            </FractalsList>
            <FractalContainer>
                <FractalCanvas id="canvas"/>
            </FractalContainer>
        </AppContainer>
    );
}

export default observer(App);

