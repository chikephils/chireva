import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  OrderPage,
  RefundPage,
  InboxPage,
  InboxDetails,
  ChangePasswordPage,
  AddressPage,
  TrackingDetailsPage,
  CheckoutPage,
  TrackOrderPage,
  OrderDetailsPage,
  PaymentRedirectPage,
  PasswordResetPage,
} from "./Routes/User/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateShopPage,
  SellerActivationPage,
  ShopLoginPage,
  ShopForgotPasswordPage,
  ShopPasswordResetPage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllCoupons,
  ShopAllOrders,
  ShopInboxPage,
  ShopInboxDetails,
  ShopAllRefunds,
  ShopWithdrawalPage,
  ShopSettingsPage,
  ShopPreviewPage,
  ShopOrderDetails,
  ShopTransactionslPage,
} from "./Routes/Shop/Routes";
import { ShopHomePage } from "./ShopRoute";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminOrderDetails,
  AdminDashboardEvents,
  AdminDashboardCoupons,
  AdminWithdrawalRequest,
  AdminWithdrawalDetailsPage,
} from "./Routes/User/AdminRoute";
import ScrollToTop from "./ScrollToTop";
import { getAllProducts } from "./features/product/productSlice";
import { getAllEvents } from "./features/event/eventSlice";
import NotFoundPage from "./pages/NotFoundPage";

const theme = createTheme({});

function App() {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.user?.token));
  const isSellerAuth = Boolean(useSelector((state) => state.shop?.sellerToken));
  const isAdmin = Boolean(
    useSelector((state) => state.user?.user?.role === "Admin")
  );

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <div className="w-screen min-h-[100vh] lg:pr-2">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/login"
              element={isAuth ? <Navigate to="/" /> : <LoginPage />}
            />

            <Route
              path="/register"
              element={isAuth ? <Navigate to="/" /> : <RegisterPage />}
            />

            <Route
              path="/forgotPassword"
              element={isAuth ? <Navigate to="/" /> : <ForgotPasswordPage />}
            />

            <Route
              path="/password-reset/:id/:reset_token"
              element={<PasswordResetPage />}
            />

            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route
              path="/seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/faq" element={<FAQPage />} />

            <Route
              path="/profile"
              element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
            />

            <Route
              path="/profile/orders"
              element={isAuth ? <OrderPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/profile/refunds"
              element={isAuth ? <RefundPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/profile/inbox"
              element={isAuth ? <InboxPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/profile/inbox/:id"
              element={isAuth ? <InboxDetails /> : <Navigate to="/login" />}
            />

            <Route
              path="profile/change-password"
              element={
                isAuth ? <ChangePasswordPage /> : <Navigate to="/login" />
              }
            />

            <Route
              path="profile/address"
              element={isAuth ? <AddressPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/checkout"
              element={isAuth ? <CheckoutPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/pay"
              element={
                isAuth ? <PaymentRedirectPage /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/profile/track-orders"
              element={isAuth ? <TrackOrderPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/user/order/details/:id"
              element={isAuth ? <OrderDetailsPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/user/tracking/details/:id"
              element={
                isAuth ? <TrackingDetailsPage /> : <Navigate to="/login" />
              }
            />

            <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

            {/* shop Routes */}
            <Route
              path="/create-shop"
              element={
                isSellerAuth ? <Navigate to="/dashboard" /> : <CreateShopPage />
              }
            />

            <Route
              path="/shop-login"
              element={
                isSellerAuth ? <Navigate to="/dashboard" /> : <ShopLoginPage />
              }
            />

            <Route
              path="/shop-forgot-password"
              element={
                isSellerAuth ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <ShopForgotPasswordPage />
                )
              }
            />

            <Route
              path="/shop-password-reset/:id/:reset_token"
              element={<ShopPasswordResetPage />}
            />

            <Route
              path="/shop/:id"
              element={
                isSellerAuth ? <ShopHomePage /> : <Navigate to="/shop-login" />
              }
            />

            <Route
              path="/dashboard"
              element={
                isSellerAuth ? (
                  <ShopDashboardPage />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-create-product"
              element={
                isSellerAuth ? (
                  <ShopCreateProduct />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-products"
              element={
                isSellerAuth ? (
                  <ShopAllProducts />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-create-event"
              element={
                isSellerAuth ? (
                  <ShopCreateEvent />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-events"
              element={
                isSellerAuth ? <ShopAllEvents /> : <Navigate to="/shop-login" />
              }
            />

            <Route
              path="/dashboard/coupons"
              element={
                isSellerAuth ? (
                  <ShopAllCoupons />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-orders"
              element={
                isSellerAuth ? <ShopAllOrders /> : <Navigate to="/shop-login" />
              }
            />

            <Route
              path="/dashboard/orders/:id"
              element={
                isSellerAuth ? (
                  <ShopOrderDetails />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-messages"
              element={
                isSellerAuth ? <ShopInboxPage /> : <Navigate to="/shop-login" />
              }
            />

            <Route
              path="/dashboard-messages/:id"
              element={
                isSellerAuth ? (
                  <ShopInboxDetails />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-refunds"
              element={
                isSellerAuth ? (
                  <ShopAllRefunds />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-withdraw-money"
              element={
                isSellerAuth ? (
                  <ShopWithdrawalPage />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-transactions"
              element={
                isSellerAuth ? (
                  <ShopTransactionslPage />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            <Route
              path="/dashboard-settings"
              element={
                isSellerAuth ? (
                  <ShopSettingsPage />
                ) : (
                  <Navigate to="/shop-login" />
                )
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                isAdmin ? <AdminDashboardPage /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/users"
              element={
                isAdmin ? <AdminDashboardUsers /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/sellers"
              element={
                isAdmin ? <AdminDashboardSellers /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/orders"
              element={
                isAdmin ? <AdminDashboardOrders /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/products"
              element={
                isAdmin ? <AdminDashboardProducts /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/events"
              element={
                isAdmin ? <AdminDashboardEvents /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/coupons"
              element={
                isAdmin ? <AdminDashboardCoupons /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/withdraw-request"
              element={
                isAdmin ? <AdminWithdrawalRequest /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/order-details/:id"
              element={
                isAdmin ? <AdminOrderDetails /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/admin/withdrawal-details/:id"
              element={
                isAdmin ? (
                  <AdminWithdrawalDetailsPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </ThemeProvider>
    </>
  );
}

export default App;
