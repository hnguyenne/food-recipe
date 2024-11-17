module.exports = {
  apps : [{
    name: 'recipe-api',
    instances: 4,
    script: 'server.js',
    autorestart: true,
    watch: '.',
    watch_delay: 1000,
    ignore_watch: ['node_modules','.git','*.md'],
  }],
};
