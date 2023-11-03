import React, { useState } from 'react';


const Tweet = ({tweet,setData}) => {
const [userdata,setUserdata]= useState();

    const verifyuser = {
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("veryfication token")
        }
    }


  return (
    <div>Tweet</div>
  )
}

export default Tweet;