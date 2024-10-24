import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./customer/Components/Navbar/Navigation";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminRoutes from "./Routers/AdminRoutes";
import NotFound from "./Pages/Notfound";
import AdminPannel from "./Admin/AdminPannel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "./Redux/Auth/Action";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add a loading state
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt)).then(() => setLoading(false)); // Set loading to false after user is fetched
    } else {
      setLoading(false); // If no jwt, we are not loading
    }
  }, [jwt]);

  if (loading) {
    return <div>Loading...</div>; // You can show a spinner or any loading screen here
  }

  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        {auth.user?.role === "ROLE_ADMIN" && (
          <Route path="/admin/*" element={<AdminPannel />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;