/**
 * PM2 进程配置
 * 使用: pm2 start ecosystem.config.cjs --env production
 *
 * Google Analytics：NEXT_PUBLIC_GA_ID 在 next build 时被内联，必须在构建前设置。
 * 部署流程：先配置 .env.production（可复制 .env.production.example）再执行 npm run build，最后 pm2 start。
 */
module.exports = {
  apps: [
    {
      name: "exifstrip",
      script: "node_modules/.bin/next",
      args: "start -p 3010",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
