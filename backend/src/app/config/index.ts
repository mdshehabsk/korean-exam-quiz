import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,

  port: process.env.PORT,

  database_URL: process.env.DATABASE_URL,

  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,

  cookie_secret: process.env.COOKIE_SECRET,
  cookie_expire: process.env.COOKIE_EXPIER,

  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_endpoint_secret: process.env.STRIPE_ENDPOINT_SECRET,

  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_region: process.env.AWS_REGION,
  aws_bucket_name: process.env.AWS_BUCKET_NAME,

  live_url: process.env.LIVE_URL,
  local_url: process.env.LOCAL_URL,
  base_url : process.env.BASE_URL,
  backend_url : process.env.BACKEND_URL
};
