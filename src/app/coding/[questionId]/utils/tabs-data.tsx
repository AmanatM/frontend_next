import { Database, FileText, Lightbulb, PanelTop, SquareChevronRight } from 'lucide-react'

export const browserTabs = [
  {
    value: 'browser',
    label: 'Browser',
    icon: <PanelTop size={15} />,
  },
  // {
  //   value: 'console',
  //   label: 'Console',
  //   icon: <SquareChevronRight size={15} />,
  // },
]

export const descriptionTabs = [
  {
    value: 'description',
    label: 'Description',
    icon: <FileText size={15} />,
  },
  {
    value: 'solution',
    label: 'Solution',
    icon: <Lightbulb size={15} />,
  },
  {
    value: 'saved_code',
    label: 'Saved Code',
    icon: <Database size={14} />,
  },
]
