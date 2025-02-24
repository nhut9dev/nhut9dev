import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  ...compat.plugins('prettier'),
  {
    rules: {
      semi: ['error', 'always'], // Luôn có dấu chấm phẩy
      quotes: ['error', 'single'], // Dùng dấu nháy đơn thay vì nháy kép
      'no-console': 'warn', // Cảnh báo nếu dùng console.log
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
