import { graniteItems } from '../data/granite';
import GraniteCard from '../components/GraniteCard';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Granite Collection
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our premium selection of natural stone and granite. Each piece is carefully selected
            for its unique beauty, durability, and timeless appeal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graniteItems.map((item) => (
            <GraniteCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-slate-600 mb-6">
            We have access to hundreds of granite varieties. Contact us to discuss your specific requirements.
          </p>
          <a
            href="/contact"
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
