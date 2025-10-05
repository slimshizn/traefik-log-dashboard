import * as React from "react"
import { cn } from "@/lib/utils"

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
}

const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ className, title, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm p-6",
        className
      )}
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-4">
          {icon}
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  )
)
DashboardCard.displayName = "DashboardCard"

export default DashboardCard