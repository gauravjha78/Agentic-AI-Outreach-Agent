
import './globals.css';
import "@/styles/global.css";
import { Inter, Space_Grotesk } from 'next/font/google';
import ChatBot from "@/components/chatbot";
import Footer from './footer/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>{children}
        
        <Footer/>
        <ChatBot/>
        
        
      </body>
    </html>
  );
}