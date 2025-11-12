import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, FileText, DollarSign, Tag, Calendar } from 'lucide-react';

export function BookUploadModal({ isOpen, onClose, onSave, editingBook = null }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    lowStockReminder: '',
    publicationDate: '',
    language: '',
    pages: '',
    coverImage: null,
    pdfFile: null
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing a book
  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || '',
        author: editingBook.author || '',
        isbn: editingBook.isbn || '',
        price: editingBook.price || '',
        description: editingBook.description || '',
        category: editingBook.category || '',
        stock: editingBook.stock || '',
        lowStockReminder: editingBook.lowStockReminder || '',
        publicationDate: editingBook.publicationDate || '',
        language: editingBook.language || '',
        pages: editingBook.pages || '',
        coverImage: editingBook.coverImage || null,
        pdfFile: editingBook.pdfFile || null
      });
    } else {
      // Reset form for new book
      setFormData({
        title: '',
        author: '',
        isbn: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        lowStockReminder: '',
        publicationDate: '',
        language: '',
        pages: '',
        coverImage: null,
        pdfFile: null
      });
    }
  }, [editingBook]);

  const categories = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance', 
    'Thriller', 'Biography', 'History', 'Self-Help', 'Business', 
    'Technology', 'Art', 'Poetry', 'Drama', 'Comedy'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.lowStockReminder || formData.lowStockReminder < 0) newErrors.lowStockReminder = 'Valid low stock reminder quantity is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
      // Reset form
      setFormData({
        title: '',
        author: '',
        isbn: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        lowStockReminder: '',
        publicationDate: '',
        language: '',
        pages: '',
        coverImage: null,
        pdfFile: null
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-t-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                  {editingBook ? 'Edit Book' : 'Add New Book'}
                </h2>
                <p className="text-emerald-100 mt-1">
                  {editingBook ? 'Update book information' : 'Add a new book to your inventory'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Book Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                  errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                placeholder="Enter book title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-2 font-medium">{errors.title}</p>}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                  errors.author ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                placeholder="Enter author name"
              />
              {errors.author && <p className="text-red-500 text-sm mt-2 font-medium">{errors.author}</p>}
            </div>

            {/* ISBN */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                placeholder="Enter ISBN"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Price *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                    errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-2 font-medium">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                  errors.category ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-2 font-medium">{errors.category}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                  errors.stock ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.stock && <p className="text-red-500 text-sm mt-2 font-medium">{errors.stock}</p>}
            </div>

            {/* Low Stock Reminder */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Low Stock Reminder *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="lowStockReminder"
                  value={formData.lowStockReminder}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                    errors.lowStockReminder ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  placeholder="e.g., 10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border">
                  Alert threshold
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">Get notified when stock falls below this quantity</p>
              {errors.lowStockReminder && <p className="text-red-500 text-sm mt-2 font-medium">{errors.lowStockReminder}</p>}
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
              >
                <option value="">Select language</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Pages */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Number of Pages
              </label>
              <input
                type="number"
                name="pages"
                value={formData.pages}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                placeholder="0"
              />
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Publication Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="publicationDate"
                  value={formData.publicationDate}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
              placeholder="Enter book description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-2 font-medium">{errors.description}</p>}
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Cover Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                  <ImageIcon className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">Upload cover image</p>
                <p className="text-xs text-gray-500 mb-4">PNG, JPG, GIF up to 10MB</p>
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="coverImage"
                />
                <label
                  htmlFor="coverImage"
                  className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-600 hover:text-white cursor-pointer transition-all duration-300 font-medium hover:scale-105"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </label>
                {formData.coverImage && (
                  <p className="text-sm text-emerald-600 mt-3 font-medium">{formData.coverImage.name}</p>
                )}
              </div>
            </div>

            {/* PDF File */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                PDF File (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <FileText className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">Upload PDF file</p>
                <p className="text-xs text-gray-500 mb-4">PDF files up to 50MB</p>
                <input
                  type="file"
                  name="pdfFile"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                  id="pdfFile"
                />
                <label
                  htmlFor="pdfFile"
                  className="inline-flex items-center px-6 py-3 border-2 border-amber-600 text-amber-700 bg-amber-50 rounded-xl hover:bg-amber-600 hover:text-white cursor-pointer transition-all duration-300 font-medium hover:scale-105"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </label>
                {formData.pdfFile && (
                  <p className="text-sm text-amber-600 mt-3 font-medium">{formData.pdfFile.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Upload className="w-5 h-5" />
              <span>{editingBook ? 'Update Book' : 'Upload Book'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
