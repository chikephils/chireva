import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectSellerLoading,
  selectIsSeller,
} from "../../features/shop/shopSlice";

const ShopLoginRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsSeller);
  const loading = useSelector(selectSellerLoading);

  if (!loading) {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }
};

export default ShopLoginRoute;
