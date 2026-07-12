import { useParams, Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Video } from "@shelflife/shared";
import { useVideos } from "../../videos/hooks/useVideos";
import { useProductAnalytics } from "../hooks/useAnalytics";
import EmptyState from "../../../components/EmptyState";
import ErrorState from "../../../components/ErrorState";

const VIEWS_COLOR = "#2a78d6";
const CLICKS_COLOR = "#1baf7a";

function formatCTR(views: number, clicks: number): string {
  // Handles zero views, negative inputs, or invalid data types
  if (!views || views <= 0 || !clicks || clicks < 0) {
    return "—";
  }
  
  // Calculates percentage and caps it at 100% to handle tracking errors
  const rawCTR = (clicks / views) * 100;
  const safeCTR = Math.min(rawCTR, 100);
  
  return `${safeCTR.toFixed(1)}%`;
}


function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default function ProductAnalyticsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: summary,
    isLoading: isSummaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useProductAnalytics(id!);
  const {
    data: videos,
    isLoading: isVideosLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useVideos(id!);

  if (isSummaryLoading || isVideosLoading)
    return <h2 className="text-gray-600">Loading...</h2>;
  if (summaryError || videosError || !summary)
    return (
      <ErrorState
        message="Couldn't load analytics."
        onRetry={() => {
          refetchSummary();
          refetchVideos();
        }}
      />
    );

  const chartData = (videos ?? []).map((video: Video) => ({
    title: video.title,
    views: video.views,
    clicks: video.clicks,
  }));

  return (
    <div>
      <Link
        to={`/products/${id}`}
        className="text-sm text-indigo-600 hover:underline"
      >
        {"<-"} Back to Product
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-gray-900">Analytics</h1>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Total Views" value={summary.totalViews.toLocaleString()} />
        <StatTile label="Total Clicks" value={summary.totalClicks.toLocaleString()} />
        <StatTile
          label="CTR"
          value={formatCTR(summary.totalViews, summary.totalClicks)}
        />
        <StatTile label="Videos" value={summary.videoCount.toLocaleString()} />
      </div>

      {chartData.length === 0 ? (
        <EmptyState
          title="No videos yet"
          description="Add a video to start tracking views and clicks."
        />
      ) : (
        <>
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Views &amp; Clicks by Video
            </h2>
            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={2}>
                  <CartesianGrid
                    vertical={false}
                    stroke="#e1e0d9"
                    strokeDasharray="0"
                  />
                  <XAxis
                    dataKey="title"
                    tick={{ fill: "#898781", fontSize: 12 }}
                    axisLine={{ stroke: "#c3c2b7" }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "#898781", fontSize: 12 }}
                    axisLine={{ stroke: "#c3c2b7" }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      borderColor: "#e1e0d9",
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#52514e" }} />
                  <Bar
                    dataKey="views"
                    name="Views"
                    fill={VIEWS_COLOR}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  />
                  <Bar
                    dataKey="clicks"
                    name="Clicks"
                    fill={CLICKS_COLOR}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-120 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Video</th>
                  <th className="px-4 py-2 font-medium">Views</th>
                  <th className="px-4 py-2 font-medium">Clicks</th>
                  <th className="px-4 py-2 font-medium">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {videos!.map((video: Video) => (
                  <tr key={video.id}>
                    <td className="px-4 py-2 text-gray-900">{video.title}</td>
                    <td className="px-4 py-2 text-gray-700">{video.views}</td>
                    <td className="px-4 py-2 text-gray-700">{video.clicks}</td>
                    <td className="px-4 py-2 text-gray-700">
                      {formatCTR(video.views, video.clicks)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
