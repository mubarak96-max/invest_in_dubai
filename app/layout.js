import "./globals.css";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";

export const metadata = {
  title: "Invest In Dubai Real Estate",
  description: "Invest in Dubai real estate with our expert property listings and market insights. Find luxury homes, off-plan projects, and high ROI opportunities today",
  verification: {
    google: "Zz9WHl_28IaDuvbcMQLp2Tbkfs8GzeOE2Qe1LmimCj8",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
