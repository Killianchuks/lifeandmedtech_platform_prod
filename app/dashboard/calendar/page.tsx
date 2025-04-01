import { EnhancedTeamCalendar } from "@/components/dashboard/enhanced-team-calendar"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Team Calendar</h2>
        <p className="text-muted-foreground">View and manage team availability and schedule meetings</p>
      </div>

      <EnhancedTeamCalendar />
    </div>
  )
}

