import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Home } from '../pages/Home';
import { Books } from '../pages/Books';
import { Categories } from '../pages/Categories';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Privacy } from '../pages/Privacy';
import { Terms } from '../pages/Terms';
import { Help } from '../pages/Help';
import { ParallaxDemo } from '../pages/ParallaxDemo';
import { BookDetails } from '../pages/BookDetails';
import { Search } from '../pages/Search';
import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ForgotPassword } from '../pages/ForgotPassword';
import { UserProfile } from '../pages/UserProfile';
import { AdminDashboard } from '../pages/AdminDashboard';
import { BooksManagement } from '../pages/admin/BooksManagement';
import { UsersManagement } from '../pages/admin/UsersManagement';
import { Analytics } from '../pages/admin/Analytics';
import { AdminLayout } from '../components/AdminLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';

function AppRoutes() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Public Routes with Header and Footer */}
          <Route path="/*" element={
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-1 pb-16 md:pb-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/parallax-demo" element={<ParallaxDemo />} />
                  <Route path="/book/:id" element={<BookDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route 
                    path="/checkout" 
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
          
          {/* Admin Routes with AdminLayout only */}
          <Route 
            path="/admin" 
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route 
            path="/admin/books" 
            element={
              <AdminLayout>
                <BooksManagement />
              </AdminLayout>
            }
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminLayout>
                <UsersManagement />
              </AdminLayout>
            }
          />
          <Route 
            path="/admin/analytics" 
            element={
              <AdminLayout>
                <Analytics />
              </AdminLayout>
            }
          />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default AppRoutes;
