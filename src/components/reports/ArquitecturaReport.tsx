
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ArquitecturaReportProps {
  data?: {
    cloudDistribution: Record<string, number>;
    tipoLicenciaDistribution: Record<string, number>;
    tallajeDistribution: Record<string, number>;
    totalCustomers: number;
  };
  isLoading: boolean;
}

const ArquitecturaReport = ({ data, isLoading }: ArquitecturaReportProps) => {
  // Prepare data for cloud distribution chart
  const cloudData = data ? 
    Object.entries(data.cloudDistribution).map(([name, value]) => ({ name, value })) : 
    [];
  
  // Prepare data for license type distribution chart
  const licenseData = data ? 
    Object.entries(data.tipoLicenciaDistribution).map(([name, value]) => ({ name, value })) : 
    [];

  // Prepare data for tallaje distribution chart
  const tallajeData = data ? 
    Object.entries(data.tallajeDistribution).map(([name, value]) => ({ name, value })) : 
    [];

  const COLORS = ['#33C3F0', '#7E69AB', '#6E59A5', '#D6BCFA', '#8E9196'];

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading reports...</div>
  }

  if (!data) {
    return <div className="flex justify-center items-center h-64">No data available</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-md">Cloud Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {cloudData.length > 0 ? (
            <ChartContainer config={{}} className="h-full">
              <PieChart>
                <Pie
                  data={cloudData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cloudData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">No cloud data available</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">License Type Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {licenseData.length > 0 ? (
            <ChartContainer config={{}} className="h-full">
              <BarChart data={licenseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#33C3F0" />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">No license data available</div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-md">Tallaje Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {tallajeData.length > 0 ? (
            <ChartContainer config={{}} className="h-full">
              <BarChart data={tallajeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#7E69AB" />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">No tallaje data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArquitecturaReport;
