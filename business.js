import React, { useState } from "react";
import Business from "../Business.js";
import TextField from '@material-ui/core/TextField';
import { makeStyles} from "@material-ui/core/styles";
import fire from "../config/fire";
import "firebase/firestore";
import "firebase/storage";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const createPost = () => {


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
            
                <TextField 
                    id="title" 
                    label="Title" 
                    variant="outlined" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                
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
                    <MenuItem value={10}>Tools</MenuItem>
                    <MenuItem value={20}>Furniture</MenuItem>
                    <MenuItem value={30}>Household Appliances</MenuItem>
                    <MenuItem value={40}>Video Games</MenuItem>
                    <MenuItem value={50}>Movies</MenuItem>
                    <MenuItem value={60}>Clothing</MenuItem>
                    <MenuItem value={70}>Accessories</MenuItem>
                    <MenuItem value={80}>Health & Beauty</MenuItem>
                    <MenuItem value={90}>Electronics</MenuItem>
                    <MenuItem value={100}>Arts & Crafts</MenuItem>
                    <MenuItem value={110}>Music</MenuItem>
                </Select>
                </formControl>
                 <br/>
                <TextField 
                    id="desc" 
                    label="Description" 
                    variant="outlined"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <br />
                <TextField 
                    id="Location"
                    label="Location" 
                    variant="outlined" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <br />
                <br />
                
                <button  type="submit" >
                  Create
                </button> &nbsp;
                
              </form>
            </center>
        </div>

       
    )
}

export default createPost;