import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchmovies } from '../../services/TMDB'
import NavBar from '../NavBar/NavBar';
import { Rating } from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { viewableMovie } from '../../app/MovieReducer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const SingleMovie = () => {
    const classes = useStyles();
    const [movie, setmovie] = useState(null)

    const { id } = useParams()
    const { movies } = useSelector(state => state.movie)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const payPerView = async() => {
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gas: '19640', // customizable by user during MetaMask confirmation.
            to: '0xa37F05a028807eF2E5de0b4c600C8c090A5FcA2e', // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: '2', // Only required to send ether to the recipient from the initiating external account.
            data:
                '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: '0x539', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        if(txHash){
            dispatch(viewableMovie(movie.id));
        }
    }

    const dispatch = useDispatch()


    const handleplay=()=>{
        setOpen(true)

    }


    useEffect(() => {

        setmovie(movies.find(x => x.id == id))
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "98vw",
        height:"99vh",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: "90vh",
        overflow: "auto"
    };

    return (
        <>
            <NavBar />
            <div style={{ display: "flex", marginLeft: '350px', marginTop: "80px" }}>
                <div style={{ width: "30%" }}>

                    <img className={classes.poster} src={movie?.thumbnail} alt="" />

                </div>
                <div style={{ marginLeft: "150px" }}>
                    <h1>{movie?.film_name}</h1>
                    <p>{movie?.description}</p>
                    <Rating readOnly value={movie?.vote_average / 2} precision={0.1} />
    
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h3>Category:</h3>
                        <p style={{marginLeft:"20px"}}>{movie?.category}</p>
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h3>Location:</h3>
                        <p style={{marginLeft:"20px"}}>{movie?.location}</p>
                    </div>
                    <div style={{display:"flex"}}>
                        { movie?.viewable ? (
                            <div style={{backgroundColor:"white",color:"#dc1a28",display:"flex",
                                width:"150px",
                                borderRadius: "10px",
                                padding: "12px",
                                display:"flex",alignItems:"center",
                                justifyContent:"center",
                                fontWeight:"bold" 

                                }}
                                onClick={handleplay}
                                >
                                <PlayArrowIcon sx={{color:"#dc1a28"}}/>
                                <div>Play Movie</div>
                            </div>

                        ) : (

                            <div
                                onClick={payPerView}
                                style={{
                                    backgroundColor: "#dc1a28",
                                    color: "white",
                                    width:"150px",
                                    borderRadius: "10px",
                                    // padding: "5px",
                                    display:"flex",alignItems:"center",
                                    justifyContent:"center",
                                    fontWeight:"bold"
                                }}>
                                {/* <div style={{}}> */}
                                <img src={require("../../assets/genres/eth.png")} alt="" /> 
                                <p style={{marginLeft:"6px"}}>Pay</p>
                                <p style={{marginLeft:"8px"}}>{movie?.eth}</p>
                                {/* </div> */}

                            </div>
                        )}
                    </div>
                </div>
                {/* <div onClick={()=>{
                    dispatch(viewableMovie(movie.id));
                    console.log(movies)
                }}>
                    click
                </div> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <video
                          controls
                          src={movie?.video}
                          className="vidview"
                        />
                    </Box>
                </Modal>
            </div>

        </>
    )
}

export default SingleMovie