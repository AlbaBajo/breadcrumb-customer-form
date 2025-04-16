
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArquitecturaReport from './reports/ArquitecturaReport';
import FeaturesReport from './reports/FeaturesReport';
import AceleradoresReport from './reports/AceleradoresReport';
import { ChartPie, Layers, FileBox } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportData {
  arquitectura: {
    cloudDistribution: Record<string, number>;
    tipoLicenciaDistribution: Record<string, number>;
    tallajeDistribution: Record<string, number>;
    totalCustomers: number;
  };
  features: {
    sourcesDistribution: Record<string, number>;
    sourceFormatDistribution: Record<string, number>;
    etlToolsDistribution: Record<string, number>;
  };
  aceleradores: {
    totalArtefactos: number;
    typeDistribution: Record<string, number>;
    technologyDistribution: Record<string, number>;
    categoriesDistribution: Record<string, number>;
  };
}

const DashboardReports = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      try {
        // For web app mode, generate reports from localStorage
        const customers = localStorage.getItem("customers") 
          ? JSON.parse(localStorage.getItem("customers") as string) 
          : [];
        
        // Generate report data manually for web app
        const reports = generateLocalReports(customers);
        setReportData(reports);
        
        // For App Script environment
        if (typeof window !== 'undefined' && 
            typeof (window as any).google !== 'undefined' && 
            (window as any).google.script) {
          (window as any).google.script.run
            .withSuccessHandler((data: ReportData) => {
              setReportData(data);
              setIsLoading(false);
            })
            .withFailureHandler((error: Error) => {
              console.error("Error fetching report data:", error);
              toast({
                title: "Error fetching reports",
                description: error.message,
                variant: "destructive",
              });
              setIsLoading(false);
            })
            .generateReports();
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error generating reports:", error);
        setIsLoading(false);
      }
    };
    
    fetchReportData();
  }, [toast]);

  // Generate reports for web app mode
  const generateLocalReports = (customers: any[]): ReportData => {
    // Initialize report objects
    const reports = {
      arquitectura: {
        cloudDistribution: {},
        tipoLicenciaDistribution: {},
        tallajeDistribution: {},
        totalCustomers: customers.length
      },
      features: {
        sourcesDistribution: {},
        sourceFormatDistribution: {},
        etlToolsDistribution: {}
      },
      aceleradores: {
        totalArtefactos: 0,
        typeDistribution: {
          'Desarrollado': 0,
          'Desde Cero': 0
        },
        technologyDistribution: {},
        categoriesDistribution: {
          'Data Ingestion': 0,
          'Data Transformation DQ': 0,
          'Monitoring': 0,
          'Securitization': 0,
          'Data Modeling': 0,
          'MLOps': 0,
          'CICD': 0
        }
      }
    } as ReportData;
    
    // Process customer data for reports
    customers.forEach(customer => {
      // Arquitectura reports
      if (customer['cloud']) {
        reports.arquitectura.cloudDistribution[customer['cloud']] = 
          (reports.arquitectura.cloudDistribution[customer['cloud']] || 0) + 1;
      }
      
      if (customer['tipoLicencia']) {
        reports.arquitectura.tipoLicenciaDistribution[customer['tipoLicencia']] = 
          (reports.arquitectura.tipoLicenciaDistribution[customer['tipoLicencia']] || 0) + 1;
      }
      
      if (customer['tallaje']) {
        reports.arquitectura.tallajeDistribution[customer['tallaje']] = 
          (reports.arquitectura.tallajeDistribution[customer['tallaje']] || 0) + 1;
      }
      
      // Features reports
      if (customer['sources'] && typeof customer['sources'] === 'string') {
        const sources = customer['sources'].split(', ');
        sources.forEach(source => {
          reports.features.sourcesDistribution[source] = 
            (reports.features.sourcesDistribution[source] || 0) + 1;
        });
      }
      
      if (customer['sourceFormat']) {
        reports.features.sourceFormatDistribution[customer['sourceFormat']] = 
          (reports.features.sourceFormatDistribution[customer['sourceFormat']] || 0) + 1;
      }
      
      // Aceleradores reports
      if (customer['aceleradores'] && Array.isArray(customer['aceleradores'])) {
        const aceleradores = customer['aceleradores'];
        reports.aceleradores.totalArtefactos += aceleradores.length;
        
        aceleradores.forEach(artefacto => {
          // Count development types
          if (artefacto.desarrollo) {
            reports.aceleradores.typeDistribution[artefacto.desarrollo] = 
              (reports.aceleradores.typeDistribution[artefacto.desarrollo] || 0) + 1;
          }
          
          // Count technologies
          if (Array.isArray(artefacto.technology)) {
            artefacto.technology.forEach(tech => {
              reports.aceleradores.technologyDistribution[tech] = 
                (reports.aceleradores.technologyDistribution[tech] || 0) + 1;
            });
          }
          
          // Count categories
          if (artefacto.dataIngestion) reports.aceleradores.categoriesDistribution['Data Ingestion']++;
          if (artefacto.dataTransformation) reports.aceleradores.categoriesDistribution['Data Transformation DQ']++;
          if (artefacto.monitoring) reports.aceleradores.categoriesDistribution['Monitoring']++;
          if (artefacto.securitization) reports.aceleradores.categoriesDistribution['Securitization']++;
          if (artefacto.dataModeling) reports.aceleradores.categoriesDistribution['Data Modeling']++;
          if (artefacto.mlops) reports.aceleradores.categoriesDistribution['MLOps']++;
          if (artefacto.cicd) reports.aceleradores.categoriesDistribution['CICD']++;
        });
      }
    });
    
    return reports;
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl text-cyan-500">Customer Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="arquitectura">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="arquitectura" className="flex items-center gap-2">
              <ChartPie size={16} />
              Arquitectura
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Layers size={16} />
              Features
            </TabsTrigger>
            <TabsTrigger value="aceleradores" className="flex items-center gap-2">
              <FileBox size={16} />
              Artefactos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="arquitectura">
            <ArquitecturaReport data={reportData?.arquitectura} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="features">
            <FeaturesReport data={reportData?.features} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="aceleradores">
            <AceleradoresReport data={reportData?.aceleradores} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardReports;
