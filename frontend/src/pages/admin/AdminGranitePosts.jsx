import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import {
  getAdminGranitePosts,
  createGranitePost,
  updateGranitePost,
  deleteGranitePost,
} from "../../services/api";

const initialFormData = {
  title: "",
  category: "",
  description: "",
  isFeatured: false,
};

const categories = [
  "Kitchen Countertop",
  "Stairs",
  "Flooring",
  "Bathroom",
  "Facade",
  "Custom Project",
  "Other",
];

export default function AdminGranitePosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  const [status, setStatus] = useState("loading");
  const [formStatus, setFormStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  const loadPosts = async () => {
    try {
      if (!token) {
        navigate("/admin/login");
        return;
      }

      setStatus("loading");
      const result = await getAdminGranitePosts(token);
      setPosts(result.data || []);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Failed to load granite posts.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
    setImagePreview("");
    setEditingPost(null);
    setErrorMessage("");
    setFormStatus("idle");
  };

  const handleEdit = (post) => {
    setEditingPost(post);

    setFormData({
      title: post.title,
      category: post.category,
      description: post.description,
      isFeatured: Boolean(post.isFeatured),
    });

    setImagePreview(post.imageUrl);
    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description) {
      setErrorMessage("Please fill in title, category and description.");
      return;
    }

    if (!editingPost && !imageFile) {
      setErrorMessage("Please upload an image.");
      return;
    }

    try {
      setFormStatus("loading");
      setErrorMessage("");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("isFeatured", String(formData.isFeatured));

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (editingPost) {
        await updateGranitePost(editingPost._id, data, token);
      } else {
        await createGranitePost(data, token);
      }

      resetForm();
      await loadPosts();
    } catch (error) {
      setErrorMessage(error.message || "Failed to save granite post.");
    } finally {
      setFormStatus("idle");
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this granite post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteGranitePost(postId, token);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      alert(error.message || "Failed to delete granite post.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Granite Posts
            </h1>
            <p className="text-slate-600 text-sm">
              Create, edit, and soft delete granite cards for the gallery.
            </p>
          </div>

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="w-6 h-6 text-slate-800" />
            <h2 className="text-2xl font-bold text-slate-900">
              {editingPost ? "Edit Granite Post" : "Create Granite Post"}
            </h2>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="Black Galaxy Granite"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                  placeholder="Describe the granite type, color, style, and best use..."
                />
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Featured post
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Image {editingPost ? "" : "*"}
              </label>

              <label className="border-2 border-dashed border-slate-300 rounded-2xl min-h-64 flex flex-col items-center justify-center cursor-pointer hover:border-slate-500 transition-colors overflow-hidden bg-slate-50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon className="w-12 h-12 mx-auto text-slate-500 mb-3" />
                    <p className="font-semibold text-slate-800">
                      Click to upload image
                    </p>
                    <p className="text-sm text-slate-500">
                      JPG, PNG, or WEBP. Max 5MB.
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <div className="flex gap-3 mt-5">
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 disabled:opacity-60"
                >
                  {formStatus === "loading"
                    ? "Saving..."
                    : editingPost
                    ? "Update Post"
                    : "Create Post"}
                </button>

                {editingPost && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Existing Posts
          </h2>

          {status === "loading" && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              Loading posts...
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">
              {errorMessage}
            </div>
          )}

          {status === "success" && posts.length === 0 && (
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <ImageIcon className="w-10 h-10 mx-auto text-slate-500 mb-3" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No posts yet
              </h3>
              <p className="text-slate-600">
                Granite posts created by admin will appear here.
              </p>
            </div>
          )}

          {status === "success" && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {posts
                .filter((post) => !post.isDeleted)
                .map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">
                          {post.title}
                        </h3>

                        {post.isFeatured && (
                          <span className="text-xs bg-slate-900 text-white px-3 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-slate-500 mb-3">
                        {post.category}
                      </p>

                      <p className="text-slate-600 line-clamp-3 mb-5">
                        {post.description}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(post._id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}