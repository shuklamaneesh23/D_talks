import { Inter } from "next/font/google";
import "./globals.css";
import UserContextProvider from "@/context/UserContextProvider";
import Navbar from "@/components/UI/navbar";
import Footer from "@/components/UI/footer";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <ToastContainer />
          {children}
          <Footer />
          <footer className="pb-4  flex items-center bg-gray-600 justify-center">
            <Link href="https://github.com/shuklamaneesh23">
              <p className="text-center text-white">
                Copyright &#169; 2024 Maneesh Shukla. All Rights Reserved.
              </p>
            </Link>
          </footer>
        </UserContextProvider>
      </body>
    </html>
  );
}
