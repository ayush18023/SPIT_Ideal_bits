import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchmovies } from '../../services/TMDB'
import NavBar from '../NavBar/NavBar';
import { Rating } from '@mui/material';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const SingleMovie = () => {
    const classes = useStyles();
    const [movie, setmovie] = useState(null)

    const { id } = useParams()
    const { movies } = useSelector(state => state.movie)


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
    }

    useEffect(() => {

        setmovie(movies.find(x => x.id == id))
    }, [])

    return (
        <>
            <NavBar />
            <div style={{ display: "flex", marginLeft: '300px', marginTop: "50px" }}>
                <div style={{ width: "30%" }}>

                    <img className={classes.poster} src={movie?.thumbnail} alt="" />

                </div>
                <div style={{ marginLeft: "200px" }}>
                    <h1>{movie?.film_name}</h1>
                    <Rating readOnly value={movie?.vote_average / 2} precision={0.1} />
                    <p>{movie?.description}</p>
                    <h3>Category</h3>
                    <p>{movie?.category}</p>
                    <div
                        onClick={payPerView}
                        style={{
                            backgroundColor: "#dc1a28",
                            color: "white",
                            width: "100px",
                            borderRadius: "10px",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                        <img src={require("../../assets/genres/ethereum.png")} alt="" /> {movie?.eth}

                    </div>
                </div>


            </div>

        </>
    )
}

export default SingleMovie