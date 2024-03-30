import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsSeller } from "../../features/shop/shopSlice";

const ShopProtectedRoute = ({ children }) => {
  const isSeller = useSelector(selectIsSeller);

  if (!isSeller) {
    return <Navigate to={`/shop-login`} replace />;
  }

  return children;
};
export default ShopProtectedRoute;
