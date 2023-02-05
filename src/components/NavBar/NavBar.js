import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, TextField, TextareaAutosize } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/styles';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import { SideBar, Search } from '..';
import {  createSessionId, movieApi } from '../../utils/index';
import useStyles from './styles';
import { ColorModeContext } from '../../utils/ToggleColor';
import UploadIcon from '@mui/icons-material/Upload';
import "../../index.css"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useGetGenresQuery } from '../../services/TMDB';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
// import jazzicon from "@metamask/jazzicon";
import { Jazzicon } from "@ukstv/jazzicon-react";
import ContractAbi from "../../artifacts/contracts/OurTube.sol/OurTube.json";
// import { ethers } from "ethers";



// import React, { useState, useEffect, useRef } from "react";
// import { Header } from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import ContractAbi from "../artifacts/contracts/OurTube.sol/OurTube.json";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
// import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import toast from "react-hot-toast";
import getContract from "../../utils/getContract";
import Toggle from "react-toggle";
import { useWeb3React } from "@web3-react/core"
import { addMovie } from '../../app/MovieReducer';


// import "react-toggle/style.css"; // for

function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const token = localStorage.getItem('request_token');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();

  // form

  const [title, setTitle] = useState("")
  const [location, setlocation] = useState("")
  const [description, setDescription] = useState("")
  const [file, setfile] = useState("")
  const [category, setCategory] = useState("Action")
  const { data, isFetching } = useGetGenresQuery();
  const [thumbnail, setThumbnail] = useState("");
  const [isAudio, setIsAudio] = useState(false);
  const thumbnailRef = useRef();
  const [video, setVideo] = useState("");
  const videoRef = useRef();
  const { account, active } = useWeb3React()
  const [price, setprice] = useState(0)

  const { movies } = useSelector(state=>state.movie)

  const authorization = "Basic " + btoa("2LGkI1wSpRlIh7z5tiKenMI8G2a:9cf31f50c1701b54894c88d401ec0d7c");
  const avatarRef = useRef()
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: authorization,
    }
  });

  const handleSubmit = async () => {
    console.log(thumbnail);
    if (
      title === "" ||
      description === "" ||
      category === "" ||
      location === "" ||
      thumbnail === "" ||
      video === ""
    ) {
      toast.error("Please fill all the fields", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    const obj={
      id:movies.length+1,
      film_name:title,
      location,
      description,
      eth:price,
      category,
      thumbnail:URL.createObjectURL(thumbnail),
      video:URL.createObjectURL(video)
    
    }
    console.log("here:",obj)

    dispatch(addMovie(obj))
    console.log("Redux",movies)

    uploadThumbnail(thumbnail);
  };

  const uploadThumbnail = async (thumbnail) => {
    console.log("uploading thumbnail");
    toast("Uploading thumbnail...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    console.log("uploading thumbnail");
    try {
      console.log("Try chal rha");
      const added = await client.add(thumbnail);
      console.log("thumbnail");
      uploadVideo(added.path);
      console.log("Video Uploaded");
      toast.success("Thumbnail uploaded successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const uploadVideo = async (thumbnail) => {
    console.log("uploading video");
    toast("Uploading video...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    try {
      const added = await client.add(video);
      console.log({
        uploadVIdeo: added.path,
        thumbnail: thumbnail,
      });
      

      saveVideo(added.path, thumbnail);
      toast.success("Video uploaded successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const saveVideo = async (video, thumbnail) => {
    let data = {
      title,
      description,
      category,
      location,
      thumbnail,
      video,
    };
    console.log("Saving video", data);
    let contract = await getContract();
    let UploadedDate = String(new Date());

    console.log("UploadedDate", UploadedDate);

    // Show successfully alert

    await contract.uploadVideo(
      video,
      title,
      description,
      location,
      category,
      thumbnail,
      isAudio,
      UploadedDate
    );

    

    window.history.back();
  };

  const goBack = () => {
    window.history.back();
  };



  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  // const { isAuthenticated, user } = useSelector(userSelector);
  let address = localStorage.getItem("walletAddress");
  // console.log(address);
  const [mobileOpen, setMobileOpen] = useState(false);
  // useEffect(() => {
  //   // console.log(account);
  //   // const element = avatarRef.current;
  //   if (element && account) {
  //       const addr = account.slice(2, 10);
  //       const seed = parseInt(addr, 16);
  //       const icon = jazzicon(20, seed); //generates a size 20 icon
  //       if (element.firstChild) {
  //           element.removeChild(element.firstChild);
  //       }
  //       element.appendChild(icon);
  //   }
  // }, [account, avatarRef]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: "90vh",
    overflow: "auto"
  };

  // const handlelogin=()=>{

  // }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {
            isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                style={{ outlined: 'none' }}
                onClick={() => setMobileOpen((prevState) => !prevState)}
                className={classes.menuButton}
              >
                <Menu />

              </IconButton>
            )
          }
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            
          </IconButton>
          {!isMobile && <Search />}
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", alignItems: "center" }} className="UploadBtn" onClick={() => setOpen(true)}>
              <UploadIcon />
              <p style={{ marginRight: "30px", marginLeft: "10px" }} >Upload Movie</p>
            </div>


            <Button color="inherit" onClick={()=>navigate('/profile/dashboard')}>
            <div style={{width: "30px"}}>
            <Jazzicon address={address} />
            </div>&nbsp; Profile
              </Button>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div style={{ width: "40%" }}>

                  <h3>Film Name</h3>
                  <TextField
                    id="outlined-basic" label="" variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter film name"
                    fullWidth
                  />
                  <br />

                  <h3>Location</h3>
                  <TextField
                    id="outlined-basic" label="" variant="outlined"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    placeholder="Enter film name"
                    fullWidth
                  />
                  <br />

                  <h3>Description</h3>
                  <TextField
                    id="outlined-multiline-static"
                    // label="Multiline"
                    placeholder='Add a Description'
                    multiline
                    rows={4}
                    value={description}
                    variant="outlined"
                    // width="50%"
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <div style={{ width: "40%" }}>
                      <h3>Category</h3>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Age"
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                      >
                        {data?.genres?.map((genre) => (
                          <MenuItem value={genre.name}>{genre.name}</MenuItem>
                        ))}
                      </Select>

                       

                    </div>
                    <div style={{ width: "40%" }}>
                      <h3>Price (in Eth)</h3>
                      <TextField
                        id="outlined-basic" label="" variant="outlined"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                        placeholder="Enter film name"
                        fullWidth
                      /> 
                    </div>
                  </div>


                  <br />


                  <input
                    type="file"
                    ref={thumbnailRef}
                    onChange={(e) => {
                      setThumbnail(e.target.files[0]);
                    }}
                    accept="image/*"
                    style={{ visibility: "hidden" }}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <h3>Add Thumbnail</h3>
                  {/* <input type="file" name="" onChange={e=>setfile(e.target.files[0])} /> */}
                  <div
                    onClick={() => {
                      thumbnailRef.current.click();
                    }}
                    className=""
                  >
                    {thumbnail ? (
                      <img
                        onClick={() => {
                          thumbnailRef.current.click();
                        }}
                        src={URL.createObjectURL(thumbnail)}
                        alt="thumbnail"
                        className="thumbprev"
                      />
                    ) : (
                      <div className='uploadicon'>

                        <BiPlus size={40} color="gray" />
                      </div>

                    )}
                  </div>
                  <h3>Upload Video</h3>
                  <div
                    onClick={() => {
                      videoRef.current.click();
                    }}
                    className={
                      video
                        ? " w-96   rounded-md  h-64 items-center justify-center flex"
                        : "uploadvid"
                    }
                  >
                    {video ? (
                      <>
                        {/* {isAudio ? (
                          <audio
                            src={URL.createObjectURL(video)}
                            controls
                            className="w-full h-full"
                          />
                        ) : ( */}
                        <video
                          controls
                          src={URL.createObjectURL(video)}
                          className="vidpreview"
                        />
                        {/* )} */}
                      </>
                    ) : (
                      // <p className="dark:text-[#9CA3AF]">
                      //   Upload Video
                      // </p>
                      <div>

                        <BiPlus size={40} color="gray" />
                      </div>
                      // {isAudio ? "Audio" : "Video"}
                    )}
                  </div>
                  <input
                    type="file"

                    ref={videoRef}
                    accept="video/*"
                    onChange={(e) => {
                      setVideo(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                    style={{ visibility: "hidden" }}
                  />

                  <div style={{ textAlign: "center", backgroundColor: "#dc1a28", color: "white", maxWidth: "300px", padding: "10px" }} onClick={() => {
                    handleSubmit();
                  }}
                  >
                    Upload
                  </div>

                </div>
              </div>
            </Box>
          </Modal>
          {isMobile && <Search />}
        </Toolbar>

      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (

            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>

          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>

          )}

        </nav>

      </div>
    </>

  );
}

export default NavBar;
