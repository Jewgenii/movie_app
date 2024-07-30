const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const envConfig = {
  userName: process.env.USER_NAME,
  password: process.env.PASSWORD,
  apiKey: process.env.API_KEY,
  apiAuthToken: process.env.API_AUTH_TOKEN
};

const targetFolder = './src/environments';
const targetPath = path.join(targetFolder, 'environment.ts');

const envFileContent = `
  export const environment = ${JSON.stringify(envConfig, null, 2)};
`;

// Check if the target folder exists, create it if it doesn't
if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder, { recursive: true });
}

fs.writeFileSync(targetPath, envFileContent);
