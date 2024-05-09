import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Home from "./pages/home";
import UserProfile from "./pages/profile";
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
      element: <Home/>,
    },
    {
      path: "/subscribe",
      element: <PricingPage/>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;