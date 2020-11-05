import axios from "axios";

// API's transfer information to and from the backend
export default {
  // Gets all posts
  getPosts: function() {
    return axios.get("/api/posts");
  },
  // Gets the post with the correct id
  getPost: function(id) {
    return axios.get("/api/posts/" + id);
  },
  // Deletes the post with the designated id
  deletePost: function(id) {
    return axios.delete("/api/posts/" + id);
  },
  // Saves a post to mongodb
  savePost: function(postData) {
    return axios.post("/api/posts", postData);
  }
};
