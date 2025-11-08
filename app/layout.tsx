import type { Metadata } from 'next';
import './globals.css';
import { Amiri, Poppins } from 'next/font/google';

const amiri = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-amiri' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Islamic Q&A Poster Builder',
  description: 'Design an elegant Islamic Q&A poster for Instagram Reels',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${amiri.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
