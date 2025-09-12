import App from './App';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import colors from 'colors';
import { Server } from 'http';

let server: Server | undefined;

async function main(): Promise<void> {
  try {
    const app = new App();
    const { PORT, IP_ADDRESS, NODE_ENV } = config;

    logger.info(colors.green('🚀 Starting server...'));
    logger.info(colors.blue(`🌐 Environment: ${NODE_ENV}`));

    server = app.app.listen(PORT, IP_ADDRESS, () => {
      logger.info(colors.yellow(`✅ Server running on http://${IP_ADDRESS}:${PORT}`));
      logger.info(colors.cyan(`🔗 Local access: http://localhost:${PORT}`));
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    errorLogger.error(colors.red('❌ Failed to start server:'), error);
    process.exit(1);
  }
}

function gracefulShutdown(signal: string): void { // ✅ type added
  logger.info(colors.magenta(`\n📶 Received ${signal}. Gracefully shutting down...`));

  if (server) {
    server.close(() => {
      logger.info(colors.green('✅ HTTP server closed.'));
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      logger.error(colors.red('⏰ Force closing server...'));
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  errorLogger.error(colors.red('⚠️ Uncaught Exception:'), error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  errorLogger.error(colors.red('⚠️ Unhandled Rejection at:'), promise);
  gracefulShutdown('unhandledRejection');
});

// Start the application
main().catch((error) => {
  errorLogger.error(colors.red('❌ Unhandled error in main function:'), error);
  process.exit(1);
});
