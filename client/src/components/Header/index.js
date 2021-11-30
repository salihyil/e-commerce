import { NavDropdown, Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filteredCategories, sortProducts } from '../../redux/product/productSlice';


export default function Header() {
    const dispatch = useDispatch();


    const allCategories = useSelector(state => state.products.allCategories);

    function categoryChange(categoryName) {
        dispatch(filteredCategories(categoryName));
    }

    function sort(e) {
        dispatch(sortProducts(e));
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="Kategoriler" id="basic-nav-dropdown">
                                {allCategories.map((category) => (
                                    <NavDropdown.Item key={category.categoryId} onClick={() => categoryChange(category.name)}>{category.name}</NavDropdown.Item>
                                ))}
                            </NavDropdown>

                            <NavDropdown title="Sırala" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => sort("lowest")}>Yüksekten Düşüğe</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => sort("highest")}>Düşükten Yükseğe</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
