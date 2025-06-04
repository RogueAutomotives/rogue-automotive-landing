
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

            <div className="space-y-8 animate-fade-in animation-delay-700">
              <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardContent className="p-6">
                  <h3 className="text-xl font-montserrat font-bold text-rogue-dark mb-4">Visit Us</h3>
                  <div className="space-y-3 text-rogue-charcoal">
                    <p><strong>Address:</strong> 14 Westminster Rd, Kingston 10, Jamaica</p>
                    <p><strong>Phone:</strong> (876) 860-5061</p>
                    <p><strong>Email:</strong> info@rogueautomotiveja.com</p>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
