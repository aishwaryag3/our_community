import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import fire from "./config/fire";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import "firebase/firestore";
import "firebase/storage";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';




const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    
    justifyContent: "space-around",
    overflow: "hidden",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  formControl: {
    margin: theme.spacing(1),
    width: "20vw"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    fontSize: "4vh",
    alignSelf: "center",
  },
  Button: {
    align: "center",

  }
}));

const Business = () => {


  // const [image, setImage] = useState(null);
  // const [URL, setURL] = useState("")
  //const [title, setTitle] = useState("");
  //const [desc, setDesc] = useState("");
  //const [location, setLocation] = useState("");
  // const [uptitle, setUptitle] = useState("");
  // const [upcategory, setUpcategory] = useState("");
  // const [updesc, setUpdesc] = useState("");
  // const [uplocation, setUplocation] = useState("");
  const [fireData, setFireData] = useState([]);
  // const [ID, setID] = useState("");
  // const [flag, setFlag] = useState(false);
  const classes = useStyles();



  const db = fire.firestore();
  const storage = fire.storage();


  

  useEffect(() => {
    const tempList = [];
    db.collection("POSTS")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let obj = {
            id: doc.id,
            ...doc.data(),
          };
          tempList.push(obj);
        });
        setFireData(tempList);
      });
  }, []);




  
  const deleteDetails = (docID) => {

    db.collection("POSTS").doc(docID).delete();
    alert("Post deleted successfully!!!");


  };

  return (
        <div>
        <Button variant="filled" color="inherit">
        <Link to="/CreatePost">
              Create Post
              </Link>
        </Button>
      {fireData.map((data) => {
        return (
          <>
             <Card
              style={{ margin: "25px 450px", height: "32em", width: "30em" }}
              classsName={classes.root}>
              <CardHeader  align = "left" fontSize="12"
                avatar={
                  <Avatar aria-label="posts" className={classes.avatar}>
                    U
                  </Avatar>
                }
                title={data.title}
                subheader={data.createdAt.toString()}
                />
              <CardMedia
                className={classes.media}
                image={data.url}
                title="Post image"
                height="150"
              />
              <CardContent>
                <Typography align ="left"  fontSize="12" component="h5">
                Category:{data.category}
                </Typography>
                <Typography align ="left" variant="body2" color="textSecondary" component="p">
                  {data.desc}
                </Typography>
              </CardContent>
              
              <CardActions>
              <Button size="small" variant="contained" color="red">
              <Link to={{
                pathname:'/EditPost',
                aboutProps:{
                  setUptitle:data.title,
                  setUpcategory:data.category,
                  setUpdesc:data.desc,
                  setUplocation:data.location,
                  setFlag:true,
                  setID:data.id
                }
              }}>
              Edit
              </Link>
              
              
            </Button>
            &nbsp;
            <Button size="small" variant="contained" color="red"
              onClick={() => {
                deleteDetails(data.id);
              }}
            >
              Delete
            </Button>
            </CardActions>

            </Card>
            </>
            );
          })}
         </div>
        );

    };
      export default Business;
