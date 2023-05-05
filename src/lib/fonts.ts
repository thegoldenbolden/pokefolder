import { Montserrat, Passion_One } from 'next/font/google';

export const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const passion = Passion_One({
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-passion',
  subsets: ['latin'],
});
