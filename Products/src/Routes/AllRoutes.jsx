
import { Route, Routes } from "react-router-dom";


import Products from "../Components/Products";
import ProductDetail from "../Pages/ProductDetail";


const Allroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
    );
}

export default Allroutes;
