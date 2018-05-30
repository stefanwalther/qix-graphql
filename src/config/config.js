module.exports = {
  HOST: process.env.HOST || 'localhost',
  PORT: 3004,
  NODE_ENV: process.env.NODE_ENV || 'development',
  QIX_HOST: process.env.QIX_HOST || 'qix',
  QIX_PORT: process.env.QIX_PORT || 9076
};
