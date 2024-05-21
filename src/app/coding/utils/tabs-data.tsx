import {
  Archive,
  Database,
  FileText,
  FlaskConical,
  Lightbulb,
  LucideIcon,
  PanelTop,
  SquareChevronRight,
  TestTubeDiagonal,
} from 'lucide-react'

export type TabProps = {
  value: string
  label: string
  icon?: JSX.Element | LucideIcon | null
}

export type CustomTabsContentProps = {
  value: string
  children: React.ReactNode
  className?: string
  isActiveTab?: boolean
}

// User interface layout tabs data

export const browserTabs = [
  {
    value: 'browser',
    label: 'Browser',
    icon: <PanelTop size={15} />,
  },
  {
    value: 'console',
    label: 'Console',
    icon: <SquareChevronRight size={15} />,
  },
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

// Coding layout tabs data
export const CODE_description_tabs = [
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
    value: 'submissions',
    label: 'Submissions',
    icon: <Archive size={14} />,
  },
]

export const CODE_result_tabs = [
  {
    value: 'console',
    label: 'Console',
    icon: <SquareChevronRight size={15} />,
  },
  {
    value: 'test',
    label: 'Tests',
    icon: <FlaskConical size={15} />,
  },
]
