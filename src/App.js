import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./public/Home";
import Signin from "./public/Signin";
import Signup from "./public/Signup";
import VerifyEmail from "./public/VerifyEmail";
import Product from "./public/Product";
import CheckoutPageWrapper from "./public/CheckoutForm";

import Homepage from "./pages/User/Homepage";
import AuctionPage from "./pages/User/AuctionPage";
import ProfilePage from "./pages/User/ProfilePage";
import Auctions from "./pages/User/Auctions";
import BidHistory from "./pages/User/BidHistory";
import Wishlist from "./pages/User/Wishlist";
import Notification from "./pages/User/Notification";

import GroupsPage from "./pages/User/GroupsPage";
import JoinGroupsPage from "./pages/User/JoinGroupsPage";
import CreateGroupPage from "./pages/User/CreateGroupPage";

import ManageAccounts from "./pages/Admin/ManageAccounts";
import ReportsDashboard from "./pages/Admin/ReportsDashboard";
import ValidateOrg from "./pages/Admin/ValidateOrg";

import WebSocketTest from "./pages/WebSocketTest";

import CategoryPage from "./pages/User/CategoryPage";
import SearchResultsPage from "./pages/User/SearchResultsPage";

import "./styles/general.css";
import "./styles/queries.css";
import "./styles/pages.css";
import "./styles/productPage.css";
import "./styles/homePage.css";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" />;

  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/home" element={<Home />} />

      {/* Customer Routes */}

      <Route
        path="/category/:categoryName"
        element={
          <ProtectedRoute allowedRoles={["user", "organization"]}>
            <CategoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute allowedRoles={["user", "organization"]}>
            <SearchResultsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/homepage"
        element={
          <ProtectedRoute allowedRoles={["user", "organization"]}>
            <Homepage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:auctionID"
        element={
          <ProtectedRoute allowedRoles={["user", "organization"]}>
            <Product />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auctionpage"
        element={
          <ProtectedRoute allowedRoles={["user", "organization"]}>
            <AuctionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profilepage"
        element={
          <ProtectedRoute allowedRoles={["user", "organization"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auctions"
        element={
          <ProtectedRoute allowedRoles={["user", "organization"]}>
            <Auctions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bidhistory"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <BidHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification"
        element={
          <ProtectedRoute allowedRoles={["user", "organization"]}>
            <Notification />
          </ProtectedRoute>
        }
      />

      {/* Group Routes - Customer Only */}
      <Route
        path="/groupspage"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <GroupsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/joingroupspage"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <JoinGroupsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creategrouppage"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <CreateGroupPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/manage-accounts"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageAccounts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ReportsDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/validate-org"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ValidateOrg />
          </ProtectedRoute>
        }
      />

      <Route path="/checkout" element={<CheckoutPageWrapper />} />
      <Route path="/wstest" element={<WebSocketTest />} />
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
export default App;
