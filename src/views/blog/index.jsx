import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import { useState, useEffect } from "react";
import MyComment from "../new/MyComment";

const Blog = ({ match }) => {
  const [blog, setBlog] = useState(null);
  /* const [comment, setComment] = useState(null); */
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  let id = match.params._id;

  const fetchBlogs = async (id) => {
    const apiUrl = process.env.REACT_APP_BE_URL;
    try {
      let response = await fetch(apiUrl + `/${id}`);
      if (response.ok) {
        let data = await response.json();
        console.log("HERE IS MY DATA", data);
        setBlog(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    const apiUrl = process.env.REACT_APP_BE_URL;
    console.log(id);
    try {
      let response = await fetch(apiUrl + `/${id}`);
      if (response.ok) {
        let data = await response.json();
        console.log("HERE IS MY DATA", data);
        setComments(data.comments.reverse());
        console.log("HERE IS COMMENTS", data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs(id);
    getComments();
  }, []);

  /*   const { loading, blog } = this.state; */
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        {
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                {/* <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div> */}
                <div style={{ marginTop: 20 }}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>
            <MyComment id={id} />
            <div>
              {comments.map((comment) => (
                <div className="row">
                  <h5>{comment.text}</h5>
                </div>
              ))}
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        }
      </div>
    );
  }
};

export default withRouter(Blog);
