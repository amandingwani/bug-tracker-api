import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
export const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET || '!!PLEASE_GENERATE_A_NEW_JWT_SECRET!!';
export const AXIOM_DATASET = process.env.AXIOM_DATASET;
export const AXIOM_TOKEN = process.env.AXIOM_TOKEN;
export const AUTH_COOKIE_DOMAIN = process.env.AUTH_COOKIE_DOMAIN;
