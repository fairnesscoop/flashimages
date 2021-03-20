module.exports = {
  apps: [
    {
      name: 'Photoschool client',
      script: './__sapper__/build',
      instances: 2,
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'production',
        PORT: '3001'
      }
    }
  ]
};
