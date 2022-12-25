import React, { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Header from "./components/header";
import SearchBar from "./components/searchBar";
import Spinner from "react-bootstrap/Spinner";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e4d8bc66f7msh277d74d94b2a265p1b0fa2jsn8cae7a988104",
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
  },
};

function App() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const search = async (val) => {
    await fetch(
      "https://imdb8.p.rapidapi.com/auto-complete?q=" + val + "",
      options
    )
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          setLoading(false);
          return setMovie(response.d);
        }, 4000);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    search();
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <Header />
      <Container>
        {<SearchBar search={search} />}
        <Row>
          {loading && !errorMessage && <span>Loading...</span>}
          {movie &&
            movie.map((val, index) => {
              return (
                <Col xs={4} md={3} key={index} className="mb-4">
                  <Card className="d-flex align-items-center justify-content-center" style={{ minHeight: "30rem" }}>
                    {loading && <Spinner animation="border" />}
                    {!loading && (
                      <Fragment>
                        <Card.Img
                          height="250px"
                          variant="top"
                          src={val.i ? val.i.imageUrl : ""}
                        />
                        <Card.Body>
                          <Card.Title>{val.l}</Card.Title>
                          <Card.Text>{val.s}</Card.Text>
                          <Card.Text>Type: {val.q}</Card.Text>
                          <Card.Text>
                            Date: {val.y ? val.y : "Unknown"}
                          </Card.Text>
                        </Card.Body>
                      </Fragment>
                    )}
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
