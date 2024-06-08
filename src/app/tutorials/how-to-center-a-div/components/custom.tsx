"use client"
import React, { useState } from "react"

const Custom: React.FC = () => {
  const [width, setWidth] = useState(50)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(event.target.value))
  }

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-4">CSS Code</h2>
          <pre className="bg-gray-100 p-4 rounded-md">
            <code className="hljs language-css">{`
.item {
  width: ${width}%;
  margin: 0 auto;
  background-color: lightblue;
}

            `}</code>
          </pre>
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Interactive CSS Width Slider</h2>
          <input
            type="range"
            min="0"
            max="100"
            value={width}
            onChange={handleSliderChange}
            className="w-full mb-4"
            aria-label="Slider"
          />
          <div
            className="bg-blue-300 p-10 mx-auto transition-all duration-300 ease-in-out"
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Custom
