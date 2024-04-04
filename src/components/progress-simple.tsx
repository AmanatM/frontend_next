import { Card } from './ui/card'
import { Progress } from './ui/progress'

const mockData = [
  {
    title: 'HTML & CSS',
    completed: 22,
    totalAmount: 89,
  },
  {
    title: 'JavaScript',
    completed: 80,
    totalAmount: 120,
  },
  {
    title: 'Other',
    completed: 0,
    totalAmount: 32,
  },
]

function ProgressSimple() {
  return (
    <Card className="grid md:grid-cols-3 grid-cols-1 gap-y-6 gap-x-6 px-6 py-4">
      {mockData.map((data, index) => (
        <div key={index} className="grid grid-row gap-y-2">
          <p className="text-sm font-medium mb-2">{data.title}</p>
          <div className="flex flex-column items-center gap-x-4">
            <Progress value={Math.floor((data.completed / data.totalAmount) * 100)} />
            <p className="text-sm">{Math.floor((data.completed / data.totalAmount) * 100)}%</p>
          </div>

          <p className="text-muted-foreground text-xs">
            <span className="text-primary font-bold">{data.completed}</span>/{data.totalAmount} completed
          </p>
        </div>
      ))}
    </Card>
  )
}

export default ProgressSimple
