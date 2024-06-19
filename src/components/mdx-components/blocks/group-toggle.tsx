"use client"
import { Slider } from "@/components/ui/slider"
import { useContainerContext } from "./component-group"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function GroupToggle({ title = "Title", groupValueName }: { title?: string; groupValueName: string }) {
  const { getStateValueByName, getSetterByName } = useContainerContext()

  const checked = getStateValueByName(groupValueName)
  const setChecked = getSetterByName(groupValueName)

  return (
    <div className="flex justify-center space-x-2">
      <Switch id="airplane-mode" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="airplane-mode">{title}</Label>
    </div>
  )
}
