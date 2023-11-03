import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import { BASE_URL } from '../../config';

const MainTweet = () => {
    const [preview, setPreview] = useState(null);
    const fileInputRef = React.createRef();

    const [tweetdis, setTweetdis] = useState(null);;
    const[uploadimg,setUploadimg]= useState(null);

    const handleImageIconClick = () => {
        fileInputRef.current.click();
    };
    var file ;
    const handleFileChange = (e) => {
       file = e.target.files[0];
       console.log(file);
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };
    

    const verifyuser = {
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("veryfication token")
        }
    };


    // const imgupload = async () => {
    //     const imglink = await axios.post(`${BASE_URL}/upload`, file);
    //     console.log('imglink', imglink)
    // }

    // const content = {

    // }

    const handletweet = async (e) => {
        let formData = new FormData();
        formData.append('file', file[0]);
       
        const imglink = await axios.post(`${BASE_URL}/upload`, formData);
        console.log('imglink', imglink)
        // const data = await axios.post(`${BASE_URL}/tweet`, content, verifyuser);
        // console.log('data', data);
        // setTweetdis(null);
        // setUploadimg(null);
      

    };


    return (
        <div>
            <p className="fw-bold ps-2 my-2"></p>

            <form className="border-bottom pb-3">
                <div>
                    <textarea
                        onChange={(e) => setTweetdis(e.target.value)}
                        type="text"
                        placeholder="What's happening"
                        className="bg-light rounded w-100 p-2">
                    </textarea>
                </div>
                <div style={{ boxSizing: 'border-box' }}>

                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    <ImageIcon onClick={handleImageIconClick} style={{ cursor: 'pointer' }} />

                    {preview && (
                        <img src={preview} alt="Preview" className="p-2 w-100" />
                    )}

                    <div className='d-flex justify-content-end g-4'>

                        {preview && (
                            <button className="btn btn-danger  px-3 rounded-pill me-4 d-inline" onClick={(e) => setPreview(null)}>
                                Close
                            </button>
                        )}

                        <button className="btn btn-primary  px-3 rounded-pill  d-inline" onClick={handletweet}>
                            Tweet
                        </button>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default MainTweet;
