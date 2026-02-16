import { Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import { NavBarMain } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { LandingPage } from "./pages/LandingPage"
import { ViewPostPage } from "./pages/ViewPostPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"

import { ProfilePage } from "./pages/ProfilePage"
import { ResetPasswordPage } from "./pages/ResetPasswordPage"

import { AdminLoginPage } from "./pages/admin/AdminLoginPage"
import { AdminArticleListPage } from "./pages/admin/AdminArticleListPage"
import { AdminCreateArticlePage } from "./pages/admin/AdminCreateArticlePage"
import { AdminEditArticlePage } from "./pages/admin/AdminEditArticlePage"
import { AdminCategoryListPage } from "./pages/admin/AdminCategoryListPage"
import { AdminCreateCategoryPage } from "./pages/admin/AdminCreateCategoryPage"
import { AdminEditCategoryPage } from "./pages/admin/AdminEditCategoryPage"
import { AdminProfilePage } from "./pages/admin/AdminProfilePage"
import { AdminNotificationPage } from "./pages/admin/AdminNotificationPage"
import { AdminResetPasswordPage } from "./pages/admin/AdminResetPasswordPage"

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const shouldShowFooter = location.pathname === "/" || location.pathname.startsWith("/post/");

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {!isAdminRoute && (
        <header className="w-full">
          <NavBarMain />
        </header>
      )}
      <main className="grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/articles" element={<AdminArticleListPage />} />
          <Route path="/admin/articles/create" element={<AdminCreateArticlePage />} />
          <Route path="/admin/articles/edit/:id" element={<AdminEditArticlePage />} />

          <Route path="/admin/categories" element={<AdminCategoryListPage />} />
          <Route path="/admin/categories/create" element={<AdminCreateCategoryPage />} />
          <Route path="/admin/categories/edit/:id" element={<AdminEditCategoryPage />} />

          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/notifications" element={<AdminNotificationPage />} />
          <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />

          {/* Redirect /admin to /admin/articles for now */}
          <Route path="/admin" element={<AdminLoginPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <div className="h-20" />
      </main>
      {shouldShowFooter && <Footer />}
      <Toaster />
    </div>
  )
}


export default App
