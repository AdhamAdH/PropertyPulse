import "@/assets/styles/globals.css";
import "photoswipe/dist/photoswipe.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AuthProvider from "@/components/authProvider";
import { GlobalProvider } from "@/context/GlobalContext";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "propertyPulse | Find The Perfect Rental",
  description: "Find The Perfect Rental",
  keywords: "property, rental, find",
};

const Layout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};
export default Layout;
