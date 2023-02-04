import React, { useState,useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WAVES from "vanta/dist/vanta.waves.min"
import * as THREE from "three";
// import "../../index.css"

function Welcome() {
  let navigate = useNavigate();

  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)
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
  }, [vantaEffect])

  return(
    <div style={{overflow:"hidden"}}>
        <div style={{width:"100vw",height:"100vh"}}>
            <img src="https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png" alt="" 
                style={{position:"absolute",top:"20%",left:"37%",
                zIndex:10,width:"350px"}}/>
            <h2 style={{position:"absolute",top:"40%",left:"37%",textAlign:"center",
                zIndex:10,width:"350px"}}>
                Stream untethered, watch on your own terms
            </h2>
            <h3 className="butt" style={{
                padding:"20px",
                position:"absolute",
                left:"45%",
                top:"60%",
                backgroundColor:"#dc1a28",
                color:"white",
                borderRadius:"10px",
                zIndex:10
            }}>
                Get Started
            </h3>
        </div>
        <div ref={myRef} style={{width:"100vw",height:"100vh",position:"absolute",top:0,left:0,zIndex:0,overflow:"hidden"}}>
            {/* Foreground content goes here */}
        </div>
    </div>
  )
}

export default Welcome;
