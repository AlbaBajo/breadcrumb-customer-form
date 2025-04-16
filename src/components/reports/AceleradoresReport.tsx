
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AceleradoresReportProps {
  data?: {
    totalArtefactos: number;
    typeDistribution: Record<string, number>;
    technologyDistribution: Record<string, number>;
    categoriesDistribution: Record<string, number>;
  };
  isLoading: boolean;
}

const AceleradoresReport = ({ data, isLoading }: AceleradoresReportProps) => {
  // Prepare data for technology distribution
  const technologyData = data ? 
    Object.entries(data?.technologyDistribution || {})
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5) : 
    [];
  
  // Prepare data for type distribution chart
  const typeData = data ? 
    Object.entries(data?.typeDistribution || {})
      .map(([name, value]) => ({ name, value })) : 
    [];

  // Prepare data for categories distribution chart - for radar chart
  const categoriesData = data ? 
    Object.entries(data?.categoriesDistribution || {})
      .map(([name, value]) => ({ name, value })) : 
    [];

  const COLORS = ['#33C3F0', '#7E69AB', '#6E59A5', '#D6BCFA', '#8E9196'];

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading reports...</div>
  }

  if (!data) {
    return <div className="flex justify-center items-center h-64">No artefacto data available</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-md">Development Type</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {typeData.length > 0 ? (
            <ChartContainer config={{}} className="h-full">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">No development type data available</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">Top Technologies</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {technologyData.length > 0 ? (
            <ChartContainer config={{}} className="h-full">
              <BarChart data={technologyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#33C3F0" />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">No technology data available</div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-md">Categories Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {categoriesData.length > 0 ? (
            <ChartContainer config={{}} className="h-full">
              <RadarChart outerRadius={90} data={categoriesData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="Categories" dataKey="value" stroke="#7E69AB" fill="#7E69AB" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">No category data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AceleradoresReport;
