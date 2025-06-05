import { Helmet } from "react-helmet-async";
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Rogue Automotive - Premium Car Wash, Sales & Rentals in Kingston</title>
        <meta name="description" content="Experience premium car care at Rogue Automotive. Professional car wash services, quality used cars for sale, and flexible car rentals in Kingston, Jamaica. Book your service today!" />
        <meta name="keywords" content="car wash Kingston, car sales Jamaica, car rentals Kingston, auto detailing, used cars Jamaica, vehicle rental Kingston" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rogueautomotiveja.com/" />
        <meta property="og:title" content="Rogue Automotive - Premium Car Wash, Sales & Rentals in Kingston" />
        <meta property="og:description" content="Experience premium car care at Rogue Automotive. Professional car wash services, quality used cars for sale, and flexible car rentals in Kingston, Jamaica. Book your service today!" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rogueautomotiveja.com/" />
        <meta property="twitter:title" content="Rogue Automotive - Premium Car Wash, Sales & Rentals in Kingston" />
        <meta property="twitter:description" content="Experience premium car care at Rogue Automotive. Professional car wash services, quality used cars for sale, and flexible car rentals in Kingston, Jamaica. Book your service today!" />
        <meta property="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Rogue Automotive" />
        <link rel="canonical" href="https://rogueautomotiveja.com/" />
      </Helmet>
      <div className="min-h-screen bg-white font-roboto">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Index;
