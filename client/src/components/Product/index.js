import { Button, Card, Col, Row } from 'react-bootstrap';
import { getProductsAsync, getCategoriesAsync } from '../../redux/product/productSlice';
import { addToCart } from "../../redux/cart/cartSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default function Product() {
    const history = useHistory();
    const dispatch = useDispatch();


    const allProducts = useSelector(state => state.products.allProducts);



    useEffect(() => {
        dispatch(getProductsAsync());//apiden veri gelecek
        dispatch(getCategoriesAsync());
    }, [dispatch])

    // console.log("allProducts ile gelenler:", allProducts);
    //  console.log("allCategories ile gelenler:", allCategories);

    const handleAddToCart = (product) => {
        //console.log("product:", product);
        dispatch(addToCart(product));
        history.push("/cart");
    };




    return (
        <>


            <div className="container my-5">
                <Row md={3} >
                    {
                        allProducts.map(product => (
                            <Col className="mb-3" key={product.id}>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img className="card-img" variant="top" src={product.image} />
                                    <Card.Body >
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.amount}₺</Card.Text>
                                        <Button variant="primary" onClick={() => handleAddToCart(product)}>Sepete Ekle</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </>
    )
}
