import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header(){
    return(
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="#home">Movie Filter App</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header