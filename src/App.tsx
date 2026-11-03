import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CarWash from "./pages/CarWash";
import CarSales from "./pages/CarSales";
import CarRentals from "./pages/CarRentals";
import RentalDetail from "./pages/RentalDetail";
import RentalPay from "./pages/RentalPay";
import RentalContractSign from "./pages/RentalContractSign";
import PartsGate from "./pages/parts/PartsGate";
import PartsList from "./pages/parts/PartsList";
import PartDetail from "./pages/parts/PartDetail";
import PartsOrder from "./pages/parts/PartsOrder";
import PartsInvoicePage from "./pages/parts/PartsInvoicePage";
import PartsSheet from "./pages/parts/PartsSheet";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PixelPageViews from "./components/PixelPageViews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PixelPageViews />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/car-wash" element={<CarWash />} />
            <Route path="/car-sales" element={<CarSales />} />
            <Route path="/car-rentals" element={<CarRentals />} />
            <Route path="/car-rentals/pay/:token" element={<RentalPay />} />
            <Route path="/car-rentals/contract/:token" element={<RentalContractSign />} />
            <Route path="/car-rentals/:slug" element={<RentalDetail />} />
            <Route path="/parts" element={<PartsGate />} />
            <Route path="/parts/list" element={<PartsList />} />
            <Route path="/parts/order" element={<PartsOrder />} />
            <Route path="/parts/sheet" element={<PartsSheet />} />
            <Route path="/parts/invoice/:number" element={<PartsInvoicePage />} />
            <Route path="/parts/:slug" element={<PartDetail />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
