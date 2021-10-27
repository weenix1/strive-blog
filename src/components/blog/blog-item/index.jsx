import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BlogAuthor from "../blog-author";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./styles.css";
const BlogItem = ({ title, cover, author, _id }) => {
  const apiUrl = process.env.REACT_APP_BE_URL;

  /*  const { title, cover, author, _id } = this.props; */
  return (
    <div>
      <Link to={`/blog/${_id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={cover} className="blog-cover" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor {...author} />
          </Card.Footer>
        </Card>
      </Link>
      <button>
        <a href={apiUrl + `/${_id}` + `/downloadPDF`}>download</a>
      </button>
    </div>
  );
};
export default BlogItem;
