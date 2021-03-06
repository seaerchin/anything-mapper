import React, { useState } from 'react'

import { Slider, Tooltip } from '@material-ui/core'

type SliderProps = {
  low: number
  high: number
  onChange: (value: number[]) => void
}

type tooltipProps = {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

const ValueLabelComponent = ({ children, open, value }: tooltipProps) => (
  <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
    {children}
  </Tooltip>
)

const RangeSlider = ({ low, high, onChange }: SliderProps) => {
  const [value, setValue] = useState<number[]>([low, high])
  const handleChange = (event: any, newValue: number[]) => {
    setValue(newValue as number[])
  }

  return (
    <Slider
      value={value}
      ValueLabelComponent={ValueLabelComponent}
      onChange={(event, newValue) => {
        const n = newValue as number[]
        handleChange(event, n)
        onChange(n)
      }}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
    />
  )
}

export { RangeSlider }
