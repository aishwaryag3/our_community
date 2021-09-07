import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import CreatePost,{ postCreate } from './CreatePost';
import fire from "../config/fire";
import "../App.css";
import "firebase/firestore";
import "firebase/storage";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const EditPost=()=>{
    const [image, setImage] = useState(null);
    const [URL, setURL] = useState("");
    const [uptitle, setUptitle] = useState("");
    const [upcategory, setUpcategory] = useState("");
    const [updesc, setUpdesc] = useState("");
    const [uplocation, setUplocation] = useState("");
    const [ID, setID] = useState("");
    const [flag, setFlag] = useState(false);

    const db = fire.firestore();
    const storage = fire.storage();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const editPost = (docID) => {
    db.collection("POSTS")
      .doc(docID)
      .update({
        title: uptitle,
        category: upcategory,
        desc: updesc,
        location: uplocation,
        createdAt: new Date(),
      })
      return(
        <div className="App">
        <div>
          {flag ? (
            <>
              <h2>EDIT POSTS</h2>
              <div>
                <center>
                  <form onSubmit={
                      <CreatePost postCreate={postCreate}/>
                      }>
                    <input
                      accept="/image"
                      id="image_upload"
                      type="file"
                      onChange={handleChange} />
                    <br />
                    <br/>

                    <TextField
                      id="title"
                      label="Title"
                      variant="outlined"
                      value={uptitle}
                      onChange={(e) => setUptitle(e.target.value)}
                    />
                    <br />
                    <br/>

                    <FormControl>
                      <InputLabel id="Category"> Category </InputLabel>
                      <Select
                        labelId="Category"
                        id="category"
                        label="Category"
                        variant="outlined"
                        placeholder="Category"
                        value={upcategory}
                        onChange={(e) => setUpcategory(e.target.value)}

                      >

                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value={"Tools"}>Tools</MenuItem>
                        <MenuItem value={"Furniture"}>Furniture</MenuItem>
                        <MenuItem value={"Household Appliances"}>Household Appliances</MenuItem>
                        <MenuItem value={"Video Games"}>Video Games</MenuItem>
                        <MenuItem value={"Movies"}>Movies</MenuItem>
                        <MenuItem value={"Clothing"}>Clothing</MenuItem>
                        <MenuItem value={"Accessories"}>Accessories</MenuItem>
                        <MenuItem value={"Health & Beauty"}>Health & Beauty</MenuItem>
                        <MenuItem value={"Electronics"}>Electronics</MenuItem>
                        <MenuItem value={"Arts & Crafts"}>Arts & Crafts</MenuItem>
                        <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
                        <MenuItem value={"Books"}>Books</MenuItem>
                        <MenuItem value={"Music"}>Music</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <br/>
                    <TextField
                      id="desc"
                      label="Description"
                      variant="outlined"
                      value={updesc}
                      onChange={(e) => setUpdesc(e.target.value)}
                    />
                    <br />
                    <br/>
                    <TextField
                      id="Location"
                      label="Location"
                      variant="outlined"
                      value={uplocation}
                      onChange={(e) => setUplocation(e.target.value)}
                    />
                    <br />
                    <br />

                    <Button variant="contained" color="primary" type="submit" onClick={editPost(ID)}>
                      Update
                    </Button>{" "}
                    &nbsp;
                    <Button variant="contained" color="primary" onClick={() => setFlag(false)}>Cancel</Button>
                  </form>
                </center>
              </div>
            </>
          ) : (
            <></>
          )}
          </div>
        </div>
     
      )

  };

} 
export default EditPost;