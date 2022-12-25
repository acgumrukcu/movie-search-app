import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchBar(props) {

  const [searchVal, setSearchVal] = useState("");

  const handleChange = (event) => {
    setSearchVal(event.target.value);
  };

  const handleSubmit = () => {
    props.search(searchVal);
  };

  return (
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
  );
}

export default SearchBar;
