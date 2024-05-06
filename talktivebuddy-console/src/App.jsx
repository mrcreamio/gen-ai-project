import { Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import PublicRoutes from "./Routing/Public";
import PrivateRoutes from "./Routing/Private";
import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const Home = lazy(() => import("./Pages"));

function App() {
  const reactQC = new QueryClient();
  return (
    <QueryClientProvider client={reactQC}>
      <Router>
        <Suspense fallback={<div className='loading'></div>}>
          <Routes>
            <Route path='/' element={<Navigate to={"/auth/login"} />} />
            <Route path='/*' element={<PublicRoutes />} />
            <Route path='/admin/*' element={<PrivateRoutes />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
