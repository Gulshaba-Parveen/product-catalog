import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Grid, Box, Image, Heading, Text, Button, Flex } from "@chakra-ui/react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [filteredProduct, setFilteredProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        axios("https://fakestoreapi.com/products")
            .then((response) => {
                const productsData = response.data;
                setProducts(productsData);
                setFilteredProduct(productsData);
                const uniqueCategories = [...new Set(productsData.map(product => product.category))];
                setCategories(uniqueCategories);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearch = () => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProduct(filtered);
    };


    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === '') {
            setFilteredProduct(products);
        } else {
            const filtered = products.filter(product =>
                product.category === category
            );
            setFilteredProduct(filtered);
        }
    };


    return (
        <div className="product-container">
            <h1>Products</h1>
            <Flex>
                <div className="search-container">
                    <input type="text" placeholder="Search products by title" value={searchQuery} onChange={handleChange} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div>
                    <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {filteredProduct.map((product) => (
                    <Box key={product.id} p={4} bg="pink" borderRadius="md">
                        <Image src={product.image} alt={product.title} height="200px" />
                        <Heading size="md" mt={2} mb={4}>{product.title}</Heading>
                        <Text fontWeight="bold">Category: {product.category}</Text>
                        <Text>Price: ${product.price}</Text>
                        <Text>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
                        <Link to={`/product/${product.id}`}>
                            <Button mt={4} colorScheme="teal">View Details</Button>
                        </Link>
                    </Box>
                ))}
            </Grid>
        </div>
    );
}

export default Products;
