import colors from 'colors';

export const logger = {
  info: (message: string) => {
    console.log(colors.blue(`[INFO] ${new Date().toISOString()}: ${message}`));
  },
  error: (message: string, error?: any) => {
    console.error(colors.red(`[ERROR] ${new Date().toISOString()}: ${message}`));
    if (error) {
      console.error(colors.red(error));
    }
  },
  success: (message: string) => {
    console.log(colors.green(`[SUCCESS] ${new Date().toISOString()}: ${message}`));
  },
  warning: (message: string) => {
    console.log(colors.yellow(`[WARNING] ${new Date().toISOString()}: ${message}`));
  }
};

export const errorLogger = {
  error: (message: string, error?: any) => {
    logger.error(message, error);
  }
};