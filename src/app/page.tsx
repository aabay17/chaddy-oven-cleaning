'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Clock, Shield, Sparkles, Heart, Star, CheckCircle, Calendar, Users, Zap } from 'lucide-react';

export default function Home() {
  const [callUsOpen, setCallUsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    service: '',
    preferredDate: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Postcode validation - must be 4 numerical digits
  const validatePostcode = (postcode: string): boolean => {
    // Check if it's exactly 4 numerical digits
    const postcodeRegex = /^\d{4}$/;
    return postcodeRegex.test(postcode);
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation (Australian format)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+61|0)[2-9]\d{8}$|^04\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Name validation (simplified)
  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    let error = '';
    switch (name) {
      case 'name':
        if (value && !validateName(value)) {
          error = 'Please enter your name';
        }
        break;
      case 'email':
        if (value && !validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          error = 'Please enter a valid Australian phone number';
        }
        break;
      case 'postcode':
        if (value && !validatePostcode(value)) {
          error = 'Please enter a valid 4-digit postcode';
        }
        break;
    }

    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Comprehensive validation before submission
    const errors = {
      name: !validateName(formData.name) ? 'Please enter your name' : '',
      email: !validateEmail(formData.email) ? 'Please enter a valid email address' : '',
      phone: !validatePhone(formData.phone) ? 'Please enter a valid Australian phone number' : '',
      postcode: !validatePostcode(formData.postcode) ? 'Please enter a valid 4-digit postcode' : ''
    };

    setFormErrors(errors);

    // Check if there are any validation errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    if (hasErrors) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    // Check required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.postcode || !formData.service) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert(`Thank you ${formData.name}! We'll get back to you within minutes with your quote for postcode ${formData.postcode}.`);
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      postcode: '',
      service: '',
      preferredDate: '',
      message: ''
    });
    setFormErrors({
      name: '',
      email: '',
      phone: '',
      postcode: ''
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Business Name Logo */}
            <div className="flex items-center">
              <div>
                <h2 className="font-bold text-gray-900 text-2xl">Chaddy Cleaning</h2>
                <p className="text-sm text-gray-500">Keeping ovens clean since 2019</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={scrollToTop}
                className="text-gray-700 hover:text-red-600 font-semibold text-base transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-red-600 font-semibold text-base transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-red-600 font-semibold text-base transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-red-600 font-semibold text-base transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('quote-form')}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold text-base transition-colors"
              >
                Get a Quote
              </button>
            </div>

            {/* Phone Number */}
            <div className="hidden lg:flex items-center space-x-2">
              <Phone className="h-5 w-5 text-red-600" />
              <span className="font-bold text-gray-900 text-base">1300 011 403</span>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden pt-16">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-red-100 text-red-700 hover:bg-red-200">
                Melbourne's Premier Oven Cleaning
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Chaddy <span className="text-red-600">Oven</span> Cleaning
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-4 font-medium">
                Transform Your Grease Into Gleaming
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Professional oven cleaning that cuts through the toughest grease and grime.
                Safe, eco-friendly, and guaranteed to make your oven look brand new.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Dialog open={callUsOpen} onOpenChange={setCallUsOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Us Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Chaddy Oven Cleaning</DialogTitle>
                      <DialogDescription>
                        Get in touch with us for immediate service
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Phone className="h-6 w-6 text-red-600" />
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-lg text-red-600">1300 011 403</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Mail className="h-6 w-6 text-red-600" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-red-600">info@chaddycleaning.com.au</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToQuote}
                  className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-6 text-lg"
                >
                  Get Free Quote
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://ugc.same-assets.com/UW63WufGL7-8umLbPgt03MdT4LUwsa_x.webp"
                alt="Professional oven cleaning service"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="font-semibold">100% Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Professional Cleaning Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive oven and appliance cleaning solutions for homes and businesses across Melbourne
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Single Oven Deep Clean</CardTitle>
                <CardDescription>Complete interior and exterior cleaning for standard ovens</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Racks and trays cleaning</li>
                  <li>• Door and glass polishing</li>
                  <li>• Interior degreasing</li>
                  <li>• External surface cleaning</li>
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">From $99</span>
                  <Badge variant="outline">Most Popular</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Double Oven Deep Clean</CardTitle>
                <CardDescription>Professional cleaning for double oven units</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Both oven compartments</li>
                  <li>• All removable parts</li>
                  <li>• Glass door restoration</li>
                  <li>• Control panel cleaning</li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-red-600">From $129</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Commercial Oven Cleaning</CardTitle>
                <CardDescription>Heavy-duty cleaning for restaurant and commercial kitchens</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Industrial grade cleaning</li>
                  <li>• Health code compliance</li>
                  <li>• Same-day service available</li>
                  <li>• Flexible scheduling</li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-red-600">Quote on Request</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Cooktop & Range Cleaning</CardTitle>
                <CardDescription>Complete cooktop restoration and maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Gas and electric cooktops</li>
                  <li>• Burner and element cleaning</li>
                  <li>• Drip tray restoration</li>
                  <li>• Surface polishing</li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-red-600">From $79</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Move-Out Cleaning</CardTitle>
                <CardDescription>End of lease Stove/Oven and Range Top cleaning for bond returns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Bond-back guarantee</li>
                  <li>• Real estate approved</li>
                  <li>• Same-day Invoice</li>
                  <li>• All appliances included</li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-red-600">From $149</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Maintenance Packages</CardTitle>
                <CardDescription>Regular cleaning schedules for optimal performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Quarterly service plans</li>
                  <li>• Priority booking</li>
                  <li>• upto 15% discount on services</li>
                  <li>• Performance monitoring</li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-red-600">Save 15%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get Your Free Quote Today
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you in minutes with a detailed quote
            </p>
          </div>

          <Card className="border-gray-200 shadow-xl">
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className={`mt-2 ${formErrors.name ? 'border-red-500' : ''}`}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className={`mt-2 ${formErrors.email ? 'border-red-500' : ''}`}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(03) 9xxx xxxx"
                      className={`mt-2 ${formErrors.phone ? 'border-red-500' : ''}`}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postcode">Postcode (Servicing Melbourne Only) *</Label>
                    <Input
                      id="postcode"
                      name="postcode"
                      type="text"
                      placeholder="e.g. 3000"
                      className={`mt-2 ${formErrors.postcode ? 'border-red-500' : ''}`}
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                      maxLength={4}
                    />
                    {formErrors.postcode && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.postcode}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">Servicing Melbourne only</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="service">Service Needed *</Label>
                    <select
                      id="service"
                      name="service"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                      value={formData.service}
                      onChange={(e) => handleSelectChange(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="single-oven">Single Oven Cleaning</option>
                      <option value="double-oven">Double Oven Deep Clean</option>
                      <option value="commercial">Commercial Oven Cleaning</option>
                      <option value="cooktop">Cooktop & Range Cleaning</option>
                      <option value="move-out">Move-Out Cleaning</option>
                      <option value="maintenance">Maintenance Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    className="mt-2"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your oven's condition, special requirements, or any questions you have..."
                    className="mt-2"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                >
                  Get My Free Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Chaddy Oven Cleaning?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                With over 10 years of experience serving Melbourne families and businesses,
                we've perfected the art of oven restoration. Our eco-friendly approach and
                attention to detail set us apart from the competition.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">100% Safe & Eco-Friendly</h3>
                    <p className="text-gray-600">We use only non-toxic, biodegradable cleaning solutions that are safe for your family and pets.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fast & Reliable Service</h3>
                    <p className="text-gray-600">Most oven cleaning jobs completed in 2-3 hours with same-day availability.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
                    <p className="text-gray-600">If you're not completely satisfied, we'll return and clean it again for free.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Before and after oven cleaning"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
              <div className="absolute top-6 left-6 bg-white px-3 py-2 rounded-lg shadow-lg">
                <span className="text-sm font-semibold text-gray-900">Before & After</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Over 2,500 satisfied customers across Melbourne
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Absolutely incredible service! My oven looked brand new after they finished.
                  The team was professional, punctual, and the results exceeded my expectations."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-gray-500">Chadstone, VIC</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Used them for my end of lease cleaning and got my full bond back!
                  They even provided a certificate for the real estate. Highly recommend."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold">James Chen</p>
                    <p className="text-sm text-gray-500">Malvern East, VIC</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Amazing value for money! They cleaned both my ovens and cooktop for less
                  than I expected. The eco-friendly products gave me peace of mind too."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Emma Rodriguez</p>
                    <p className="text-sm text-gray-500">Glen Waverley, VIC</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our professional oven cleaning services
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Are you insured?</h3>
                <p className="text-gray-600">
                  Yes, we have full business and public liability insurance. Our team is fully covered for all cleaning services, giving you complete peace of mind when we work in your home or business.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How long does oven cleaning take?</h3>
                <p className="text-gray-600">
                  Most standard oven cleaning services take 2-3 hours to complete. Double ovens or heavily soiled ovens may take a bit longer. We'll give you an accurate time estimate when booking your service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you use safe cleaning products?</h3>
                <p className="text-gray-600">
                  Absolutely! We use only eco-friendly, non-toxic cleaning solutions that are safe for your family and pets. Our products are biodegradable and won't leave harmful residues in your oven.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's included in your oven cleaning service?</h3>
                <p className="text-gray-600">
                  Our comprehensive service includes interior degreasing, rack and tray cleaning, door and glass polishing, external surface cleaning, and fan and filter cleaning (where applicable). We leave your oven spotless inside and out.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do I need to be home during the cleaning?</h3>
                <p className="text-gray-600">
                  While it's not essential to be home throughout the entire process, we do recommend being available at the start and end of the service. This allows us to discuss any specific requirements and show you the results.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I use my oven immediately after cleaning?</h3>
                <p className="text-gray-600">
                  Yes! Once we've finished cleaning, your oven is ready to use immediately. Our eco-friendly products don't require lengthy ventilation periods, so you can start cooking right away.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What if I'm not satisfied with the results?</h3>
                <p className="text-gray-600">
                  We guarantee your satisfaction! If you're not completely happy with our cleaning service, we'll return and clean it again for free. Your satisfaction is our top priority.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you provide certificates for end of lease cleaning?</h3>
                <p className="text-gray-600">
                  Yes, we provide official cleaning certificates for end of lease or bond cleaning services. These are accepted by real estates and property managers to help ensure you get your full bond back.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Chaddy Oven Cleaning</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Melbourne's trusted oven cleaning specialists. Professional, eco-friendly,
                and guaranteed results for over 5 years.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span>1300 011 403</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-red-500" />
                  <span>info@chaddycleaning.com.au</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span>Melbourne CBD, North, East & South East</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Single Oven Cleaning</li>
                <li>Double Oven Cleaning</li>
                <li>Commercial Cleaning</li>
                <li>Cooktop Cleaning</li>
                <li>Move-Out Cleaning</li>
                <li>Maintenance Packages</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Melbourne CBD</li>
                <li>Melbourne Northern Suburbs</li>
                <li>Melbourne East</li>
                <li>Melbourne South East</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 Chaddy Oven Cleaning. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-red-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
