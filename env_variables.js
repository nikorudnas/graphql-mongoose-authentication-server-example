// Prod
export const production = {
  DATABASE_URI: 'mongodb://localhost:27017/graphql-demo',
  PORT: 4000,
  SESSION_SECRET: 'SuperSecret2019',
  NODE_ENV: 'production',
};

// Dev
export const development = {
  DATABASE_URI: 'mongodb://localhost:27017/graphql-demo',
  PORT: 4000,
  SESSION_SECRET: 'SuperSecret2019',
  NODE_ENV: 'development',
};

// Docker
export const docker = {
  DATABASE_URI: 'mongodb://mongo:27017/graphql-demo',
  PORT: 4000,
  SESSION_SECRET: 'SuperSecret2019',
  NODE_ENV: 'docker',
};
