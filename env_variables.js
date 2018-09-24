export const production = {
  DATABASE_URI: 'mongodb://localhost:27017/graphql-demo', // To test with docker, replace 'localhost' with your computers IP (Not container IP)
  PORT: 4000,
  SESSION_SECRET: 'SuperSecret2019',
  NODE_ENV: 'production',
};
export const development = {
  DATABASE_URI: 'mongodb://localhost:27017/graphql-demo', // To test with docker, replace 'localhost' with your computers IP (Not container IP)
  PORT: 4000,
  SESSION_SECRET: 'SuperSecret2019',
  NODE_ENV: 'development',
};
