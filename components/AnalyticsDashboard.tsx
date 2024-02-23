"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

interface AnalyticsDashboardProps {
  avgVisitorsperDay: string;
  amtVisitorsToday: number;
  timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
  cvdownloadsToday: number;
  cvdownloadsThisWeek: number;
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  const positiveClassName = "bg-green-900/25 text-green-400 ring-green-400/25";
  const neutralClassName = "bg-zinc-900/25 text-zinc-400 ring-zinc-400/25";
  const negativeClassName = "bg-red-900/25 text-red-400 ring-red-400/25";

  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive
          ? positiveClassName
          : isNeutral
          ? neutralClassName
          : negativeClassName
      }`}
    >
      {isPositive && <ArrowUpRight className="h-3 w-3" />}
      {isNeutral && <ArrowRight className="h-3 w-3" />}
      {isNegative && <ArrowDownRight className="h-3 w-3" />}
      {percentage.toFixed(0)}%
    </span>
  );
};

const AnalyticsDashboard = ({
  avgVisitorsperDay,
  amtVisitorsToday,
  timeseriesPageviews,
  topCountries,
  cvdownloadsToday,
  cvdownloadsThisWeek,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors per day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsperDay}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="flex items-center gap-2.5 text-tremor-default text-dark-tremor-content">
            Visitors today
            <Badge
              percentage={
                (amtVisitorsToday / Number(avgVisitorsperDay) - 1) * 100
              }
            />
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {amtVisitorsToday}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            CV downloads this week
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {cvdownloadsThisWeek}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            CV downloads today
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {cvdownloadsToday}
          </p>
        </Card>
      </div>
      <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
        <h2 className="w-full text-dark-tremor-content-strong text-center sm:text-left font-semibold text-xl">
          This weeks top visitors:
        </h2>
        <div className="col-span-3 flex items-center justify-between flex-wrap gap-8">
          {topCountries?.map(([countryCode, number]) => {
            return (
              <div
                key={countryCode}
                className="flex items-center gap-3 text-dark-tremor-content-strong"
              >
                <p className="hidden sm:block text-tremor-content">
                  {countryCode}
                </p>
                <ReactCountryFlag
                  className="text-5xl sm:text-3xl rounded-md"
                  svg
                  countryCode={countryCode}
                />
                <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                  {number}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
      <Card>
        {timeseriesPageviews && (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={timeseriesPageviews.map(day => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!;
              }, 0),
            }))}
            categories={["Visitors"]}
            index="name"
          />
        )}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
