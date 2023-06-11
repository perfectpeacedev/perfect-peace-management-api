import dotenv from "dotenv";
dotenv.config();

const config = {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mssql',
      dialectOptions: {
        options: {
          encrypt: true, // For Azure SQL Server
          // requestTimeout: 5 * 60000,
        },
        
      },
    },
    
    // Add configurations for other environments if needed
  };

  export default config;
  