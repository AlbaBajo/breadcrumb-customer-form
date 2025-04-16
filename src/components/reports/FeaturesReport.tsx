
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeaturesReportProps {
  data?: {
    sourcesDistribution: Record<string, number>;
    sourceFormatDistribution: Record<string, number>;
    etlToolsDistribution: Record<string, number>;
  };
  isLoading: boolean;
}

const FeaturesReport = ({ data, isLoading }: FeaturesReportProps) => {
  // Prepare data for sources distribution chart
  const sourcesData = data ? 
    Object.entries(data.sourcesDistribution).map(([name, value]) => ({ name, value })) : 
    [];
  
  // Prepare data for source format distribution chart
  const formatData = data ? 
    Object.entries(data.sourceFormatDistribution).map(([name, value]) => ({ name, value })) : 
    [];

  const COLORS = ['#33C3F0', '#7E69AB', '#6E59A5', '#D6BCFA', '#8E9196'];

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading reports...</div>
  }

  if (!data) {
    return <div className="flex justify-center items-center h-64">No feature data available</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-md">Data Source Types</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {sourcesData.length > 0 ? (
            <ChartContainer config={{}} className="h-full">
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">No source data available</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">Source Format Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {formatData.length > 0 ? (
            <ChartContainer config={{}} className="h-full">
              <BarChart data={formatData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#33C3F0" />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">No format data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesReport;
