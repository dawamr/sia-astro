import StatCard, { StatGrid } from '@components/ui/StatCard';
import { Users, Briefcase, BookOpen, CheckCircle } from 'lucide-react';

export default function DashboardStats() {
  return (
    <StatGrid columns={4}>
      {/* Total Students */}
      <StatCard
        title="Total Students"
        value="1,284"
        color="primary"
        icon={<Users className="w-6 h-6" />}
        trend={{
          value: '12%',
          direction: 'up',
          label: 'vs last month',
        }}
      />

      {/* Active Teachers */}
      <StatCard
        title="Active Teachers"
        value="87"
        color="secondary"
        icon={<Briefcase className="w-6 h-6" />}
        trend={{
          value: '+4 new',
          direction: 'up',
          label: 'this month',
        }}
      />

      {/* Active Classes */}
      <StatCard
        title="Active Classes"
        value="42"
        color="accent"
        icon={<BookOpen className="w-6 h-6" />}
        trend={{
          value: '8 grades',
          direction: 'neutral',
          label: 'total',
        }}
      />

      {/* Attendance Rate */}
      <StatCard
        title="Attendance"
        value="94%"
        color="success"
        icon={<CheckCircle className="w-6 h-6" />}
        subtitle="Today's rate"
      />
    </StatGrid>
  );
}
