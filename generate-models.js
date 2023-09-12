import SequelizeAuto from 'sequelize-auto';
import config from './config/config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const auto = new SequelizeAuto(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  directory: './new-models', // Specify the directory where you want to generate the models
  caseFile: 'p', // Preserve the case of the table name (optional)
  caseModel: 'c', // Preserve the case of the model name (optional)
  caseProp: 'c', // Preserve the case of the property names (optional)
});

auto.run((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Models generated successfully!');
  }
});
