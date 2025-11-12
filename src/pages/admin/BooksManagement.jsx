import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { BookUploadModal } from '../../components/BookUploadModal';

export function BooksManagement() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingBook, setEditingBook] = useState(null);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Science Fiction', label: 'Science Fiction' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Biography', label: 'Biography' },
    { value: 'History', label: 'History' },
    { value: 'Self-Help', label: 'Self-Help' },
    { value: 'Business', label: 'Business' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Art', label: 'Art' },
    { value: 'Poetry', label: 'Poetry' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Comedy', label: 'Comedy' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockBooks = [
          {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            price: 12.99,
            stock: 50,
            sales: 120,
            category: 'Fiction',
            rating: 4.5,
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg==',
            status: 'active',
            isbn: '978-0-7432-7356-5',
            pages: 180,
            language: 'English',
            publicationDate: '1925-04-10',
            description: 'A classic American novel about the Jazz Age.',
            publisher: 'Scribner',
            format: 'Paperback',
            dimensions: '5.1 x 7.8 x 0.6 inches',
            weight: '0.4 pounds',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-15T10:30:00Z',
            tags: ['classic', 'american-literature', 'jazz-age'],
            featured: true,
            bestseller: true
          },
          {
            id: 2,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            price: 14.99,
            stock: 30,
            sales: 95,
            category: 'Fiction',
            rating: 4.8,
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg==',
            status: 'active',
            isbn: '978-0-06-112008-4',
            pages: 281,
            language: 'English',
            publicationDate: '1960-07-11',
            description: 'A gripping tale of racial injustice and childhood innocence.',
            publisher: 'J.B. Lippincott & Co.',
            format: 'Paperback',
            dimensions: '5.1 x 7.8 x 0.7 inches',
            weight: '0.5 pounds',
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-16T14:20:00Z',
            tags: ['classic', 'southern-literature', 'social-justice'],
            featured: true,
            bestseller: false
          },
          {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            price: 13.99,
            stock: 25,
            sales: 80,
            category: 'Science Fiction',
            rating: 4.6,
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg==',
            status: 'active',
            isbn: '978-0-452-28423-4',
            pages: 328,
            language: 'English',
            publicationDate: '1949-06-08',
            description: 'A dystopian social science fiction novel.',
            publisher: 'Secker & Warburg',
            format: 'Paperback',
            dimensions: '5.1 x 7.8 x 0.8 inches',
            weight: '0.6 pounds',
            createdAt: '2024-01-03T00:00:00Z',
            updatedAt: '2024-01-17T09:15:00Z',
            tags: ['dystopian', 'science-fiction', 'political'],
            featured: false,
            bestseller: true
          }
        ];

        setBooks(mockBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(book => book.id !== bookId));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedBooks.length === 0) return;

    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedBooks.length} books?`)) {
          setBooks(prev => prev.filter(book => !selectedBooks.includes(book.id)));
          setSelectedBooks([]);
        }
        break;
      case 'activate':
        setBooks(prev => prev.map(book =>
          selectedBooks.includes(book.id) ? { ...book, status: 'active' } : book
        ));
        setSelectedBooks([]);
        break;
      case 'archive':
        setBooks(prev => prev.map(book =>
          selectedBooks.includes(book.id) ? { ...book, status: 'archived' } : book
        ));
        setSelectedBooks([]);
        break;
      case 'export':
        {
          const selectedBooksData = books.filter(book => selectedBooks.includes(book.id));
          const dataStr = JSON.stringify(selectedBooksData, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'selected-books.json';
          link.click();
          URL.revokeObjectURL(url);
        }
        break;
      default:
        break;
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn?.includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectAll = () => {
    if (selectedBooks.length === filteredBooks.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(filteredBooks.map(book => book.id));
    }
  };

  const handleSelectBook = (bookId) => {
    setSelectedBooks(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600';
    if (stock < 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col space-y-2 items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-emerald-600"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (

      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black">
                Books Management
              </h1>
              <p className="mt-2 text-lg">Manage your book inventory and catalog</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/admin/books/add')}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-3" />
                Add New Book
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="author-asc">Author A-Z</option>
              <option value="author-desc">Author Z-A</option>
              <option value="price-desc">Price High-Low</option>
              <option value="price-asc">Price Low-High</option>
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedBooks.length > 0 && (
            <div className="mt-4 flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {selectedBooks.length} book{selectedBooks.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                >
                  Archive
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Export
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Books Table */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedBooks.length === filteredBooks.length && filteredBooks.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => handleSelectBook(book.id)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0 mr-4 overflow-hidden">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{book.title}</div>
                          <div className="text-sm text-gray-500">ISBN: {book.isbn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${book.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={getStockColor(book.stock)}>{book.stock}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.rating}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(book.status)}`}>
                        {book.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-emerald-600 hover:text-emerald-900 p-1 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingBook(book)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBooks.length}</span> of{' '}
              <span className="font-medium">{books.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        <BookUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => {
            setIsUploadModalOpen(false);
            setEditingBook(null);
          }}
          onSave={(bookData) => {
            if (editingBook) {
              setBooks(prev => prev.map(book =>
                book.id === editingBook.id
                  ? { ...book, ...bookData, updatedAt: new Date().toISOString() }
                  : book
              ));
            } else {
              const newBook = {
                id: Math.max(...books.map(b => b.id)) + 1,
                ...bookData,
                sales: 0,
                rating: 0,
                coverImage: bookData.coverImage || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg==',
                status: 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                tags: bookData.tags || [],
                featured: false,
                bestseller: false,
                lowStockReminder: bookData.lowStockReminder || 10
              };
              setBooks(prev => [newBook, ...prev]);
            }
            setIsUploadModalOpen(false);
            setEditingBook(null);
          }}
          editingBook={editingBook}
        />
      </div>
  );
}