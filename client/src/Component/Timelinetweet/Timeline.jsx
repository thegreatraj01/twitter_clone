import React, { useEffect } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Tweet from '../OneTweet/Tweet';
function Timeline() {

    const [timeline, setTimeline] = useState(null);

    // const { user } = useSelector(state => state.userReducer);
    // console.log(user);
    const verifyuser = {
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("veryfication token")
        }
    }
    const gettimelinetweets = async () => {
        const data = await axios.get(`${BASE_URL}/timelinetweert`, verifyuser);
        setTimeline(data.data);
        console.log(data);
    }


    useEffect(() => {
        gettimelinetweets()
    },[])


    // console.log(timeline);

    return (
        <div className="mt-3">
            {timeline &&
                timeline.map((tweet) => {
                    return (
                        <div key={tweet._id} className="p-2">
                            <Tweet tweet={tweet} setData={setTimeline} />
                        </div>
                    );
                })}
        </div>
    )
}

export default Timeline;