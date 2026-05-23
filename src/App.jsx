import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Routes/Layout";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import DrugSearch from "./Pages/DrugSearch";
import DrugAlternative from "./Pages/DrugAlternative";
import MedicineDetail from "./Pages/MedicineDetail";
import PharmacyDashboard from "./Pages/PharmacyDashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: "/homepage", element: <HomePage /> },
        { path: "/drugsearch", element: <DrugSearch /> },
        { path: "/drugalternative", element: <DrugAlternative /> },
        { path: "/medicine/:id", element: <MedicineDetail /> },          // ← new
        { path: "/pharmacy/dashboard", element: <PharmacyDashboard /> }, // ← new
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
