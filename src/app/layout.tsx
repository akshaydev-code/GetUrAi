import type { Metadata } from "next";

import "./globals.css";

import { ChatProvider } from "@/components/providers/ChatProvider";

import {
  APP_NAME,
  APP_DESCRIPTION,
} from "@/lib/constants";



export const metadata: Metadata = {

  title: APP_NAME,

  description: APP_DESCRIPTION,
  icons: {
    icon: "/Favicon.png",
  },

};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en">

      <body>

        <ChatProvider>

          {children}

        </ChatProvider>


      </body>

    </html>

  );

}