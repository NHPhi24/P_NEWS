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
import './App.scss'

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