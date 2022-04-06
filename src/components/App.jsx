/** @format */
import { Suspense, lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import LoadingSpinner from "./reusable/LoadingSpinner";
const CategoryPage = lazy(() => import("./ecom/CategoryPage"));
const MainPage = lazy(() => import("./ecom/MainPage"));
const CartPage = lazy(() => import("./ecom/CartPage"));
const ProdDetails = lazy(() => import("./ecom/ProdDetails"));
const ReviewPage = lazy(() => import("./ecom/ReviewPage"));
const App = () => {
  // console.log('TEST :  > ');
  return (
    <div className="ui grid center aligned">
      <div className="ui fifteen wide column">
        <Suspense fallback={<LoadingSpinner />}>
          <HashRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/ecom/categories/:id" element={<CategoryPage />} />
                <Route path="/ecom/cartPage" element={<CartPage />} />
                <Route path="/ecom/prodDetails/:id" element={<ProdDetails />} />
                <Route path="/ecom/ReviewPage/:id" element={<ReviewPage />} />
              </Routes>
            </Layout>
          </HashRouter>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
