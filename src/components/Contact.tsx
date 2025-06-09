
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

const Contact = () => {
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

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-4 sm:mb-6 animate-fade-in">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-rogue-charcoal animate-fade-in animation-delay-300">
              Ready to experience the Rogue difference? Contact us today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg animate-fade-in animation-delay-500 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-montserrat font-bold text-rogue-dark">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="border-rogue-silver focus:border-rogue-maroon transition-all duration-300 focus:scale-105 h-10 sm:h-11"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-rogue-silver focus:border-rogue-maroon transition-all duration-300 focus:scale-105 h-10 sm:h-11"
                      required
                    />
                  </div>
                  <div>
                    <Select onValueChange={(value) => setFormData({...formData, service: value})}>
                      <SelectTrigger className="border-rogue-silver focus:border-rogue-maroon transition-all duration-300 focus:scale-105 h-10 sm:h-11">
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
                      className="border-rogue-silver focus:border-rogue-maroon min-h-[100px] sm:min-h-[120px] transition-all duration-300 focus:scale-105"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-rogue-maroon hover:bg-rogue-maroon/90 text-white font-montserrat font-semibold py-5 sm:py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rogue-maroon/50">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in animation-delay-700">
              <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-montserrat font-bold text-rogue-dark mb-3 sm:mb-4">Visit Us</h3>
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-rogue-charcoal">
                    <p><strong>Address:</strong> 17 Westminster Rd, Kingston 10, Jamaica</p>
                    <p><strong>Phone:</strong> (876) 860-5061</p>
                    <p><strong>Email:</strong> info@rogueautomotiveja.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-montserrat font-bold text-rogue-dark mb-3 sm:mb-4">Business Hours</h3>
                  <div className="space-y-2 text-sm sm:text-base text-rogue-charcoal">
                    <p><strong>Monday - Friday:</strong> 8:00 AM - 7:00 PM</p>
                    <p><strong>Saturday:</strong> 9:00 AM - 6:00 PM</p>
                    <p><strong>Sunday:</strong> 10:00 AM - 4:00 PM</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-montserrat font-bold text-rogue-dark mb-3 sm:mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rogue-maroon" />
                    Find Us
                  </h3>
                  <div className="w-full h-[250px] sm:h-[300px] rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.1799095152896!2d-76.80362222509278!3d18.016852384367457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f21c2c78e9d%3A0x8a7686bf5f0b8bc!2sRogue%20Automotive%20Ltd!5e0!3m2!1sen!2sjm!4v1749444466821!5m2!1sen!2sjm" 
                      width="100%" 
                      height="100%" 
                      style={{border: 0}} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
