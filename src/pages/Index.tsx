
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
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-rogue-dark/90 via-rogue-charcoal/80 to-rogue-maroon/90"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border border-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-rogue-silver rounded-full animate-pulse delay-500"></div>
        </div>
        
        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <img 
              src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png" 
              alt="Rogue Automotive Logo" 
              className="h-16 w-auto animate-fade-in transition-transform duration-300 hover:scale-110"
            />
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white hover:text-rogue-silver transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-rogue-silver after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Services</a>
              <a href="#about" className="text-white hover:text-rogue-silver transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-rogue-silver after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">About</a>
              <a href="#contact" className="text-white hover:text-rogue-silver transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-rogue-silver after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Contact</a>
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
            
            <p className="text-xl md:text-2xl text-rogue-silver mb-8 max-w-2xl animate-fade-in animation-delay-500">
              Car Wash | Car Sales | Car Rentals – All in One Place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in animation-delay-1000">
              <Button size="lg" className="bg-rogue-maroon hover:bg-rogue-maroon/90 text-white border-0 px-8 py-6 text-lg font-montserrat font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rogue-maroon/50">
                Book a Car Wash
              </Button>
              <Button size="lg" className="bg-white hover:bg-gray-100 text-rogue-dark border-0 px-8 py-6 text-lg font-montserrat font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Browse Cars for Sale
              </Button>
              <Button size="lg" className="bg-rogue-silver hover:bg-rogue-silver/90 text-rogue-dark border-0 px-8 py-6 text-lg font-montserrat font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Rent a Vehicle
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center transition-opacity duration-300 hover:opacity-70 cursor-pointer">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-rogue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-8 animate-fade-in">
              About Rogue Automotive
            </h2>
            <p className="text-lg md:text-xl text-rogue-charcoal leading-relaxed mb-8 animate-fade-in animation-delay-300">
              At Rogue Automotive, we're passionate about cars and dedicated to providing exceptional service. 
              Whether you need a premium car wash, are looking for your next vehicle, or require a reliable rental, 
              we're here to exceed your expectations. Our commitment to quality and customer satisfaction drives 
              everything we do.
            </p>
            <div className="flex justify-center animate-fade-in animation-delay-500">
              <Badge variant="outline" className="text-rogue-maroon border-rogue-maroon px-6 py-2 text-lg transition-all duration-300 hover:bg-rogue-maroon hover:text-white hover:scale-105">
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
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-6 animate-fade-in">
              Our Services
            </h2>
            <p className="text-xl text-rogue-charcoal max-w-3xl mx-auto animate-fade-in animation-delay-300">
              From keeping your car pristine to finding your perfect vehicle, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:scale-105 hover:-translate-y-2 animate-fade-in cursor-pointer`} style={{animationDelay: `${index * 200}ms`}}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-rogue-light rounded-full w-fit group-hover:bg-rogue-maroon/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-montserrat font-bold text-rogue-dark transition-colors duration-300 group-hover:text-rogue-maroon">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-rogue-charcoal">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-rogue-charcoal transition-all duration-300 group-hover:translate-x-2">
                        <Check className="h-4 w-4 text-rogue-maroon mr-2 transition-transform duration-300 group-hover:scale-125" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-rogue-maroon hover:bg-rogue-maroon/90 text-white font-montserrat font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rogue-maroon/30">
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
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 animate-fade-in">
              Why Choose Rogue?
            </h2>
            <p className="text-xl text-rogue-silver max-w-3xl mx-auto animate-fade-in animation-delay-300">
              We're committed to delivering exceptional value and service in everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className={`text-center group animate-fade-in hover:scale-105 transition-all duration-500 cursor-pointer`} style={{animationDelay: `${index * 150}ms`}}>
                <div className="mx-auto mb-4 p-4 bg-rogue-maroon rounded-full w-fit group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-rogue-maroon/50">
                  {item.icon}
                </div>
                <h3 className="text-xl font-montserrat font-bold mb-2 transition-colors duration-300 group-hover:text-rogue-silver">{item.title}</h3>
                <p className="text-rogue-silver transition-all duration-300 group-hover:text-white">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-rogue-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-6 animate-fade-in">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`border-0 shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl animate-fade-in cursor-pointer`} style={{animationDelay: `${index * 200}ms`}}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current transition-transform duration-300 hover:scale-125" />
                    ))}
                  </div>
                  <p className="text-rogue-charcoal mb-4 italic transition-colors duration-300 hover:text-rogue-dark">"{testimonial.text}"</p>
                  <p className="font-montserrat font-semibold text-rogue-dark transition-colors duration-300 hover:text-rogue-maroon">
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
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-6 animate-fade-in">
                Get In Touch
              </h2>
              <p className="text-xl text-rogue-charcoal animate-fade-in animation-delay-300">
                Ready to experience the Rogue difference? Contact us today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-0 shadow-lg animate-fade-in animation-delay-500 transition-all duration-300 hover:shadow-xl">
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
                        className="border-rogue-silver focus:border-rogue-maroon transition-all duration-300 focus:scale-105"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="border-rogue-silver focus:border-rogue-maroon transition-all duration-300 focus:scale-105"
                        required
                      />
                    </div>
                    <div>
                      <Select onValueChange={(value) => setFormData({...formData, service: value})}>
                        <SelectTrigger className="border-rogue-silver focus:border-rogue-maroon transition-all duration-300 focus:scale-105">
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
                        className="border-rogue-silver focus:border-rogue-maroon min-h-[120px] transition-all duration-300 focus:scale-105"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-rogue-maroon hover:bg-rogue-maroon/90 text-white font-montserrat font-semibold py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rogue-maroon/50">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map and Info */}
              <div className="space-y-8 animate-fade-in animation-delay-700">
                <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-montserrat font-bold text-rogue-dark mb-4">Visit Us</h3>
                    <div className="space-y-3 text-rogue-charcoal">
                      <p><strong>Address:</strong> 123 Auto Drive, Car City, CC 12345</p>
                      <p><strong>Phone:</strong> (555) 123-ROGUE</p>
                      <p><strong>Email:</strong> info@rogueautomotive.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
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
                <div className="bg-rogue-light rounded-lg h-64 flex items-center justify-center transition-all duration-300 hover:bg-rogue-silver/20 hover:scale-105 cursor-pointer">
                  <div className="text-center text-rogue-charcoal">
                    <MapPin className="h-12 w-12 mx-auto mb-2 transition-transform duration-300 hover:scale-125" />
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
            <div className="animate-fade-in">
              <img 
                src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png" 
                alt="Rogue Automotive Logo" 
                className="h-12 w-auto mb-4 transition-transform duration-300 hover:scale-110"
              />
              <p className="text-rogue-silver">
                Your trusted automotive partner for wash, sales, and rentals.
              </p>
            </div>
            
            <div className="animate-fade-in animation-delay-200">
              <h4 className="font-montserrat font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-rogue-silver">
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Wash</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Sales</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Rentals</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Detailing</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in animation-delay-400">
              <h4 className="font-montserrat font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-rogue-silver">
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Reviews</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in animation-delay-600">
              <h4 className="font-montserrat font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-rogue-silver">
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-rogue-charcoal mt-8 pt-8 text-center text-rogue-silver animate-fade-in animation-delay-800">
            <p>&copy; 2024 Rogue Automotive. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
