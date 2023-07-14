import { Rubik } from 'next/font/google';
import localFont from 'next/font/local';

export const rubik = Rubik({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const bungee = localFont({
  src: './Bungee-Regular.ttf',
  display: 'swap',
  variable: '--font-bungee',
});
