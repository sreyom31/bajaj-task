import dotenv from 'dotenv';
import path from 'path';
import z from 'zod';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  PORT: z.string().default('5000'),
  DB_URL: z
    .string()
    .startsWith('mongodb+', { message: 'Must provide a MongoDB URL' }),
});

const envVars = envSchema.safeParse(process.env);
if (!envVars.success) {
  throw new Error(
    envVars.error.issues
      .map((error) => `${error.path} ${error.message}`)
      .join('\n')
  );
}

export default {
  env: envVars.data.NODE_ENV,
  port: envVars.data.PORT,
  mongoose: {
    url:
      envVars.data.DB_URL + (envVars.data.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
    },
  },
};
