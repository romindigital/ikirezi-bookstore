import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faPlus, 
  faEdit, 
  faTrash, 
  faEye, 
  faUpload,
  faDownload,
  faStar,
  faExclamationCircle,
  faBookOpen,
  faEllipsisVertical,
  faSort,
  faSortUp,
  faSortDown,
  faTh,
  faList,
  faChartLine,
  faCalendar,
  faTag,
  faUsers,
  faDollarSign,
  faBox,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faArchive,
  faRefresh,
  faFileExport,
  faFileImport,
  faCog,
  faChevronDown,
  faChevronUp,
  faBars,
  faTimes,
  faInfoCircle,
  faWarning,
  faCheck,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { AdminLayout } from '../../components/AdminLayout';
import { BookUploadModal } from '../../components/BookUploadModal';

export function BooksManagement() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriceRange, setFilterPriceRange] = useState([0, 1000]);
  const [filterRating, setFilterRating] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalSales: 0,
    totalRevenue: 0,
    averageRating: 0,
    lowStockCount: 0,
    outOfStockCount: 0
  });

  const categories = [
    { value: 'all', label: 'All Categories', count: 0 },
    { value: 'Fiction', label: 'Fiction', count: 0 },
    { value: 'Non-Fiction', label: 'Non-Fiction', count: 0 },
    { value: 'Science Fiction', label: 'Science Fiction', count: 0 },
    { value: 'Mystery', label: 'Mystery', count: 0 },
    { value: 'Romance', label: 'Romance', count: 0 },
    { value: 'Thriller', label: 'Thriller', count: 0 },
    { value: 'Biography', label: 'Biography', count: 0 },
    { value: 'History', label: 'History', count: 0 },
    { value: 'Self-Help', label: 'Self-Help', count: 0 },
    { value: 'Business', label: 'Business', count: 0 },
    { value: 'Technology', label: 'Technology', count: 0 },
    { value: 'Art', label: 'Art', count: 0 },
    { value: 'Poetry', label: 'Poetry', count: 0 },
    { value: 'Drama', label: 'Drama', count: 0 },
    { value: 'Comedy', label: 'Comedy', count: 0 }
  ];

  const statuses = [
    { value: 'all', label: 'All Status', color: 'gray', count: 0 },
    { value: 'active', label: 'Active', color: 'green', count: 0 },
    { value: 'out_of_stock', label: 'Out of Stock', color: 'red', count: 0 },
    { value: 'draft', label: 'Draft', color: 'yellow', count: 0 },
    { value: 'archived', label: 'Archived', color: 'gray', count: 0 }
  ];

  // Calculate statistics
  const calculateStats = (booksData) => {
    const totalBooks = booksData.length;
    const totalSales = booksData.reduce((sum, book) => sum + (book.sales || 0), 0);
    const totalRevenue = booksData.reduce((sum, book) => sum + (book.price * (book.sales || 0)), 0);
    const averageRating = booksData.length > 0 ? 
      booksData.reduce((sum, book) => sum + (book.rating || 0), 0) / booksData.length : 0;
    const lowStockCount = booksData.filter(book => book.stock > 0 && book.stock < 10).length;
    const outOfStockCount = booksData.filter(book => book.stock === 0).length;
    
    return {
      totalBooks,
      totalSales,
      totalRevenue,
      averageRating,
      lowStockCount,
      outOfStockCount
    };
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced mock data with more realistic information
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
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
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
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
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
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
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
          },
          { 
            id: 4, 
            title: 'Pride and Prejudice', 
            author: 'Jane Austen', 
            price: 11.99, 
            stock: 0, 
            sales: 65,
            category: 'Romance',
            rating: 4.7,
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
            status: 'out_of_stock',
            isbn: '978-0-14-143951-8',
            pages: 432,
            language: 'English',
            publicationDate: '1813-01-28',
            description: 'A romantic novel of manners written by Jane Austen.',
            publisher: 'T. Egerton, Whitehall',
            format: 'Paperback',
            dimensions: '5.1 x 7.8 x 1.0 inches',
            weight: '0.7 pounds',
            createdAt: '2024-01-04T00:00:00Z',
            updatedAt: '2024-01-18T16:45:00Z',
            tags: ['romance', 'classic', 'manners'],
            featured: false,
            bestseller: false
          },
          { 
            id: 5, 
            title: 'The Hobbit', 
            author: 'J.R.R. Tolkien', 
            price: 15.99, 
            stock: 40, 
            sales: 200,
            category: 'Fantasy',
            rating: 4.9,
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
            status: 'active',
            isbn: '978-0-547-92822-7',
            pages: 310,
            language: 'English',
            publicationDate: '1937-09-21',
            description: 'A fantasy novel about a hobbit who goes on an adventure.',
            publisher: 'Allen & Unwin',
            format: 'Paperback',
            dimensions: '5.1 x 7.8 x 0.8 inches',
            weight: '0.6 pounds',
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-19T11:30:00Z',
            tags: ['fantasy', 'adventure', 'children-literature'],
            featured: true,
            bestseller: true
          },
          { 
            id: 6, 
            title: 'The Lord of the Rings', 
            author: 'J.R.R. Tolkien', 
            price: 24.99, 
            stock: 15, 
            sales: 150,
            category: 'Fantasy',
            rating: 4.7,
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
            status: 'active',
            isbn: '978-0-547-92822-7',
            pages: 1216,
            language: 'English',
            publicationDate: '1954-07-29',
            description: 'An epic high-fantasy novel about the quest to destroy the One Ring.',
            publisher: 'Allen & Unwin',
            format: 'Paperback',
            dimensions: '5.1 x 7.8 x 2.0 inches',
            weight: '1.2 pounds',
            createdAt: '2024-01-06T00:00:00Z',
            updatedAt: '2024-01-20T13:20:00Z',
            tags: ['fantasy', 'epic', 'adventure'],
            featured: true,
            bestseller: true
          },
          { 
            id: 7, 
            title: 'Harry Potter and the Philosopher\'s Stone', 
            author: 'J.K. Rowling', 
            price: 16.99, 
            stock: 60, 
            sales: 300,
            category: 'Fantasy',
            rating: 4.6,
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
            status: 'active',
            isbn: '978-0-7475-3269-9',
            pages: 223,
            language: 'English',
            publicationDate: '1997-06-26',
            description: 'The first book in the Harry Potter series.',
            publisher: 'Bloomsbury',
            format: 'Paperback',
            dimensions: '5.1 x 7.8 x 0.8 inches',
            weight: '0.6 pounds',
            createdAt: '2024-01-07T00:00:00Z',
            updatedAt: '2024-01-21T15:10:00Z',
            tags: ['fantasy', 'young-adult', 'magic'],
            featured: true,
            bestseller: true
          },
          { 
            id: 8, 
            title: 'The Catcher in the Rye', 
            author: 'J.D. Salinger', 
            price: 13.50, 
            stock: 5, 
            sales: 45,
            category: 'Fiction',
            rating: 3.8,
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
            status: 'active',
            isbn: '978-0-316-76948-0',
            pages: 277,
            language: 'English',
            publicationDate: '1951-07-16',
            description: 'A coming-of-age story about teenage rebellion.',
            publisher: 'Little, Brown and Company',
            format: 'Paperback',
            dimensions: '5.1 x 7.8 x 0.7 inches',
            weight: '0.5 pounds',
            createdAt: '2024-01-08T00:00:00Z',
            updatedAt: '2024-01-22T08:45:00Z',
            tags: ['coming-of-age', 'american-literature', 'rebellion'],
            featured: false,
            bestseller: false
          }
        ];
        
        setBooks(mockBooks);
        setStats(calculateStats(mockBooks));
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.isbn?.includes(searchTerm) ||
                           book.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
      const matchesPrice = book.price >= filterPriceRange[0] && book.price <= filterPriceRange[1];
      const matchesRating = book.rating >= filterRating;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPrice && matchesRating;
    });

    // Sort books
    filtered.sort((a, b) => {
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

    return filtered;
  }, [books, searchTerm, filterCategory, filterStatus, filterPriceRange, filterRating, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = filteredAndSortedBooks.slice(startIndex, endIndex);

  const handleBookUpload = (bookData) => {
    const newBook = {
      id: Math.max(...books.map(b => b.id)) + 1,
      ...bookData,
      sales: 0,
      rating: 0,
      coverImage: bookData.coverImage || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDEyMCAxODBIMTgwTDE1MCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0Ij5Cb29rIENvdmVyPC90ZXh0Pgo8L3N2Zz4K',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: bookData.tags || [],
      featured: false,
      bestseller: false
    };
    setBooks(prev => [newBook, ...prev]);
    setStats(calculateStats([newBook, ...books]));
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooks(updatedBooks);
      setStats(calculateStats(updatedBooks));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedBooks.length === 0) return;
    
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedBooks.length} books?`)) {
          const updatedBooks = books.filter(book => !selectedBooks.includes(book.id));
          setBooks(updatedBooks);
          setStats(calculateStats(updatedBooks));
          setSelectedBooks([]);
        }
        break;
      case 'activate':
        setBooks(prev => {
          const updated = prev.map(book => 
            selectedBooks.includes(book.id) ? { ...book, status: 'active' } : book
          );
          setStats(calculateStats(updated));
          return updated;
        });
        setSelectedBooks([]);
        break;
      case 'archive':
        setBooks(prev => {
          const updated = prev.map(book => 
            selectedBooks.includes(book.id) ? { ...book, status: 'archived' } : book
          );
          setStats(calculateStats(updated));
          return updated;
        });
        setSelectedBooks([]);
        break;
      case 'export':
        // Export selected books
        const selectedBooksData = books.filter(book => selectedBooks.includes(book.id));
        const dataStr = JSON.stringify(selectedBooksData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'selected-books.json';
        link.click();
        URL.revokeObjectURL(url);
        break;
      default:
        break;
    }
  };

  const handleSelectAll = () => {
    if (selectedBooks.length === paginatedBooks.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(paginatedBooks.map(book => book.id));
    }
  };

  const handleSelectBook = (bookId) => {
    setSelectedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsUploadModalOpen(true);
  };

  const handleUpdateBook = (updatedBookData) => {
    if (editingBook) {
      const updatedBooks = books.map(book => 
        book.id === editingBook.id 
          ? { ...book, ...updatedBookData, updatedAt: new Date().toISOString() }
          : book
      );
      setBooks(updatedBooks);
      setStats(calculateStats(updatedBooks));
      setEditingBook(null);
    }
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
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading books...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
            <p className="text-gray-600">Manage your book inventory and catalog</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faUpload} className="w-4 h-4 mr-2" />
              Add New Book
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Books</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBooks}</p>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+12%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalSales.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+8%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+15%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faDollarSign} className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.averageRating.toFixed(1)}</p>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-gray-500">out of 5.0</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

          {/* Alert Cards */}
          {(stats.lowStockCount > 0 || stats.outOfStockCount > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stats.lowStockCount > 0 && (
                <div className="group bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm border border-amber-200/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-6 rounded-3xl shadow-xl mr-8 group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon icon={faWarning} className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-amber-800 mb-3">Low Stock Alert</h3>
                      <p className="text-amber-700 text-xl font-bold mb-4">
                        {stats.lowStockCount} book{stats.lowStockCount !== 1 ? 's' : ''} are running low on stock
                      </p>
                      <div className="flex items-center text-base text-amber-600 font-semibold">
                        <FontAwesomeIcon icon={faExclamationCircle} className="w-5 h-5 mr-3" />
                        <span>Consider restocking soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {stats.outOfStockCount > 0 && (
                <div className="group bg-gradient-to-br from-red-50/80 to-rose-50/80 backdrop-blur-sm border border-red-200/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-red-500 to-rose-500 p-6 rounded-3xl shadow-xl mr-8 group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon icon={faExclamationCircle} className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-red-800 mb-3">Out of Stock</h3>
                      <p className="text-red-700 text-xl font-bold mb-4">
                        {stats.outOfStockCount} book{stats.outOfStockCount !== 1 ? 's' : ''} are out of stock
                      </p>
                      <div className="flex items-center text-base text-red-600 font-semibold">
                        <FontAwesomeIcon icon={faTimesCircle} className="w-5 h-5 mr-3" />
                        <span>Immediate restocking required</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Search and Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <div className="relative">
                  <FontAwesomeIcon icon={faSearch} className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search books, authors, ISBN, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 border-2 border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-xl font-semibold bg-white/80 shadow-xl transition-all duration-300 hover:shadow-2xl placeholder-slate-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-6">
                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="appearance-none px-8 py-5 border-2 border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/80 shadow-xl font-bold text-slate-700 hover:shadow-2xl transition-all duration-300 pr-12 text-lg"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faChevronDown} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none px-8 py-5 border-2 border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/80 shadow-xl font-bold text-slate-700 hover:shadow-2xl transition-all duration-300 pr-12 text-lg"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faChevronDown} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="group px-8 py-5 border-2 border-blue-200 rounded-3xl hover:bg-blue-50 hover:border-blue-300 flex items-center space-x-4 font-bold text-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                >
                  <FontAwesomeIcon icon={faFilter} className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span>More Filters</span>
                  <FontAwesomeIcon icon={showFilters ? faChevronUp : faChevronDown} className="w-5 h-5" />
                </button>
              </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filterPriceRange[0]}
                      onChange={(e) => setFilterPriceRange([parseFloat(e.target.value) || 0, filterPriceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filterPriceRange[1]}
                      onChange={(e) => setFilterPriceRange([filterPriceRange[0], parseFloat(e.target.value) || 1000])}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={1}>1+ Stars</option>
                    <option value={2}>2+ Stars</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <div className="flex space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                      <option value="price">Price</option>
                      <option value="sales">Sales</option>
                      <option value="rating">Rating</option>
                      <option value="createdAt">Date Added</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedBooks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    {selectedBooks.length} book{selectedBooks.length !== 1 ? 's' : ''} selected
                  </span>
                  <button
                    onClick={() => setSelectedBooks([])}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear Selection
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
                    <span>Activate</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('archive')}
                    className="px-4 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faArchive} className="w-4 h-4" />
                    <span>Archive</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('export')}
                    className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faFileExport} className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Controls and Results */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Books ({filteredAndSortedBooks.length})
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <FontAwesomeIcon icon={faTh} className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <FontAwesomeIcon icon={faList} className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Items per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>
            </div>
          </div>

          {/* Books Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {paginatedBooks.map((book) => (
                <div key={book.id} className="group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 left-4">
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => handleSelectBook(book.id)}
                        className="w-6 h-6 rounded-lg border-2 border-white/80 text-indigo-600 focus:ring-indigo-500 bg-white/90 shadow-lg"
                      />
                    </div>
                    
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      {book.featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Featured
                        </span>
                      )}
                      {book.bestseller && (
                        <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-gray-600 text-base mb-4 font-medium">{book.author}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-gray-900">${book.price}</span>
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                        <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-bold text-gray-700">{book.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Stock</p>
                        <p className={`text-lg font-bold ${getStockColor(book.stock)}`}>
                          {book.stock}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Sales</p>
                        <p className="text-lg font-bold text-gray-700">
                          {book.sales}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(book.status)}`}>
                        {book.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {book.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="group/btn text-indigo-600 hover:text-indigo-800 p-3 rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-110">
                        <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleEditBook(book)}
                        className="group/btn text-emerald-600 hover:text-emerald-800 p-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-110"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBook(book.id)}
                        className="group/btn text-red-600 hover:text-red-800 p-3 rounded-xl hover:bg-red-50 transition-all duration-300 hover:scale-110"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-3xl border-2 border-gray-100 shadow-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-8 py-6 text-left">
                      <input
                        type="checkbox"
                        checked={selectedBooks.length === paginatedBooks.length && paginatedBooks.length > 0}
                        onChange={handleSelectAll}
                        className="w-5 h-5 rounded-lg border-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => handleSort('title')}>
                      <div className="flex items-center space-x-2">
                        <span>Book</span>
                        <FontAwesomeIcon icon={sortBy === 'title' ? (sortOrder === 'asc' ? faSortUp : faSortDown) : faSort} className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => handleSort('author')}>
                      <div className="flex items-center space-x-2">
                        <span>Author</span>
                        <FontAwesomeIcon icon={sortBy === 'author' ? (sortOrder === 'asc' ? faSortUp : faSortDown) : faSort} className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Category</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => handleSort('price')}>
                      <div className="flex items-center space-x-2">
                        <span>Price</span>
                        <FontAwesomeIcon icon={sortBy === 'price' ? (sortOrder === 'asc' ? faSortUp : faSortDown) : faSort} className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => handleSort('sales')}>
                      <div className="flex items-center space-x-2">
                        <span>Sales</span>
                        <FontAwesomeIcon icon={sortBy === 'sales' ? (sortOrder === 'asc' ? faSortUp : faSortDown) : faSort} className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => handleSort('rating')}>
                      <div className="flex items-center space-x-2">
                        <span>Rating</span>
                        <FontAwesomeIcon icon={sortBy === 'rating' ? (sortOrder === 'asc' ? faSortUp : faSortDown) : faSort} className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {paginatedBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedBooks.includes(book.id)}
                          onChange={() => handleSelectBook(book.id)}
                          className="w-5 h-5 rounded-lg border-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 h-20 bg-gray-200 rounded-2xl flex-shrink-0 mr-6 overflow-hidden shadow-lg">
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{book.title}</div>
                            <div className="text-sm text-gray-500 font-medium">ISBN: {book.isbn || 'N/A'}</div>
                            <div className="flex space-x-2 mt-2">
                              {book.featured && (
                                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  Featured
                                </span>
                              )}
                              {book.bestseller && (
                                <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  Bestseller
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-semibold text-gray-900">
                        {book.author}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="inline-flex px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-xl font-bold text-gray-900">
                        ${book.price}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-lg font-bold ${getStockColor(book.stock)}`}>
                            {book.stock}
                          </span>
                          {book.stock === 0 && (
                            <FontAwesomeIcon icon={faExclamationCircle} className="w-5 h-5 text-red-500 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-bold text-gray-900">
                        {book.sales.toLocaleString()}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-full">
                          <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-yellow-400 mr-2" />
                          <span className="text-lg font-bold text-gray-900">{book.rating}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-full ${getStatusColor(book.status)}`}>
                          {book.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-800 p-3 rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-110">
                            <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleEditBook(book)}
                            className="text-emerald-600 hover:text-emerald-800 p-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-110"
                          >
                            <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteBook(book.id)}
                            className="text-red-600 hover:text-red-800 p-3 rounded-xl hover:bg-red-50 transition-all duration-300 hover:scale-110"
                          >
                            <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-3xl p-8 border border-gray-200/50">
            <div className="text-lg font-semibold text-gray-700">
              Showing <span className="font-bold text-indigo-600">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-indigo-600">{Math.min(endIndex, filteredAndSortedBooks.length)}</span> of{' '}
              <span className="font-bold text-indigo-600">{filteredAndSortedBooks.length}</span> results
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="group px-6 py-3 text-sm font-semibold border-2 border-gray-300 rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Previous
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 hover:scale-110 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'border-2 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="group px-6 py-3 text-sm font-semibold border-2 border-gray-300 rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                Next
                <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
          onSave={editingBook ? handleUpdateBook : handleBookUpload}
          editingBook={editingBook}
        />
    </AdminLayout>
  );
}
