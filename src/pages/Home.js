import React from 'react'
// import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

export default function Home() {
    const products = [
        {
            img: "./img/category-1.jpg",
            discount: "30%",
            category: "Boy's T-shirt",
            title: "Bestto Wear",
            price: "R200"
        },
        {
            img: "./img/Furnature/Furnature_4.webp",
            discount: "30%",
            category: "Home Furniture",
            title: "Kitchen Furniture",
            price: "R2500.00"
        },
        {
            img: "./img/Home_Decor/Home_Decor_9.png",
            category: "Home Decor",
            title: "Living Room Decor",
            price: "R5000.00"
        },
        {
            img: "./img/Skin Care/Skin_Product_4.jfif",
            category: "Skin Care Product",
            title: "Lotion",
            price: "R200.00"
        },
        {
            img: "./img/Home_Decor/Home_Decor_6.jpg",
            category: "Home Decor",
            title: "Art",
            price: "R1000.00"
        },
        {
            img: "./img/Skin Care/Skin_Product_2.jpg",
            category: "Skin Care",
            title: "Face Wash",
            price: "R300"
        },
        {
            img: "./img/Furnature/Furnature_5.jpg",
            category: "Home Furniture",
            title: "Kitchen Furniture",
            price: "R15000.00"
        },
        {
            img: "./img/product-12-1.jpg",
            category: "T-Shirt",
            title: "Men's T-Shirt",
            price: "R150.00"
        }
    ]

    const featuredProducts = [
        {
            image: './img/category-1.jpg',
            category: "Boy's T-Shirt",
            title: 'Bestto Wear',
            price: 'R200',
            discount: 30,
        },
        {
            image: './img/category-2.jpg',
            category: "Girl's handbag",
            title: 'Bag',
            price: 'R500',
            discount: 30,
        },
        {
            image: './img/Furnature/Furnature_3.jpg',
            category: 'Furniture',
            title: 'Living Room Furniture',
            price: 'R15 000.00',
        },
        {
            image: './img/Home_Decor/Home_Decor_5.webp',
            category: 'Home Decor',
            title: 'Art Piece',
            price: 'R900.00',
        },
        // Add more product data here as needed
    ];


    return (
        <div>
            <Navbar />
            <Hero />
            {/* Categories */}
            <section className="section category">
                <div className="cat_center">
                    <div className="cat border-[1px] border-[#16635fe8]">
                        <img src="./img/category-1.jpg" alt="Clothes" />
                        <div>
                            <p>Clothes</p>
                        </div>
                    </div>
                    <div className="cat border-[1px] border-[#16635fe8]">
                        <img src="./img/Furnature/Furnature_2.jpg" alt="Furniture" />
                        <div>
                            <p>Furniture</p>
                        </div>
                    </div>
                    <div className="cat border-[1px] border-[#16635fe8]">
                        <img src="./img/Skin Care/Skin_Product_1.webp" alt="Skin Products" />
                        <div>
                            <p>Skin Products</p>
                        </div>
                    </div>
                    <div className="cat border-[1px] border-[#16635fe8]">
                        <img src="./img/Home_Decor/Home_Decor_2.jpg" alt="Decor" />
                        <div>
                            <p>Decor</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="section new_arrival">
                <div className="title">
                    <h1>New Arrivals</h1>
                    <p>All the latest picked from our store</p>
                </div>

                <div className="product_center">
                    {products.map((product, index) => (
                        <div key={index} className="product_item border-2 border-[#16635fe8]">
                            <div className="overlay">
                                <a href="productDetails.html" className="product_thumb">
                                    <img src={product.img} alt="product" />
                                </a>
                                {product.discount && <span className="discount">{product.discount}</span>}
                            </div>
                            <div className="product_info">
                                <span>{product.category}</span>
                                <a href="productDetails.html" className="product_title">
                                    {product.title}
                                </a>
                                <h4>{product.price}</h4>
                            </div>
                            {/* <ul className="icons">
                                <li><i className='bx bx-heart'></i></li>
                                <li><i className='bx bx-shopping-bag'></i></li>
                            </ul> */}
                        </div>
                    ))}
                </div>
            </section>

            {/* Promo */}
            <section className="section banner">
                <div className="left">
                    <span className="trend">Trend Design</span>
                    <h1>New Collection 2024</h1>
                    <p>New Arrival Limited offer</p>
                    {/* <a href="" className="btn btn-1">Discover Now </a> */}
                </div>
                <div className="right">
                    <img src="./img/Furnature/Furnature_8.jpg" alt="Promo" />
                </div>
            </section>

            <section className="section new_arrival">
                <div className="title">
                    <h1>Featured Products</h1>
                    <p>All the latest picked from our store</p>
                </div>

                <div className="product_center">
                    {featuredProducts.map((product, index) => (
                        <div className="product_item border-2 border-[#16635fe8]" key={index}>
                            <div className="overlay">
                                <a href="productDetails.html" className="product_thumb">
                                    <img src={product.image} alt="product" />
                                </a>
                                {/* {product.discount && <span className="discount"> {product.discount}%</span>} */}
                            </div>
                            <div className="product_info">
                                <span>{product.category}</span>
                                <a href="productDetails.html" className="product_title">
                                    {product.title}
                                </a>
                                <h4>{product.price}</h4>
                            </div>
                            {/* <ul className="icons">
                                <li><i className="bx bx-heart"></i></li>
                                <li><i className="bx bx-shopping-bag"></i></li>
                            </ul> */}
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}
