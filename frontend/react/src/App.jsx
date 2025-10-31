import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer/Footer'
import Toast from './components/common/Toast/Toast'
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute'
import Home from './pages/Home/Home'
import NewsDetail from './pages/News/NewsDetail'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard'
import AuthorDashboard from './pages/Author/Dashboard/AuthorDashboard'
import { AuthProvider } from './hooks/useAuth'
import NewsCreate from './pages/Admin/News/NewsCreate'
import NewsEdit from './pages/Admin/news/NewsEdit'
import './App.scss'
import UserEdit from './pages/Admin/Users/UserEdit'
import AuthorEdit from './pages/Admin/Authors/AuthorEdit'
import CategoryCreate from './pages/Admin/Category/CategoryCreate'
import CategoryEdit from './pages/Admin/Category/CategoryEdit'
import NewsEditAuthor from './pages/Author/News/NewsEditAuthor'
import NewsCreateAuthor from './pages/Author/News/NewsCreateAuthor'
import Contact from './pages/Contact/Contact'
import Profile from './pages/Profile/Profile'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải P_NEWS...</p>
      </div>
    )
  }

  return (
    <AuthProvider>
      <div className="app">
        {/* Toast Notifications */}
        <Toast />
        
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:id" element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={<Profile/>} />
            {/* Protected Dashboard Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/author/dashboard" 
              element={
                <ProtectedRoute requiredRole="author">
                  <AuthorDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/news/create" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <NewsCreate />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin/categories/create" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <CategoryCreate/>
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/admin/news/:id" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <NewsEdit />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/dashboard/admin/users/:id" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <UserEdit/>
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/admin/authors/:id" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AuthorEdit/>
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/admin/categories/:id" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <CategoryEdit/>
                </ProtectedRoute>
              }
            />

            <Route 
              path="/author/news/create" 
              element={
                <ProtectedRoute requiredRole="author">
                  <NewsCreateAuthor/>
                </ProtectedRoute>
              }
            />

            <Route 
              path="/dashboard/author/news/:id" 
              element={
                <ProtectedRoute requiredRole="author">
                  <NewsEditAuthor/>
                </ProtectedRoute>
              }
            />


            
            
            
            {/* Redirects */}
            <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/author" element={<Navigate to="/author/dashboard" replace />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App