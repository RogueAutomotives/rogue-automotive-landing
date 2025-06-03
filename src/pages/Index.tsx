import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Car, Sparkles, Key, Shield, Clock, MapPin, Star, Check } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const services = [
    {
      icon: <Sparkles className="h-8 w-8 text-rogue-maroon" />,
      title: "Car Wash",
      description: "Premium hand wash and detailing services that make your vehicle shine like new.",
      features: ["Hand wash & wax", "Interior detailing", "Engine cleaning", "Paint protection"],
      cta: "Book a Car Wash"
    },
    {
      icon: <Car className="h-8 w-8 text-rogue-maroon" />,
      title: "Car Sales",
      description: "Carefully selected vehicles, inspected and ready for the road.",
      features: ["Quality guaranteed", "Fair pricing", "Financing options", "Trade-ins welcome"],
      cta: "Browse Cars for Sale"
    },
    {
      icon: <Key className="h-8 w-8 text-rogue-maroon" />,
      title: "Car Rentals",
      description: "Flexible and affordable car rental options for any occasion.",
      features: ["Daily & weekly rates", "Insurance included", "24/7 support", "Multiple locations"],
      cta: "Rent a Vehicle"
    }
  ];

  const whyChooseUs = [
    { icon: <Shield className="h-6 w-6" />, title: "Trusted by hundreds", description: "Over 500+ satisfied customers" },
    { icon: <Clock className="h-6 w-6" />, title: "Fast & reliable service", description: "Quick turnaround times" },
    { icon: <Star className="h-6 w-6" />, title: "Competitive pricing", description: "Best value in the area" },
    { icon: <MapPin className="h-6 w-6" />, title: "Convenient location", description: "Easy access and parking" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Exceptional service! My car has never looked better. The team at Rogue Automotive really knows what they're doing."
    },
    {
      name: "Mike Rodriguez",
      rating: 5,
      text: "Bought my dream car here and the process was seamless. Great selection and honest pricing."
    },
    {
      name: "Emma Chen",
      rating: 5,
      text: "Rented a car for my vacation and it was perfect. Clean, reliable, and great customer service."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-roboto">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-rogue-dark via-rogue-charcoal to-rogue-maroon overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-rogue-silver rounded-full"></div>
        </div>
        
        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <img 
              src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png" 
              alt="Rogue Automotive Logo" 
              className="h-16 w-auto animate-fade-in"
            />
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white hover:text-rogue-silver transition-colors">Services</a>
              <a href="#about" className="text-white hover:text-rogue-silver transition-colors">About</a>
              <a href="#contact" className="text-white hover:text-rogue-silver transition-colors">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 flex items-center min-h-[80vh]">
          <div className="max-w-3xl animate-slide-in-left">
            <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-white mb-6 leading-tight">
              Drive Clean.<br />
              Drive Bold.<br />
              <span className="text-rogue-silver">Drive Rogue.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-rogue-silver mb-8 max-w-2xl">
              Car Wash | Car Sales | Car Rentals – All in One Place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-rogue-maroon hover:bg-rogue-maroon/90 text-white border-0 px-8 py-6 text-lg font-montserrat font-semibold">
                Book a Car Wash
              </Button>
              <Button size="lg" className="bg-white hover:bg-gray-100 text-rogue-dark border-0 px-8 py-6 text-lg font-montserrat font-semibold">
                Browse Cars for Sale
              </Button>
              <Button size="lg" className="bg-rogue-silver hover:bg-rogue-silver/90 text-rogue-dark border-0 px-8 py-6 text-lg font-montserrat font-semibold">
                Rent a Vehicle
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-rogue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-8">
              About Rogue Automotive
            </h2>
            <p className="text-lg md:text-xl text-rogue-charcoal leading-relaxed mb-8">
              At Rogue Automotive, we're passionate about cars and dedicated to providing exceptional service. 
              Whether you need a premium car wash, are looking for your next vehicle, or require a reliable rental, 
              we're here to exceed your expectations. Our commitment to quality and customer satisfaction drives 
              everything we do.
            </p>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-rogue-maroon border-rogue-maroon px-6 py-2 text-lg">
                Your Automotive Partner Since 2020
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-6">
              Our Services
            </h2>
            <p className="text-xl text-rogue-charcoal max-w-3xl mx-auto">
              From keeping your car pristine to finding your perfect vehicle, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-rogue-light rounded-full w-fit group-hover:bg-rogue-maroon/10 transition-colors">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-montserrat font-bold text-rogue-dark">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-rogue-charcoal">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-rogue-charcoal">
                        <Check className="h-4 w-4 text-rogue-maroon mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-rogue-maroon hover:bg-rogue-maroon/90 text-white font-montserrat font-semibold">
                    {service.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-rogue-dark text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              Why Choose Rogue?
            </h2>
            <p className="text-xl text-rogue-silver max-w-3xl mx-auto">
              We're committed to delivering exceptional value and service in everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto mb-4 p-4 bg-rogue-maroon rounded-full w-fit group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-montserrat font-bold mb-2">{item.title}</h3>
                <p className="text-rogue-silver">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-rogue-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-6">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-rogue-charcoal mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-montserrat font-semibold text-rogue-dark">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-6">
                Get In Touch
              </h2>
              <p className="text-xl text-rogue-charcoal">
                Ready to experience the Rogue difference? Contact us today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-montserrat font-bold text-rogue-dark">
                    Send us a message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="border-rogue-silver focus:border-rogue-maroon"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="border-rogue-silver focus:border-rogue-maroon"
                        required
                      />
                    </div>
                    <div>
                      <Select onValueChange={(value) => setFormData({...formData, service: value})}>
                        <SelectTrigger className="border-rogue-silver focus:border-rogue-maroon">
                          <SelectValue placeholder="Service Interested In" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car-wash">Car Wash</SelectItem>
                          <SelectItem value="car-sales">Car Sales</SelectItem>
                          <SelectItem value="car-rentals">Car Rentals</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="border-rogue-silver focus:border-rogue-maroon min-h-[120px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-rogue-maroon hover:bg-rogue-maroon/90 text-white font-montserrat font-semibold py-6">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map and Info */}
              <div className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-montserrat font-bold text-rogue-dark mb-4">Visit Us</h3>
                    <div className="space-y-3 text-rogue-charcoal">
                      <p><strong>Address:</strong> 123 Auto Drive, Car City, CC 12345</p>
                      <p><strong>Phone:</strong> (555) 123-ROGUE</p>
                      <p><strong>Email:</strong> info@rogueautomotive.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-montserrat font-bold text-rogue-dark mb-4">Business Hours</h3>
                    <div className="space-y-2 text-rogue-charcoal">
                      <p><strong>Monday - Friday:</strong> 8:00 AM - 7:00 PM</p>
                      <p><strong>Saturday:</strong> 9:00 AM - 6:00 PM</p>
                      <p><strong>Sunday:</strong> 10:00 AM - 4:00 PM</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <div className="bg-rogue-light rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-rogue-charcoal">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Google Maps integration would go here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rogue-dark text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png" 
                alt="Rogue Automotive Logo" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-rogue-silver">
                Your trusted automotive partner for wash, sales, and rentals.
              </p>
            </div>
            
            <div>
              <h4 className="font-montserrat font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-rogue-silver">
                <li><a href="#" className="hover:text-white transition-colors">Car Wash</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Car Sales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Car Rentals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Detailing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-montserrat font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-rogue-silver">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-montserrat font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-rogue-silver">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-rogue-charcoal mt-8 pt-8 text-center text-rogue-silver">
            <p>&copy; 2024 Rogue Automotive. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
