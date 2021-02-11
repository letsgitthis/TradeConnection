import React, { useState, useEffect } from "react";
// vvv components should not call other components, fix this.
import { Input, TextArea, FormBtn } from "../Form";
import DeleteBtn from "../DeleteBtn";
import { List, ListItem } from "../List";
// vvv 
import API from "../../utils/API";
import { Link } from "react-router-dom";

function MediaUpload() {
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
          <React.Fragment>

            <div style={{
              textAlign: "center",
              height: "300px",
              width: "flex",
              backgroundImage: `url(https://freerangestock.com/sample/87961/man-crafting-wood.jpg)`,
              backgroundSize: 'cover',
              overflow: 'hidden',            }}>
            </div>

            {/* get rid of this vvv */}
            <div style={{ textAlign: "center" }}>
              <h1>Make a Post Below!</h1>
              <p>To post an image, upload it to <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer">
                PostImages</a>, and paste the Direct link below.</p>
            </div>

              <form>

                    <Input
                      style={{
                        height: "25px",
                        width: "550px",
                        backgroundColor: "black",
                        color: "darkorange"
                      }}

                      onChange={handleInputChange}
                      name="title"
                      placeholder="Title"
                    />
                    <Input
                      style={{
                        height: "25px",
                        width: "550px",
                        backgroundColor: "black",
                        color: "darkorange"
                      }}

                      onChange={handleInputChange}
                      name="username"
                      placeholder="Username"
                    />
                    <Input
                      style={{
                        height: "25px",
                        width: "550px",
                        backgroundColor: "black",
                        color: "darkorange"
                      }}

                      onChange={handleInputChange}
                      name="photo"
                      placeholder="Paste an image link here with https://"
                    />
                    <TextArea
                      style={{
                        height: "250px",
                        width: "550px",
                        backgroundColor: "white",
                        color: "darkorange"
                      }}

                      onChange={handleInputChange}
                      name="content"
                      placeholder="Type Your Post Here"
                    />

                    <FormBtn
                      // Requires: username, title, and photo to post
                      disabled={!(formObject.username && formObject.title && formObject.photo)}
                      onClick={handleFormSubmit} justifyContent="center">
                      Press Here To Post
                    </FormBtn>

              </form>

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
          </React.Fragment>
  );
}

export default MediaUpload;