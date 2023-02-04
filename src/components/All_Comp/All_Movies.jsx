import React, { useState } from "react"
import NavBar from "../NavBar/NavBar"


const All_Movies=()=>{

    const [movies, setmovies] = useState([])

    const data=[

    ]


    const fetchmovies=async ()=>{


        if(1){
            setmovies(data)
        }
    }


    return(
        <>
            <NavBar/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex necessitatibus animi asperiores esse, beatae corporis non praesentium doloribus placeat vitae, blanditiis, voluptatibus a suscipit totam laudantium nulla recusandae autem odio!

        </>
    )
}

export default All_Movies;