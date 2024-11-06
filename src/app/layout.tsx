import type { Metadata } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const openSans = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

const raleWay = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Seventh-Day Adventist Church, Ogba  | E-Bulletin ",
  description: "Stay Updated Globally & Remain Blessed",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${(openSans.className, raleWay.className)}"light "`}
    >
      <body className="text-black bg-white dark:bg-slate-700 font-opensans">
        <ToastContainer />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(c,l,a,r,i,t,y){
                    c[a] = c[a] || function () { (c[a].q = c[a].q || 
                    []).push(arguments) };
                    t=l.createElement(r);
                    t.async=1;
                    t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];
                    y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "luhx15s7jw");`,
          }}
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9GEWGN64DL"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-9GEWGN64DL');
            `,
          }}
        />
      </body>
      {/* OgbachurchAWS94! */}
    </html>
  );
}
