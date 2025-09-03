import "./globals.css";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata = {
  title: "Invest In Dubai Real Estate",
  description: "Invest in Dubai real estate with our expert property listings and market insights. Find luxury homes, off-plan projects, and high ROI opportunities today",
  verification: {
    google: "Zz9WHl_28IaDuvbcMQLp2Tbkfs8GzeOE2Qe1LmimCj8",
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <Navbar />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
