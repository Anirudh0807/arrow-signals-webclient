import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Home from "./pages/home";
import UserProfile from "./pages/profile";
import MarketsAndExchanges from "./pages/markets";
import AdminHome from "./pages/adminHome";
import PricingPage from "./pages/subsciption";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <SignupPage />,
      children: [],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/subscribe",
      element: <PricingPage />,
    },
    {
      path: "/markets",
      element: <MarketsAndExchanges />,
    },
    {
      path: "/admin/home",
      element: <AdminHome />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
