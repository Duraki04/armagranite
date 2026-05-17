import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Users, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <section
        className="relative h-[90vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/1909791/pexels-photo-1909791.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Natural Stone & Granite Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto">
            Premium quality granite and natural stone for your home and business.
            Excellence in craftsmanship since day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/gallery"
              className="group bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              View Our Granite
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Choose ARMA GRANIT?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We are your trusted partner for premium natural stone solutions in North Macedonia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors duration-300">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Premium Quality</h3>
              <p className="text-slate-600">
                Only the finest natural stone and granite materials sourced from trusted suppliers
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors duration-300">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Installation</h3>
              <p className="text-slate-600">
                Professional craftsmen with years of experience in stone and granite installation
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors duration-300">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Trusted by Many</h3>
              <p className="text-slate-600">
                Hundreds of satisfied customers across residential and commercial projects
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors duration-300">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Timely Delivery</h3>
              <p className="text-slate-600">
                We respect your time and ensure projects are completed on schedule
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and discover the perfect granite solution for your project
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
