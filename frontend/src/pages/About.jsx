import { completedWorks } from '../data/granite';
import { Target, Eye, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About ARMA GRANIT</h1>
          <p className="text-xl md:text-2xl text-slate-200">Excellence in Natural Stone Since Day One</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                ARMA GRANIT is a leading provider of premium natural stone and granite solutions in North Macedonia.
                Based in Lubidrag, Municipality of Kumanovo, we have built our reputation on quality craftsmanship,
                exceptional customer service, and an unwavering commitment to excellence.
              </p>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We specialize in sourcing, processing, and installing the finest granite and natural stone for
                residential and commercial projects. Our team of experienced craftsmen brings decades of combined
                expertise to every project, ensuring flawless execution and lasting beauty.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                From elegant kitchen countertops to stunning commercial facades, we transform spaces with the
                timeless beauty and durability of natural stone. Our commitment to quality and customer satisfaction
                has made us the preferred choice for discerning clients throughout the region.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Premium granite installation"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-slate-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600">
                To provide exceptional natural stone solutions that enhance spaces and exceed expectations through
                quality materials and expert craftsmanship.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600">
                To be the most trusted name in natural stone and granite solutions across North Macedonia and beyond,
                setting industry standards for quality.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Values</h3>
              <p className="text-slate-600">
                Integrity, excellence, and customer satisfaction guide everything we do. We believe in building
                lasting relationships through quality work and honest service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Completed Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Take a look at some of our recent projects showcasing the quality and craftsmanship
              that define ARMA GRANIT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedWorks.map((work) => (
              <div
                key={work.id}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1">{work.title}</h3>
                      <p className="text-sm text-slate-200">{work.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
