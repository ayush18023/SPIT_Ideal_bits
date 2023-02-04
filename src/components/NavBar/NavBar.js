import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, TextField, TextareaAutosize } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import { SideBar, Search } from '..';
import { fetchToken, createSessionId, movieApi } from '../../utils/index';
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


  // form

  const [film_name, setfilm_name] = useState("")
  const [description, setdescription] = useState("")
  const [file, setfile] = useState("")
  const [category, setcategory] = useState("Action")
  const { data, isFetching } = useGetGenresQuery();
  const [thumbnail, setThumbnail] = useState("");
  const thumbnailRef = useRef();
  const [video, setVideo] = useState("");
  const videoRef = useRef();


  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const { isAuthenticated, user } = useSelector(userSelector);

  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

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
    height:"90vh",
    overflow:"auto"
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
            {
            theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />
          }
          </IconButton>
          {!isMobile && <Search />}
          <div style={{display:"flex"}}>
            <div style={{display:"flex",alignItems:"center"}} className="UploadBtn"> 
              <UploadIcon />
              <p style={{marginRight:"30px",marginLeft:"10px"}} onClick={()=>setOpen(true)}>Upload Movie</p>
            </div>


            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                <AccountCircle />&nbsp; Login  
              </Button>

            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
                />
              </Button>

            )}
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={{display:"flex",justifyContent:"space-between"}}>

              <div style={{width:"40%"}}>

                <h3>Film Name</h3>
                <TextField
                  id="outlined-basic" label="" variant="outlined"
                  value={film_name}
                  onChange={(e)=>setfilm_name(e.target.value)}
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
                  variant="outlined"
                  // width="50%"
                  fullWidth
                />
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{width:"40%"}}>
                      <h3>Category</h3>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Age"
                        onChange={(e)=>setcategory(e.target.value)}
                        fullWidth
                      >
                        { data?.genres?.map((genre)=>(
                          <MenuItem value={genre.name}>{genre.name}</MenuItem>
                        ))}
                      </Select>
                      
                    </div>
                    <div style={{width:"40%"}}>
                      <h3>Genre</h3>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Age"
                        onChange={(e)=>setcategory(e.target.value)}
                        fullWidth
                      >
                        { data?.genres?.map((genre)=>(
                          <MenuItem value={genre.name}>{genre.name}</MenuItem>
                        ))}
                      </Select>

                    </div>
                </div>


                <br />
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

                <input
                  type="file"
                  ref={thumbnailRef}
                  onChange={(e) => {
                    setThumbnail(e.target.files[0]);
                  }}
                  accept="image/*"
                  style={{visibility:"hidden"}}
                />
              </div>
                <div style={{width:"50%"}}>
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
                    className="hidden"
                    
                    ref={videoRef}
                    accept="video/*"
                    onChange={(e) => {
                      setVideo(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                    style={{visibility:"hidden"}}
                  />

                  <div style={{textAlign:"center",backgroundColor:"#dc1a28",color:"white",maxWidth:"300px",padding:"10px"}}>
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
