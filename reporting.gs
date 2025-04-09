
// Reporting and analytics functions

// Generate reports based on customer data
function generateReports() {
  const customers = getAllCustomers();
  
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
  };
  
  // Process customer data for reports
  customers.forEach(customer => {
    // Arquitectura reports
    if (customer['Cloud']) {
      reports.arquitectura.cloudDistribution[customer['Cloud']] = 
        (reports.arquitectura.cloudDistribution[customer['Cloud']] || 0) + 1;
    }
    
    if (customer['Tipo Licencia']) {
      reports.arquitectura.tipoLicenciaDistribution[customer['Tipo Licencia']] = 
        (reports.arquitectura.tipoLicenciaDistribution[customer['Tipo Licencia']] || 0) + 1;
    }
    
    if (customer['Tallaje']) {
      reports.arquitectura.tallajeDistribution[customer['Tallaje']] = 
        (reports.arquitectura.tallajeDistribution[customer['Tallaje']] || 0) + 1;
    }
    
    // Features reports
    if (customer['Sources'] && typeof customer['Sources'] === 'string') {
      const sources = customer['Sources'].split(', ');
      sources.forEach(source => {
        reports.features.sourcesDistribution[source] = 
          (reports.features.sourcesDistribution[source] || 0) + 1;
      });
    }
    
    if (customer['Source Format']) {
      reports.features.sourceFormatDistribution[customer['Source Format']] = 
        (reports.features.sourceFormatDistribution[customer['Source Format']] || 0) + 1;
    }
    
    // Aceleradores reports
    if (customer['Aceleradores'] && Array.isArray(customer['Aceleradores'])) {
      const aceleradores = customer['Aceleradores'];
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
}
