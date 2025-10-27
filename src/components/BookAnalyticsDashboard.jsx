import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  Star,
  BookOpen,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react';

export function BookAnalyticsDashboard({ bookId, className = "" }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  // Mock analytics data
  const mockAnalytics = {
    views: { current: 1247, previous: 892, change: 39.8 },
    sales: { current: 156, previous: 98, change: 59.2 },
    wishlist: { current: 89, previous: 67, change: 32.8 },
    rating: { current: 4.6, previous: 4.4, change: 4.5 },
    reviews: { current: 234, previous: 198, change: 18.2 },
    readingTime: { average: 8.5, median: 7.2 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 25 },
        { range: '25-34', percentage: 35 },
        { range: '35-44', percentage: 22 },
        { range: '45+', percentage: 18 }
      ],
      gender: [
        { type: 'Female', percentage: 62 },
        { type: 'Male', percentage: 35 },
        { type: 'Other', percentage: 3 }
      ]
    },
    trends: [
      { day: 'Mon', views: 120, sales: 15 },
      { day: 'Tue', views: 145, sales: 18 },
      { day: 'Wed', views: 132, sales: 12 },
      { day: 'Thu', views: 167, sales: 22 },
      { day: 'Fri', views: 189, sales: 28 },
      { day: 'Sat', views: 156, sales: 19 },
      { day: 'Sun', views: 134, sales: 16 }
    ]
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [bookId, timeRange]);

  if (loading) {
    return (
      <div className={`${className} bg-white rounded-xl shadow-lg p-6`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className={`${className} bg-white rounded-xl shadow-lg p-6`}>
        <div className="text-center text-gray-500">
          Analytics data not available
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => {
    const isPositive = change > 0;
    const colorClasses = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      orange: "text-orange-600"
    };

    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`w-5 h-5 ${colorClasses[color]}`} />
          </div>
          <div className={`flex items-center text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
    );
  };

  return (
    <div className={`${className} bg-white rounded-xl shadow-lg p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Book Analytics</h3>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Page Views"
          value={analytics.views.current.toLocaleString()}
          change={analytics.views.change}
          icon={Eye}
          color="blue"
        />
        <StatCard
          title="Sales"
          value={analytics.sales.current}
          change={analytics.sales.change}
          icon={BookOpen}
          color="green"
        />
        <StatCard
          title="Wishlist Adds"
          value={analytics.wishlist.current}
          change={analytics.wishlist.change}
          icon={Heart}
          color="purple"
        />
        <StatCard
          title="Average Rating"
          value={analytics.rating.current}
          change={analytics.rating.change}
          icon={Star}
          color="orange"
        />
      </div>

      {/* Reading Time */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Reading Time Insights</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Average Reading Time</div>
            <div className="text-2xl font-bold text-gray-900">{analytics.readingTime.average}h</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Median Reading Time</div>
            <div className="text-2xl font-bold text-gray-900">{analytics.readingTime.median}h</div>
          </div>
        </div>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Age Distribution</h4>
          <div className="space-y-2">
            {analytics.demographics.ageGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{group.range}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{group.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Gender Distribution</h4>
          <div className="space-y-2">
            {analytics.demographics.gender.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{group.type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{group.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Trends */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Weekly Trends</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-7 gap-2">
            {analytics.trends.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                <div className="space-y-1">
                  <div className="text-xs text-blue-600 font-medium">{day.views} views</div>
                  <div className="text-xs text-green-600 font-medium">{day.sales} sales</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}