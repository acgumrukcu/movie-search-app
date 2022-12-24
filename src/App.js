import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e4d8bc66f7msh277d74d94b2a265p1b0fa2jsn8cae7a988104",
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
  },
};

function App() {
  const [movie, setMovie] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const handleChange = (event) => {
    setSearchVal(event.target.value);
  };

  const handleSubmit = () => {
    getSearch();
  };

  const getSearch = async () => {
    const val = searchVal !== "" ? searchVal : "game";

    await fetch(
      "https://imdb8.p.rapidapi.com/auto-complete?q=" + val + "",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovie(response.d))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <div className="App">
      <Container>
        <Row className="mt-3 mb-2">
          <Col xs={12}>
            <Form onSubmit={handleChange} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchVal}
                onChange={handleChange}
              />
              <Button onClick={handleSubmit} variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
          <Col className="mt-3">Search Words: {searchVal}</Col>
        </Row>
        <Row>
          {movie &&
            movie.map((val, index) => {
              return (
                <Col xs={4} md={3} key={index} className="mb-4">
                  <Card>
                    <Card.Img
                      height="250px"
                      variant="top"
                      src={val.i ? val.i.imageUrl : ""}
                    />
                    <Card.Body>
                      <Card.Title>{val.l}</Card.Title>
                      <Card.Text>{val.s}</Card.Text>
                      <Card.Text>Type: {val.q}</Card.Text>
                      <Card.Text>Date: {val.y ? val.y : "Unknown"}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
