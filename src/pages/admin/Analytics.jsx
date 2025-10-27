import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BookOpen,
  Eye,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

export function Analytics() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const metrics = [
    { value: 'revenue', label: 'Revenue', icon: DollarSign, color: 'green' },
    { value: 'orders', label: 'Orders', icon: ShoppingCart, color: 'blue' },
    { value: 'users', label: 'Users', icon: Users, color: 'purple' },
    { value: 'books', label: 'Books', icon: BookOpen, color: 'orange' }
  ];

  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalRevenue: 125430,
      totalOrders: 2847,
      totalUsers: 1234,
      totalBooks: 567,
      revenueGrowth: 12.5,
      ordersGrowth: 8.3,
      usersGrowth: 15.2,
      booksGrowth: 5.7
    },
    revenueData: [
      { date: '2024-01-01', revenue: 4200, orders: 45 },
      { date: '2024-01-02', revenue: 3800, orders: 38 },
      { date: '2024-01-03', revenue: 5200, orders: 52 },
      { date: '2024-01-04', revenue: 4800, orders: 48 },
      { date: '2024-01-05', revenue: 6100, orders: 61 },
      { date: '2024-01-06', revenue: 5500, orders: 55 },
      { date: '2024-01-07', revenue: 7200, orders: 72 },
      { date: '2024-01-08', revenue: 6800, orders: 68 },
      { date: '2024-01-09', revenue: 5900, orders: 59 },
      { date: '2024-01-10', revenue: 6400, orders: 64 },
      { date: '2024-01-11', revenue: 7100, orders: 71 },
      { date: '2024-01-12', revenue: 7600, orders: 76 },
      { date: '2024-01-13', revenue: 8200, orders: 82 },
      { date: '2024-01-14', revenue: 7800, orders: 78 },
      { date: '2024-01-15', revenue: 8500, orders: 85 }
    ],
    topBooks: [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', sales: 156, revenue: 2028 },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', sales: 142, revenue: 2129 },
      { id: 3, title: '1984', author: 'George Orwell', sales: 128, revenue: 1791 },
      { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', sales: 115, revenue: 1379 },
      { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', sales: 108, revenue: 1726 }
    ],
    categoryData: [
      { category: 'Fiction', books: 234, sales: 1245, revenue: 15678 },
      { category: 'Non-Fiction', books: 156, sales: 892, revenue: 12345 },
      { category: 'Science Fiction', books: 89, sales: 567, revenue: 7890 },
      { category: 'Romance', books: 67, sales: 423, revenue: 5123 },
      { category: 'Mystery', books: 45, sales: 298, revenue: 3789 },
      { category: 'Biography', books: 34, sales: 201, revenue: 2567 }
    ],
    recentActivity: [
      { id: 1, type: 'order', message: 'New order #ORD-005 received', amount: 45.99, time: '2 minutes ago' },
      { id: 2, type: 'user', message: 'New user registered: Sarah Connor', time: '15 minutes ago' },
      { id: 3, type: 'book', message: 'Book "The Hobbit" added to inventory', time: '1 hour ago' },
      { id: 4, type: 'order', message: 'Order #ORD-003 marked as delivered', amount: 67.50, time: '2 hours ago' },
      { id: 5, type: 'user', message: 'User John Doe made a purchase', amount: 23.99, time: '3 hours ago' }
    ]
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Data is already set in state
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const data = analyticsData.overview;
          let value, growth;
          
          switch (metric.value) {
            case 'revenue':
              value = formatCurrency(data.totalRevenue);
              growth = data.revenueGrowth;
              break;
            case 'orders':
              value = formatNumber(data.totalOrders);
              growth = data.ordersGrowth;
              break;
            case 'users':
              value = formatNumber(data.totalUsers);
              growth = data.usersGrowth;
              break;
            case 'books':
              value = formatNumber(data.totalBooks);
              growth = data.booksGrowth;
              break;
            default:
              value = '0';
              growth = 0;
          }

          return (
            <div key={metric.value} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                  <div className="flex items-center mt-2">
                    {growth > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(growth)}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex space-x-2">
                {metrics.map((metric) => (
                  <button
                    key={metric.value}
                    onClick={() => setSelectedMetric(metric.value)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedMetric === metric.value
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end space-x-2">
              {analyticsData.revenueData.map((data, index) => {
                const maxValue = Math.max(...analyticsData.revenueData.map(d => d.revenue));
                const height = (data.revenue / maxValue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(data.date).getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Books */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Selling Books</h3>
            <div className="space-y-4">
              {analyticsData.topBooks.map((book, index) => (
                <div key={book.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{book.sales} sales</p>
                    <p className="text-xs text-gray-500">{formatCurrency(book.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h3>
          <div className="space-y-4">
            {analyticsData.categoryData.map((category, index) => {
              const totalRevenue = analyticsData.categoryData.reduce((sum, cat) => sum + cat.revenue, 0);
              const percentage = (category.revenue / totalRevenue) * 100;
              
              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    <span className="text-sm text-gray-500">{formatCurrency(category.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{category.books} books</span>
                    <span>{category.sales} sales</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  {activity.amount && (
                    <p className="text-sm text-green-600 font-medium">{formatCurrency(activity.amount)}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}
