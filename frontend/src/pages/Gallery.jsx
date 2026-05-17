import { useEffect, useState } from "react";
import GraniteCard from "../components/GraniteCard";
import { getPublicGranitePosts } from "../services/api";

export default function Gallery() {
  const [graniteItems, setGraniteItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadGranitePosts = async () => {
      try {
        setStatus("loading");

        const result = await getPublicGranitePosts();

        const formattedItems = (result.data || []).map((post) => ({
          id: post._id,
          name: post.title,
          category: post.category,
          description: post.description,
          image: post.imageUrl,
          isFeatured: post.isFeatured,
        }));

        setGraniteItems(formattedItems);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error.message || "Failed to load granite collection."
        );
      }
    };

    loadGranitePosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Granite Collection
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our premium selection of natural stone and granite. Each
            piece is carefully selected for its unique beauty, durability, and
            timeless appeal.
          </p>
        </div>

        {status === "loading" && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-600">
            Loading granite collection...
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-8 text-center">
            {errorMessage}
          </div>
        )}

        {status === "success" && graniteItems.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              No granite posts yet
            </h2>
            <p className="text-slate-600">
              Granite cards added by the admin will appear here.
            </p>
          </div>
        )}

        {status === "success" && graniteItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graniteItems.map((item) => (
              <GraniteCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-16 bg-white rounded-xl p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Can't Find What You're Looking For?
          </h2>

          <p className="text-slate-600 mb-6">
            We have access to hundreds of granite varieties. Contact us to
            discuss your specific requirements.
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