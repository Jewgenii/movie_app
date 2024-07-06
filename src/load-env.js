// load-env.js
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envConfig = {
  userName: process.env.USER_NAME,
  password: process.env.PASSWORD,
  apiKey: process.env.API_KEY,
  apiAuthToken: process.env.API_AUTH_TOKEN
};

const targetPath = './src/environments/environment.ts';

const envFileContent = `
  export const environment = ${JSON.stringify(envConfig, null, 2)};
`;

fs.writeFileSync(targetPath, envFileContent);
