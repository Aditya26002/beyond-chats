import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beyondchats | Free Chatbot For Websites",
  description:
    "Beyondchats is a lead generation tool. Integrate free chatbot for website, qualify your leads & 3X your sales!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
