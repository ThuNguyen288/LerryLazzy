import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Item from "../components/Item";
import NavBar from "../components/NavBar";

const categoryMap = {
    wool: 1,
    product: 2,
    material: 3,
    tool: 4
};

const subcategoryMap = {
    animal: 1,
    plant: 2,
    food: 3,
    cloth: 4,
    accessory: 5,
    mochi: 6,
    other: 7
}

const ProductPage = () => {
    const { category, subcategory } = useParams();

    const categoryid = category ? categoryMap[category.toLowerCase()] : null;
    const subcategoryid = subcategory ? subcategoryMap[subcategory.toLowerCase()] : null;

    return (
        <div>
            <NavBar />
            <div className="container my-5">
                {categoryid && <Item categoryid={categoryid} />}
                {subcategoryid && <Item subcategoryid={subcategoryid} />}
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;
