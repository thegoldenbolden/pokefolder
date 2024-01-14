import { Rubik, Bungee } from 'next/font/google';

export const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const bungee = Bungee({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-bungee',
});
