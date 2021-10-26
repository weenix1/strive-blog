import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";
export default class BlogList extends Component {
  state = {
    blogs: [],
  };

  fetchBlogs = async () => {
    const apiUrl = process.env.REACT_APP_BE_URL;
    try {
      let response = await fetch(apiUrl);
      if (response.ok) {
        let data = await response.json();
        console.log("HERE IS MY DATA", data);
        this.setState({
          blogs: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchBlogs();
  };

  render() {
    return (
      <Row>
        {this.state.blogs.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
