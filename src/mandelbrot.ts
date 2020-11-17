export interface AxisSegment {
    start: number
    end: number
    countPixels: number
}

export class Mandelbrot {
    static calculate(x: AxisSegment, y: AxisSegment, putPixel: (x: number, y: number, color: string) => void): number {
        const t = performance.now()

        for (let i = 0; i < x.countPixels; i++) {
            const xCoordinate = Mandelbrot.getCoordinateOfNthPixelInSegment(i, x)
            for (let j = 0; j < y.countPixels; j++) {
                const yCoordinate = Mandelbrot.getCoordinateOfNthPixelInSegment(j, y)
                const hue = Mandelbrot.getHueOfCoordinate(xCoordinate, yCoordinate, 100)
                const color = `hsl(${hue}, 100%, 50%)`

                putPixel(i, j, `hsl(${(i * 75)%360}, 100%, ${j %100}%)`)
            }
        }

        return performance.now() - t
    }

    static getCoordinateOfNthPixelInSegment(n: number, segment: AxisSegment): number {
        const length = segment.end - segment.start
        const lengthPerPixel = length / segment.countPixels
        return segment.start + lengthPerPixel * n
    }

    static getSurvivedIterationsInPercent(x0: number, y0: number, maxIterations: number): number {
        let x = 0.0
        let y = 0.0
        let iteration = 0
        let xTemp = 0

        while (x*x + y*y <= 4 && iteration < maxIterations) {
            xTemp = x*x - y*y + x0
            y = 2*x*y + y0
            x = xTemp
            iteration += 1
        }

        return iteration / maxIterations
    }

    static getHueOfCoordinate(x: number, y: number, maxIterations: number): number {
        // const percent = Mandelbrot.getSurvivedIterationsInPercent(x, y, maxIterations)
        // return 360 * percent

        return (x *1000) % 2 === 0 ? 0 : 160
    }
}