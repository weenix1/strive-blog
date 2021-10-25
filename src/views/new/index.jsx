import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";

import { Container, Form, Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import "./styles.css";
const NewBlogPost = () => {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    category: "",
    content: "",
    cover: "",
    author: {},
    comment: [],
  });

  const [picture, setPicture] = useState(null);

  const fetchData = async () => {
    try {
      let response = await fetch("http://localhost:3001/blogs/uploadSingle", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json" },
      });

      if (response.ok) {
        let data = await response.json();

        console.log(data);
        setFormData({
          _id: "",
          title: "",
          category: "",
          content: "",
          cover: "",
          author: {},
          comment: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*   useEffect(() => {
    fetchData();
  }, []); */

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select">
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Form.Control
            as="textarea"
            row={20}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Form.Control
            type="file"
            onChange={(e) => {
              setPicture({ picture: e.target.files[0] });
            }}
          />

          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            onClick={() => fetchData()}
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default NewBlogPost;
