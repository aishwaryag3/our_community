
import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';

import fire from "../config/fire";
import "../App.css";
import "firebase/firestore";
import "firebase/storage";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const CreatePost = () => {


    const[image,setImage]=useState(null);
    const[URL,setURL]=useState("")
    const [title, setTitle] = useState("");
    const[category,setCategory]=useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");


    const db = fire.firestore();
    const storage = fire.storage();

    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    
    const postCreate = (e) => {
        e.preventDefault();
        storage
        .ref(`images/${image.name}`)
        .put(image)
        .then((val) => {
          val.task.snapshot.ref.getDownloadURL().then((URL) => {
          db.collection("POSTS")
            .add({
                title: title,
                category: category,
                desc: desc,
                location: location,
                createdAt: new Date(),
                url:URL,
            })
            .then(() => {
                alert(" Your Post has been created")
            })
            .catch((error) => {
                alert(error.message);
            })
            setImage("");
            setTitle("");
            setCategory("");
            setDesc("");
            setLocation("");
          });
        });

    };


    return (
        <div>
            <center>
            <h1>Create Post</h1>
            <form
              onSubmit={postCreate}>
              <input 
                accept = "/image"
                id="image_upload" 
                type="file"
                onChange={handleChange} />
               <br/>
                <br/>
                <TextField 
                    id="title" 
                    label="Title" 
                    variant="outlined" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <br/>
                
                <formControl>
                  <InputLabel id="Category"> Category </InputLabel>
                  <Select
                    labelId="Category"
                    id="category"
                    label="Category"
                    variant = "outlined"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                   
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
                </formControl>
                 <br/>
                 <br/>
                <TextField 
                    id="desc" 
                    label="Description" 
                    variant="outlined"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <br />
                <br/>
                <TextField 
                    id="Location"
                    label="Location" 
                    variant="outlined" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <br />
                <br />
                
                <Button variant="contained" color="primary" type="submit" >
                  Create
                </Button> &nbsp;
                
              </form>
            </center>
        </div>

       
    )
}

export default {postcreate} CreatePost;
