const express = require('express');
const router = express.Router();
const user = require('../models/user_model');
const mongoose = require('mongoose');
const Tweets = require('../models/tweetmodel');
const verifyuser = require('../middleware/veryfyuser');

// ------------------------------------------------------------------------------------------------------
// create a new Tweet
router.post('/api/tweet', verifyuser, async (req, res) => {
    const { content } = req.body;
    try {
        if (!content) {
            return res.status(400).json({ error: "One or more mandatory fields are empty" });
        }
        const newTweet = new Tweets({ ...req.body, tweetedBy: req.user });
        // console.log("new tweet", newTweet);
        const savedTweet = await newTweet.save();
        // console.log('saved tweet', savedTweet);
        res.status(200).json({ massage: 'tweet added successfully', savedTweet: savedTweet });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// ------------------------------------------------------------------------------------------------------

// Delete a tweet
router.delete('/api/deletetweet/:id', verifyuser, async (req, res) => {
    try {
        const { id } = req.params;
        const tweet = await Tweets.findById(id);

        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }

        if (tweet.tweetedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You do not have permission to delete this tweet' });
        }
        Tweets.deleteOne({ _id: id }).then((result) => {
            res.status(200).json({ message: 'Tweet deleted successfully' });
        }).catch((error) => {
            console.log(error);
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// ------------------------------------------------------------------------------------------------------

//all users tweets explore 
router.get("/api/exploretweet", verifyuser, async (req, res) => {
    try {
        const dbPosts = await Tweets.find().populate("tweetedBy", "_id name profilePic");
        res.status(200).json({ posts: dbPosts });
    } catch (error) {
        console.log(error);
    }
});


// ------------------------------------------------------------------------------------------------------
// timeline tweet 

router.get("/api/timelinetweert",verifyuser,async (req, res) => {
    try {
        // console.log(req.headers.authorization);
      const currentUser = await user.findById(req.user._id);
      const userTweets = await Tweets.find({ tweetedBy: currentUser._id });
      const followersTweets = await Promise.all(
        currentUser.following.map((followerId) => {
          return Tweets.find({ userId: followerId });
        })
      );
  
      res.status(200).json(userTweets.concat(...followersTweets));
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
// ------------------------------------------------------------------------------------------------------

// current user tweet 
router.get("/api/myalltweet", verifyuser, async (req, res) => {
    try {
        const dbPosts = await Tweets.find({ tweetedBy: req.user._id }).populate("tweetedBy", "_id name profilePic");
        res.status(200).json({ posts: dbPosts });
    } catch (error) {
        console.log(error);
    }
});

// ---------------------------------------------------------------------------------------------------------

//api for like or disdike tweet both function in one api call
router.put("/api/like/dislike/:id", verifyuser, async (req, res) => {
    try {
        let userId = req.user._id.toString().replace("ObjectId(\"", "").replace("\")", ""); 
        // userId = userId.replace("ObjectId(\"", "").replace("\")", "");
        
        const tweet = await Tweets.findById(req.params.id);

        if (!tweet.likes.includes(userId)) {
            await tweet.updateOne({ $push: { likes: userId } });
            res.status(200).json("tweet has been liked");
        } else {
            await tweet.updateOne({ $pull: { likes: userId } });
            res.status(200).json("tweet has been disliked");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ---------------------------------------------------------------------------------------------------------

// Add a comment to a tweet
router.put('/api/comment/:id', verifyuser, async (req, res) => {
    try {
        const { id } = req.params;
        const commentText = req.body['commentText '];
        // console.log(commentText);
        // console.log(req.body);
        // let commentedBy = req.user._id.toString().replace("ObjectId(\"", "").replace("\")", ""); 

        if (!commentText) {
            return res.status(400).json({ error: 'Content cannot be empty' });
        }
        const tweet = await Tweets.findById(id);
        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }
        tweet.comments.push({ commentText, commentedBy:req.user._id }); // Corrected line
        const updatedTweet = await tweet.save();

        res.status(200).json({ message: 'Comment added successfully', updatedTweet });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ---------------------------------------------------------------------------------------------------------
// Retweet or undo retweet a tweet
router.put('/api/retweet/:id', verifyuser, async (req, res) => {
    try {
        const { id } = req.params;
        const tweet = await Tweets.findById(id);
       
        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }
        // Check if the user has already retweeted this tweet
        if (tweet.retweetBy.includes(req.user._id)) {
            // If yes, remove the user from the retweetBy array (undo retweet)
            tweet.retweetBy.pull(req.user._id);
            const updatedTweet = await tweet.save();
            return res.status(200).json({ message: 'Retweet undone successfully', updatedTweet });
        }
        // If not, add the user to the retweetBy array (retweet)
        tweet.retweetBy.push(req.user._id);
        const updatedTweet = await tweet.save();

        res.status(200).json({ message: 'Tweet retweeted successfully', updatedTweet });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ---------------------------------------------------------------------------------------------------------

// get all retweetBy the user 

router.get('/api/retweetbyuser', verifyuser, async (req, res) => {
    try {
        
        const retweetedTweets = await Tweets.find({ retweetBy: req.user._id });
        if (!retweetedTweets) {
            return res.status(404).json({ error: 'No retweeted tweets found for this user' });
        }
        res.status(200).json({ message: 'Retweeted tweets fetched successfully', retweetedTweets });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});
// ---------------------------------------------------------------------------------------------------------


module.exports = router;