import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

// Cargo variables del .env
dotenvConfig({ path: '.env' });

// Configuracion Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Exporto instancia de cloudinary configurada
export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useValue: cloudinary,
};