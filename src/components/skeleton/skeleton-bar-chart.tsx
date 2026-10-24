import { Box } from "../box"
import { Card } from "../card"
import { Skeleton } from "."

export function SkeletonBarChart() {
  return (
    <Card>
      <Box className="h-40 flex-row justify-between gap-4">
        <Skeleton className="w-10 rounded" />
        <Skeleton className="w-10 rounded" />
        <Skeleton className="w-10 rounded" />
        <Skeleton className="w-10 rounded" />
        <Skeleton className="w-10 rounded" />
        <Skeleton className="w-10 rounded" />
        <Skeleton className="w-10 rounded" />
      </Box>
    </Card>
  )
}
