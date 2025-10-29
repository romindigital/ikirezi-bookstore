import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, Clock, CheckCircle, XCircle, ShoppingBag, ArrowDown, Filter } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { formatPrice } from '../utils/formatPrice';

const mockOrders = [
  {
    id: '1',
    date: '2023-10-25',
    status: 'delivered',
    total: 89.97,
    items: [
      {
        id: '1',
        title: 'The Midnight Library',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop'
      },
      {
        id: '2',
        title: 'Atomic Habits',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=120&h=180&fit=crop'
      }
    ]
  },
  // Add more mock orders as needed
];

const statusColors = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const StatusBadge = ({ status }) => {
  const { t } = useTranslation();
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {status === 'delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
      {status === 'cancelled' && <XCircle className="w-3 h-3 mr-1" />}
      {status === 'processing' && <Clock className="w-3 h-3 mr-1" />}
      {status === 'shipped' && <Package className="w-3 h-3 mr-1" />}
      {t(`orders.status.${status}`)}
    </span>
  );
};

export default function Orders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sort === 'newest') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sort === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sort === 'highest') {
      return b.total - a.total;
    }
    return a.total - b.total;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t('orders.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t('orders.title')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('orders.subtitle')}</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('orders.no_orders')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('orders.no_orders_description')}
            </p>
            <Link
              to="/books"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {t('orders.start_shopping')}
            </Link>
          </div>
        ) : (
          <>
            {/* Filters and Sorting */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-sm border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">{t('orders.filter.all')}</option>
                    <option value="pending">{t('orders.filter.pending')}</option>
                    <option value="processing">{t('orders.filter.processing')}</option>
                    <option value="shipped">{t('orders.filter.shipped')}</option>
                    <option value="delivered">{t('orders.filter.delivered')}</option>
                    <option value="cancelled">{t('orders.filter.cancelled')}</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4 text-gray-500" />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="text-sm border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="newest">{t('orders.sort.newest')}</option>
                    <option value="oldest">{t('orders.sort.oldest')}</option>
                    <option value="highest">{t('orders.sort.highest')}</option>
                    <option value="lowest">{t('orders.sort.lowest')}</option>
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                {t('orders.total_orders', { count: filteredOrders.length })}
              </p>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {sortedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        {t('orders.order')} #{order.id}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={order.status} />
                      <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        {t('orders.view_details')}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <div key={item.id} className="p-6 flex items-center gap-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {t('orders.quantity')}: {item.quantity}
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {t('orders.total')}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {t('orders.items', { count: order.items.length })}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}