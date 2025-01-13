import { Card, CardContent } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"

export function ProductSkeleton() {
  return (
    <Card className="shadow-md">
      <Skeleton className="h-48 w-full rounded-t-lg" />
      <CardContent className="p-4">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  )
}
