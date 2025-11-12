import { useState, useEffect, useMemo } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import {
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  BookOpen,
  Users,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  Printer,
  Mail,
  Share
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

export function Reports() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Science Fiction', label: 'Science Fiction' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Biography', label: 'Biography' }
  ];

  const [reportsData] = useState({
    overview: {
      totalRevenue: 125430.50,
      totalOrders: 2847,
      totalBooksSold: 5678,
      averageOrderValue: 44.05,
      revenueGrowth: 12.5,
      ordersGrowth: 8.3,
      booksSoldGrowth: 15.2,
      conversionRate: 3.2
    },
    dailyIncome: [
      { date: '2024-01-15', revenue: 2450.75, orders: 45, booksSold: 89 },
      { date: '2024-01-14', revenue: 2890.50, orders: 52, booksSold: 98 },
      { date: '2024-01-13', revenue: 3120.25, orders: 58, booksSold: 112 },
      { date: '2024-01-12', revenue: 1980.00, orders: 38, booksSold: 76 },
      { date: '2024-01-11', revenue: 2650.80, orders: 49, booksSold: 94 },
      { date: '2024-01-10', revenue: 2780.90, orders: 51, booksSold: 102 },
      { date: '2024-01-09', revenue: 2340.60, orders: 44, booksSold: 87 }
    ],
    bestSellingBooks: [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        sales: 156,
        revenue: 2028.00,
        growth: 12.5,
        coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg=='
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Fiction',
        sales: 142,
        revenue: 2129.00,
        growth: 8.7,
        coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg=='
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        category: 'Science Fiction',
        sales: 128,
        revenue: 1791.00,
        growth: -2.1,
        coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg=='
      },
      {
        id: 4,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        category: 'Romance',
        sales: 115,
        revenue: 1379.00,
        growth: 15.3,
        coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg=='
      },
      {
        id: 5,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        category: 'Fantasy',
        sales: 108,
        revenue: 1726.00,
        growth: 22.1,
        coverImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA3NUw0MCA5MEg2MEw1MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMCI+Qm9vazwvdGV4dD4KPC9zdmc+Cg=='
      }
    ],
    salesReports: [
      {
        id: 'RPT-001',
        period: '2024-01-15',
        totalRevenue: 2450.75,
        totalOrders: 45,
        totalBooksSold: 89,
        averageOrderValue: 54.46,
        topCategory: 'Fiction',
        paymentMethods: { card: 32, paypal: 8, bank: 5 },
        status: 'completed'
      },
      {
        id: 'RPT-002',
        period: '2024-01-14',
        totalRevenue: 2890.50,
        totalOrders: 52,
        totalBooksSold: 98,
        averageOrderValue: 55.59,
        topCategory: 'Non-Fiction',
        paymentMethods: { card: 38, paypal: 10, bank: 4 },
        status: 'completed'
      },
      {
        id: 'RPT-003',
        period: '2024-01-13',
        totalRevenue: 3120.25,
        totalOrders: 58,
        totalBooksSold: 112,
        averageOrderValue: 53.80,
        topCategory: 'Fiction',
        paymentMethods: { card: 42, paypal: 12, bank: 4 },
        status: 'completed'
      }
    ],
    categoryPerformance: [
      { category: 'Fiction', revenue: 45678.90, orders: 892, booksSold: 1245, growth: 12.5 },
      { category: 'Non-Fiction', revenue: 34567.80, orders: 678, booksSold: 892, growth: 8.3 },
      { category: 'Science Fiction', revenue: 23456.70, orders: 456, booksSold: 567, growth: 15.2 },
      { category: 'Romance', revenue: 19876.50, orders: 389, booksSold: 423, growth: 5.7 },
      { category: 'Mystery', revenue: 16789.40, orders: 334, booksSold: 298, growth: -2.1 },
      { category: 'Biography', revenue: 14567.30, orders: 289, booksSold: 201, growth: 9.8 }
    ]
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Data is already set in state
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [dateRange, selectedCategory]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const filteredBooks = useMemo(() => {
    return reportsData.bestSellingBooks.filter(book =>
      (selectedCategory === 'all' || book.category === selectedCategory) &&
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [reportsData.bestSellingBooks, selectedCategory, searchTerm]);

  const exportReport = (type) => {
    const data = {
      overview: reportsData.overview,
      bestSellingBooks: filteredBooks,
      dailyIncome: reportsData.dailyIncome,
      categoryPerformance: reportsData.categoryPerformance,
      generatedAt: new Date().toISOString(),
      filters: { dateRange, category: selectedCategory }
    };

    if (type === 'json') {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sales-report-${dateRange}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (type === 'csv') {
      // Simple CSV export for books
      const csvContent = [
        ['Title', 'Author', 'Category', 'Sales', 'Revenue', 'Growth'],
        ...filteredBooks.map(book => [
          book.title,
          book.author,
          book.category,
          book.sales,
          book.revenue,
          book.growth
        ])
      ].map(row => row.join(',')).join('\n');

      const dataBlob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `best-selling-books-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col space-y-2 items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-emerald-600"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sales', label: 'Sales Reports', icon: DollarSign },
    { id: 'books', label: 'Best Sellers', icon: BookOpen },
    { id: 'income', label: 'Daily Income', icon: TrendingUp },
    { id: 'categories', label: 'Categories', icon: PieChart }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive sales reports and business insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Export dropdown would go here */}
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search books or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Total Revenue</p>
                      <p className="text-3xl font-bold text-green-900 mt-2">
                        {formatCurrency(reportsData.overview.totalRevenue)}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          {formatPercentage(reportsData.overview.revenueGrowth)}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total Orders</p>
                      <p className="text-3xl font-bold text-blue-900 mt-2">
                        {formatNumber(reportsData.overview.totalOrders)}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                        <span className="text-sm text-blue-600 font-medium">
                          {formatPercentage(reportsData.overview.ordersGrowth)}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Books Sold</p>
                      <p className="text-3xl font-bold text-purple-900 mt-2">
                        {formatNumber(reportsData.overview.totalBooksSold)}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                        <span className="text-sm text-purple-600 font-medium">
                          {formatPercentage(reportsData.overview.booksSoldGrowth)}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Avg Order Value</p>
                      <p className="text-3xl font-bold text-orange-900 mt-2">
                        {formatCurrency(reportsData.overview.averageOrderValue)}
                      </p>
                      <div className="flex items-center mt-2">
                        <Activity className="w-4 h-4 text-orange-500 mr-1" />
                        <span className="text-sm text-orange-600 font-medium">
                          {reportsData.overview.conversionRate}% conversion
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => exportReport('json')}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Export Full Report</h3>
                      <p className="text-sm text-gray-600">Download complete analytics data</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => exportReport('csv')}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Export Books Data</h3>
                      <p className="text-sm text-gray-600">CSV format for best sellers</p>
                    </div>
                  </div>
                </button>

                <button className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-left group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Share className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Share Report</h3>
                      <p className="text-sm text-gray-600">Generate shareable link</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Sales Reports Tab */}
          {activeTab === 'sales' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Books Sold
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Order
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
                    {reportsData.salesReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(report.period).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(report.totalRevenue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.totalOrders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.totalBooksSold}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(report.averageOrderValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 p-1 rounded">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Best Selling Books Tab */}
          {activeTab === 'books' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book, index) => (
                  <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${book.growth > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {formatPercentage(book.growth)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                      <p className="text-xs text-blue-600 font-medium mb-4">{book.category}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Sales</p>
                          <p className="text-lg font-bold text-gray-900">{book.sales}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Revenue</p>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(book.revenue)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Income Tab */}
          {activeTab === 'income' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Today's Revenue</p>
                      <p className="text-2xl font-bold text-green-900 mt-2">
                        {formatCurrency(reportsData.dailyIncome[0].revenue)}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        {reportsData.dailyIncome[0].orders} orders
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">7-Day Average</p>
                      <p className="text-2xl font-bold text-blue-900 mt-2">
                        {formatCurrency(
                          reportsData.dailyIncome.reduce((sum, day) => sum + day.revenue, 0) / 7
                        )}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        {Math.round(reportsData.dailyIncome.reduce((sum, day) => sum + day.orders, 0) / 7)} orders/day
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Best Day</p>
                      <p className="text-2xl font-bold text-purple-900 mt-2">
                        {formatCurrency(Math.max(...reportsData.dailyIncome.map(d => d.revenue)))}
                      </p>
                      <p className="text-sm text-purple-600 mt-1">
                        {new Date(reportsData.dailyIncome.reduce((max, day) =>
                          day.revenue > max.revenue ? day : max
                        ).date).toLocaleDateString()}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Daily Income Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Income Trend</h3>
                <div className="h-64 flex items-end space-x-4">
                  {reportsData.dailyIncome.map((day, index) => {
                    const maxRevenue = Math.max(...reportsData.dailyIncome.map(d => d.revenue));
                    const height = (day.revenue / maxRevenue) * 100;

                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg shadow-lg relative group"
                          style={{ height: `${height}%` }}>
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {formatCurrency(day.revenue)}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 font-medium">
                          {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {day.orders} orders
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Daily Income Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Daily Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Books Sold
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg Order Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportsData.dailyIncome.map((day) => (
                        <tr key={day.date} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {new Date(day.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {formatCurrency(day.revenue)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {day.orders}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {day.booksSold}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(day.revenue / day.orders)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reportsData.categoryPerformance.map((category) => {
                  const totalRevenue = reportsData.categoryPerformance.reduce((sum, cat) => sum + cat.revenue, 0);
                  const percentage = (category.revenue / totalRevenue) * 100;

                  return (
                    <div key={category.category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${category.growth > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {formatPercentage(category.growth)}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Revenue</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(category.revenue)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Orders</p>
                            <p className="text-lg font-bold text-gray-900">{category.orders}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Books Sold</p>
                            <p className="text-lg font-bold text-gray-900">{category.booksSold}</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Market Share</span>
                            <span className="font-medium">{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}