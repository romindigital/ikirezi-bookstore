import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Headphones,
  Package,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  DollarSign,
  Tag,
  Calendar,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

const bookTypes = [
  {
    id: 'physical',
    name: 'Physical Book',
    description: 'Paperback, hardcover, or other physical formats',
    icon: Package,
    color: 'emerald'
  },
  {
    id: 'audiobook',
    name: 'Audiobook',
    description: 'Digital audio book format',
    icon: Headphones,
    color: 'amber'
  },
  {
    id: 'ebook',
    name: 'E-book',
    description: 'Digital book in PDF, EPUB format',
    icon: BookOpen,
    color: 'blue'
  }
];

const steps = [
  { id: 'type', title: 'Book Type', description: 'Choose the type of book' },
  { id: 'basic', title: 'Basic Info', description: 'Title, author, description' },
  { id: 'details', title: 'Book Details', description: 'Category, price, stock' },
  { id: 'media', title: 'Media & Files', description: 'Cover image and files' },
  { id: 'review', title: 'Review & Save', description: 'Review and publish' }
];

export function AddBookWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBookType, setSelectedBookType] = useState(null);
  const [formData, setFormData] = useState({
    // Common fields
    title: '',
    author: '',
    isbn: '',
    description: '',
    category: '',
    price: '',
    lowStockReminder: '',
    language: '',
    publicationDate: '',
    tags: [],

    // Physical book specific
    format: '',
    pages: '',
    dimensions: '',
    weight: '',
    stock: '',

    // Audiobook specific
    duration: '',
    narrator: '',
    audioFormat: '',
    fileSize: '',

    // E-book specific
    fileFormat: '',
    ebookFileSize: '',

    // Media
    coverImage: null,
    bookFile: null
  });

  const [errors, setErrors] = useState({});

  const handleBookTypeSelect = (type) => {
    setSelectedBookType(type);
    setCurrentStep(1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
      case 2: // Details
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
        if (!formData.lowStockReminder || formData.lowStockReminder < 0) newErrors.lowStockReminder = 'Valid low stock reminder is required';

        if (selectedBookType === 'physical') {
          if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
          if (!formData.format) newErrors.format = 'Format is required';
        }
        break;
      case 3: // Media
        if (!formData.coverImage) newErrors.coverImage = 'Cover image is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canProceedToNext = useMemo(() => {
    if (currentStep === 0) {
      // Step 0: Must select a book type
      return selectedBookType !== null;
    }
    // Other steps: validate current step
    const newErrors = {};

    switch (currentStep) {
      case 1: // Basic Info
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
      case 2: // Details
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';

        if (selectedBookType === 'physical') {
          if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
          if (!formData.format) newErrors.format = 'Format is required';
        }
        break;
      case 3: // Media
        if (!formData.coverImage) newErrors.coverImage = 'Cover image is required';
        break;
    }

    return Object.keys(newErrors).length === 0;
  }, [currentStep, selectedBookType, formData]);

  const handleNext = () => {
    if (canProceedToNext) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSave = () => {
    // Here you would typically send the data to your API
    console.log('Saving book:', { ...formData, type: selectedBookType });

    // Navigate back to books management
    navigate('/admin/books');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Book Type</h2>
              <p className="text-gray-600 text-lg">Select the type of book you want to add to your inventory</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleBookTypeSelect(type)}
                    className="group p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-${type.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-${type.color}-200 transition-colors`}>
                        <Icon className={`w-8 h-8 text-${type.color}-600`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                      <p className="text-gray-600">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Basic Information</h2>
              <p className="text-gray-600 text-lg">Enter the fundamental details of your book</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Book Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                    errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  placeholder="Enter book title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-2 font-medium">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                    errors.author ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  placeholder="Enter author name"
                />
                {errors.author && <p className="text-red-500 text-sm mt-2 font-medium">{errors.author}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  ISBN
                </label>
                <input
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                  placeholder="Enter ISBN"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                >
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Italian">Italian</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                  errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                placeholder="Enter book description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-2 font-medium">{errors.description}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Details</h2>
              <p className="text-gray-600 text-lg">Set pricing, inventory, and category information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                    errors.category ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <option value="">Select category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Biography">Biography</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-2 font-medium">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Price *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
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

              {selectedBookType === 'physical' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Format *
                    </label>
                    <select
                      value={formData.format}
                      onChange={(e) => handleInputChange('format', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                        errors.format ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <option value="">Select format</option>
                      <option value="Paperback">Paperback</option>
                      <option value="Hardcover">Hardcover</option>
                      <option value="Mass Market">Mass Market</option>
                    </select>
                    {errors.format && <p className="text-red-500 text-sm mt-2 font-medium">{errors.format}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                      min="0"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
                        errors.stock ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                      placeholder="0"
                    />
                    {errors.stock && <p className="text-red-500 text-sm mt-2 font-medium">{errors.stock}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Number of Pages
                    </label>
                    <input
                      type="number"
                      value={formData.pages}
                      onChange={(e) => handleInputChange('pages', e.target.value)}
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                      placeholder="0"
                    />
                  </div>
                </>
              )}

              {selectedBookType === 'audiobook' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Duration (hours)
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      step="0.1"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                      placeholder="0.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Narrator
                    </label>
                    <input
                      type="text"
                      value={formData.narrator}
                      onChange={(e) => handleInputChange('narrator', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter narrator name"
                    />
                  </div>
                </>
              )}

              {selectedBookType === 'physical' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Low Stock Reminder
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.lowStockReminder}
                      onChange={(e) => handleInputChange('lowStockReminder', e.target.value)}
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                      placeholder="e.g., 10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border">
                      Alert threshold
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Get notified when stock falls below this quantity</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Publication Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={formData.publicationDate}
                    onChange={(e) => handleInputChange('publicationDate', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Media & Files</h2>
              <p className="text-gray-600 text-lg">Upload cover image and book files</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Cover Image *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                    <ImageIcon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Upload cover image</p>
                  <p className="text-xs text-gray-500 mb-4">PNG, JPG, GIF up to 10MB</p>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange('coverImage', e.target.files[0])}
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
                  {errors.coverImage && <p className="text-red-500 text-sm mt-2 font-medium">{errors.coverImage}</p>}
                </div>
              </div>

              {/* Book File - Only show for digital books */}
              {(selectedBookType === 'ebook' || selectedBookType === 'audiobook') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {selectedBookType === 'audiobook' ? 'Audio File' : 'E-book File'} (Required)
                  </label>
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 group ${
                    selectedBookType === 'ebook' ? 'border-amber-300 hover:border-amber-400 hover:bg-amber-50/50' :
                    'border-blue-300 hover:border-blue-400 hover:bg-blue-50/50'
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
                      selectedBookType === 'ebook' ? 'bg-amber-100 group-hover:bg-amber-200' :
                      'bg-blue-100 group-hover:bg-blue-200'
                    }`}>
                      <FileText className={`w-8 h-8 ${
                        selectedBookType === 'ebook' ? 'text-amber-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Upload {selectedBookType === 'audiobook' ? 'audio' : 'e-book'} file
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {selectedBookType === 'audiobook' ? 'MP3, AAC, FLAC up to 500MB' : 'PDF, EPUB up to 50MB'}
                    </p>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange('bookFile', e.target.files[0])}
                      accept={selectedBookType === 'audiobook' ? 'audio/*' : '.pdf,.epub'}
                      className="hidden"
                      id="bookFile"
                    />
                    <label
                      htmlFor="bookFile"
                      className={`inline-flex items-center px-6 py-3 border-2 rounded-xl cursor-pointer transition-all duration-300 font-medium hover:scale-105 ${
                        selectedBookType === 'ebook' ? 'border-amber-600 text-amber-700 bg-amber-50 hover:bg-amber-600 hover:text-white' :
                        'border-blue-600 text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </label>
                    {formData.bookFile && (
                      <p className={`text-sm mt-3 font-medium ${
                        selectedBookType === 'ebook' ? 'text-amber-600' : 'text-blue-600'
                      }`}>
                        {formData.bookFile.name}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Physical Book Notice */}
              {selectedBookType === 'physical' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-emerald-800 mb-2">Physical Book</h4>
                      <p className="text-emerald-700 text-sm leading-relaxed">
                        No digital file upload is required for physical books. Customers will receive the physical copy through shipping.
                        The system will track shipping status and provide delivery updates to customers.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Review & Save</h2>
              <p className="text-gray-600 text-lg">Review your book details before publishing</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200">
              <div className="flex items-start space-x-6">
                {formData.coverImage ? (
                  <img
                    src={URL.createObjectURL(formData.coverImage)}
                    alt="Cover"
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedBookType === 'physical' ? 'bg-emerald-100 text-emerald-800' :
                      selectedBookType === 'audiobook' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {bookTypes.find(t => t.id === selectedBookType)?.name}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">${formData.price}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{formData.title || 'Untitled'}</h3>
                  <p className="text-lg text-gray-700 mb-4">by {formData.author || 'Unknown Author'}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Category:</span>
                      <p className="text-gray-900">{formData.category || 'Not set'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Language:</span>
                      <p className="text-gray-900">{formData.language || 'Not set'}</p>
                    </div>
                    {selectedBookType === 'physical' && (
                      <>
                        <div>
                          <span className="font-medium text-gray-500">Stock:</span>
                          <p className="text-gray-900">{formData.stock || 0}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Format:</span>
                          <p className="text-gray-900">{formData.format || 'Not set'}</p>
                        </div>
                      </>
                    )}
                    {selectedBookType === 'audiobook' && (
                      <>
                        <div>
                          <span className="font-medium text-gray-500">Duration:</span>
                          <p className="text-gray-900">{formData.duration ? `${formData.duration}h` : 'Not set'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Narrator:</span>
                          <p className="text-gray-900">{formData.narrator || 'Not set'}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Description</h4>
              <p className="text-gray-700 leading-relaxed">
                {formData.description || 'No description provided.'}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="">
              <div>
                <h1 className="text-3xl lg:text-4xl font-black">
                  Add New Book
                </h1>
                <p className="mt-2">
                  Create a new book entry with our interactive wizard
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/books')}
              className="p-3 font-medium rounded-full bg-emerald-700 text-white transition-all duration-300 hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="ml-4 hidden md:block">
                  <p className={`text-sm font-medium ${
                    index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className={`w-5 h-5 mx-4 ${
                    index < currentStep ? 'text-emerald-600' : 'text-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSave}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Check className="w-5 h-5 mr-2" />
              Save Book
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceedToNext}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                canProceedToNext
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
