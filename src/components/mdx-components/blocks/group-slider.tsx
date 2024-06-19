"use client"
import { Slider } from "@/components/ui/slider"
import { useContainerContext } from "./component-group"

type GroupSliderProps = {
  title?: string
  maxValue?: number
  minValue?: number
  addPercentageSign?: boolean
  groupValueName: string
}

function GroupSlider({
  title = "Title",
  maxValue = 10,
  minValue = 1,
  addPercentageSign,
  groupValueName,
}: GroupSliderProps) {
  const { setStateValueByName, getStateValueByName } = useContainerContext()

  const sliderValue = getStateValueByName(groupValueName)

  return (
    <div className=" flex flex-col justify-center mb-6 max-w-full w-[350px] mx-auto">
      <div className="flex justify-between w-full mb-6">
        <span>{title} </span>
        <span>
          {sliderValue} {addPercentageSign && "%"}
        </span>
      </div>
      <Slider
        defaultValue={[sliderValue]}
        onValueChange={value => setStateValueByName(groupValueName, value[0])}
        min={minValue}
        max={maxValue}
      />
    </div>
  )
}

export default GroupSlider
