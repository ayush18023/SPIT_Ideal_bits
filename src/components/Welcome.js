import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WAVES from "vanta/dist/vanta.waves.min"
import * as THREE from "three";
import { Link } from "react-router-dom";
// import "../../index.css"

function Welcome() {
  let navigate = useNavigate();
  const [UserWallet, setUserWallet] = useState(null);
  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)
  const home = useRef(null)
  // let navigate = useNavigate();
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(WAVES({
        el: myRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scaleMobile: 1.00,
        color: 0x1a1a25
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect]);

  const checkedWallet = async () => {
    console.log("Checking wallet");
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      // Change network to ropsten
      await ethereum.enable();

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x539` }],
      });
      console.log("Connected", accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);

      home.current.click()
    } catch (error) {
      console.log(error);
    }
  };

  const handlemeta = () => {
    checkedWallet();
    // if (window.ethereum) {
    //   window.ethereum.on("chainChanged", () => {
    //     window.location.reload();
    //   });
    //   window.ethereum.on("accountsChanged", () => {
    //     checkedWallet();
    //   });
    // }


    // if(0){
    //   home.current.click()
    // }
  }

  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }}>
        {/* <img src="https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png" alt=""
          style={{
            position: "absolute", top: "20%", left: "37%",
            zIndex: 10, width: "350px"
          }} /> */}
        <h1 style={{
          position: "absolute", top: "10%", left: "37%",
          zIndex: 10, width: "350px"
          , fontSize: "80px", color: "#dc1a28"
        }}>
          StreamOn
        </h1>
        <h2 style={{
          position: "absolute", top: "40%", left: "37%", textAlign: "center",
          zIndex: 10, width: "350px", fontSize: '25px'
        }}>
          Stream untethered, watch on your own terms
        </h2>
        {/* <Link to="/Home"> */}
        <h3 className="butt" style={{
          padding: "20px",
          position: "absolute",
          left: "45%",
          top: "60%",
          backgroundColor: "#dc1a28",
          color: "white",
          borderRadius: "10px",
          zIndex: 10
        }}
          onClick={handlemeta}
        >
          Get Started
        </h3>
        {/* </Link> */}
        <Link to="/Home">
          <div ref={home}></div>
        </Link>
      </div>
      <div ref={myRef} style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, zIndex: 0, overflow: "hidden" }}>
        {/* Foreground content goes here */}
      </div>
    </div>
  )
}

export default Welcome;
