import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex size-full py-3 px-3 !h-[calc(100dvh-3.5rem)] space-x-3">
      <Skeleton className="w-[100%] md:w-[30%] h-full overflow-hidden" />
      <Skeleton className="hidden md:block md:w-[40%] h-full overflow-hidden" />
      <Skeleton className="hidden md:block md:w-[30%] h-full overflow-hidden" />
    </div>
  )
}
