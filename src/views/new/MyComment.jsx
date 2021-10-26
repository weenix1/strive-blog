import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const MyComment = ({ match }) => {
  const [comment, setComment] = useState({
    text: "",
  });

  let id = match.params._id;

  const fetchComments = async () => {
    const apiUrl = process.env.REACT_APP_BE_URL;
    console.log(id);
    try {
      let response = await fetch(apiUrl + `/${id}` + `/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        let data = await response.json();
        console.log("HERE IS MY DATA", data);
        setComment({ text: "" });
        /*   setLoading(false); */
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*  useEffect(() => {
    getComments();
  }, []);
 */
  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-content" className="mt-1">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="leave a comment here..."
            value={comment.text}
            onChange={(e) => setComment({ ...comment, text: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Edit
          </Button>
          <Button
            onClick={() => fetchComments()}
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            share
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default withRouter(MyComment);
