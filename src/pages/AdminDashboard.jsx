import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BookUploadModal } from '../components/BookUploadModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faBookOpen, 
  faShoppingCart, 
  faDollar, 
  faChartLine, 
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faSearch,
  faFilter,
  faDownload,
  faUpload,
  faChartBar,
  faClock,
  faStar,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

export function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setBooks([
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
            status: 'active'
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
            status: 'active'
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
            status: 'active'
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
            coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg==',
            status: 'out_of_stock'
          },
        ]);
        
        setOrders([
          { 
            id: 'ORD-001', 
            customer: 'John Doe', 
            total: 45.98, 
            status: 'shipped', 
            date: '2024-01-15',
            items: 3,
            paymentMethod: 'Credit Card'
          },
          { 
            id: 'ORD-002', 
            customer: 'Jane Smith', 
            total: 28.99, 
            status: 'pending', 
            date: '2024-01-14',
            items: 2,
            paymentMethod: 'PayPal'
          },
          { 
            id: 'ORD-003', 
            customer: 'Bob Johnson', 
            total: 67.50, 
            status: 'delivered', 
            date: '2024-01-13',
            items: 4,
            paymentMethod: 'Credit Card'
          },
          { 
            id: 'ORD-004', 
            customer: 'Alice Brown', 
            total: 23.99, 
            status: 'cancelled', 
            date: '2024-01-12',
            items: 1,
            paymentMethod: 'Credit Card'
          },
        ]);
        
        setUsers([
          { 
            id: 1, 
            name: 'John Doe', 
            email: 'john@example.com', 
            role: 'customer', 
            joinDate: '2024-01-01',
            orders: 5,
            totalSpent: 234.50,
            status: 'active'
          },
          { 
            id: 2, 
            name: 'Jane Smith', 
            email: 'jane@example.com', 
            role: 'customer', 
            joinDate: '2024-01-05',
            orders: 3,
            totalSpent: 156.75,
            status: 'active'
          },
          { 
            id: 3, 
            name: 'Admin User', 
            email: 'admin@example.com', 
            role: 'admin', 
            joinDate: '2023-12-01',
            orders: 0,
            totalSpent: 0,
            status: 'active'
          },
          { 
            id: 4, 
            name: 'Mike Wilson', 
            email: 'mike@example.com', 
            role: 'customer', 
            joinDate: '2024-01-10',
            orders: 1,
            totalSpent: 45.99,
            status: 'inactive'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { 
      name: 'Total Books', 
      value: '1,234', 
      icon: faBookOpen, 
      change: '+12%', 
      changeType: 'positive',
      color: 'blue'
    },
    { 
      name: 'Total Orders', 
      value: '456', 
      icon: faShoppingCart, 
      change: '+8%', 
      changeType: 'positive',
      color: 'green'
    },
    { 
      name: 'Total Revenue', 
      value: '$12,345', 
      icon: faDollar, 
      change: '+15%', 
      changeType: 'positive',
      color: 'purple'
    },
    { 
      name: 'Total Users', 
      value: '789', 
      icon: faUsers, 
      change: '+5%', 
      changeType: 'positive',
      color: 'orange'
    },
  ];

  const recentActivities = [
    { id: 1, type: 'order', message: 'New order #ORD-005 received', time: '2 minutes ago', icon: faShoppingCart },
    { id: 2, type: 'book', message: 'Book "The Hobbit" added to inventory', time: '1 hour ago', icon: faBookOpen },
    { id: 3, type: 'user', message: 'New user registered: Sarah Connor', time: '3 hours ago', icon: faUsers },
    { id: 4, type: 'order', message: 'Order #ORD-003 marked as delivered', time: '5 hours ago', icon: faShoppingCart },
  ];

  const handleBookUpload = (bookData) => {
    console.log('Uploading book:', bookData);
    // Here you would typically send the data to your API
    // For now, we'll just add it to the local state
    const newBook = {
      id: books.length + 1,
      ...bookData,
      sales: 0,
      rating: 0,
      coverImage: '/api/placeholder/100/150',
      status: 'active'
    };
    setBooks(prev => [newBook, ...prev]);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  if (loading) {
    return <LoadingSpinner size="xl" text="Loading dashboard..." className="min-h-screen" />;
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}</p>
      </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <div className="flex items-center mt-2">
                         <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                      <FontAwesomeIcon icon={stat.icon} className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View all
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{order.id}</div>
                              <div className="text-sm text-gray-500">{order.items} items</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${order.total}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon icon={activity.icon} className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Books Management */}
            <div className="mt-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Books Management</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                      />
                    </div>
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
                    >
                      <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />
                      <span>Upload Book</span>
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
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
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-12 h-16 bg-gray-200 rounded-lg flex-shrink-0 mr-4">
                                <img 
                                  src={book.coverImage} 
                                  alt={book.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                <div className="text-sm text-gray-500">ISBN: {book.isbn || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {book.author}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {book.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${book.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`text-sm font-medium ${
                                book.stock === 0 ? 'text-red-600' : 
                                book.stock < 10 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {book.stock}
                              </span>
                              {book.stock === 0 && (
                                <FontAwesomeIcon icon={faExclamationCircle} className="w-4 h-4 text-red-500 ml-1" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {book.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-900">{book.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded">
                                <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 p-1 rounded">
                                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

      {/* Upload Modal */}
      <BookUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSave={handleBookUpload}
      />
    </>
  );
}
