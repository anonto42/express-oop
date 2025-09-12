import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// Validate and parse configuration
const validateConfig = () => {
  const port = Number(process.env.PORT) || 3000;
  const ipAddress = process.env.IP_ADDRESS || '0.0.0.0';
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Port validation
  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: ${port}. Must be between 1 and 65535.`);
  }

  // Environment validation
  const validEnvironments = ['development', 'production', 'test'];
  if (!validEnvironments.includes(nodeEnv)) {
    throw new Error(`Invalid NODE_ENV: ${nodeEnv}. Must be one of: ${validEnvironments.join(', ')}`);
  }

  return { port, ipAddress, nodeEnv };
};

const { port, ipAddress, nodeEnv } = validateConfig();

export default {
  PORT: port,
  IP_ADDRESS: ipAddress,
  NODE_ENV: nodeEnv,
  
};