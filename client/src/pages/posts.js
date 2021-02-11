import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
// vvv components
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Footer from '../components/Footer';
import MediaUpload from '../components/MediaUpload'
// vvv styling
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

function Posts() {
  // Setting our component's initial state
  const [posts, setPosts] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all posts and store them with setPosts
  useEffect(() => {
    loadPosts()
  }, [])

  // Loads all [posts]
  function loadPosts() {
    API.getPosts()
      .then(res =>
        setPosts(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a post from the database with a given id, then reloads posts from the db
  function deletePost(id) {
    API.deletePost(id)
      .then(res => loadPosts())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, the API.savePost method saves the post data
  // Then reload posts from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.username && formObject.photo) {
      API.savePost({
        title: formObject.title,
        username: formObject.username,
        content: formObject.content,
        photo: formObject.photo,
        date: formObject.date,
      })
        .then(res => loadPosts())
        .catch(err => console.log(err));
    }
  };




  return (
    <div className="masterDiv">

    <div className="mediaUpload">
      <MediaUpload />
    </div>

    <div className="oldStuff">
    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '40vh' }}>
      <Grid item md={12}>
        <Box bgcolor="info.main" >
          <React.Fragment>
            <CssBaseline />

            <Container maxWidth="sm" >
              <h1>Current Posts</h1>
              {posts.length ? (
                <List>
                  {posts.map(post => (
                    <ListItem key={post._id}>
                      <Link to={"/posts/" + post._id}>
                        <strong>
                          {post.title}
                          {/* by {post.username} */}
                          {/* <br></br>
                          {post.content} */}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => deletePost(post._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
                )}
            </Container>

            <Footer />
          </React.Fragment>
        </Box>
      </Grid>
    </Typography>
  </div>
  </div>
  );
}


export default Posts;