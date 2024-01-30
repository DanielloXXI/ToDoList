import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "../components/Header/page";
import Footer from "../components/Footer/page";
import { TaskContextProvider } from "@/contexts/TaskContext";
import { PopupContextProvider } from "@/contexts/PopupContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDoList",
  description: "ToDoList",
  // icons: {
  //   icon: '/edit3.png',
  //   shortcut: '/edit3.png',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <TaskContextProvider>
          <PopupContextProvider>
            <Header />
            {children}
            <Footer />
          </PopupContextProvider>
        </TaskContextProvider>
      </body>
    </html>
  );
}
