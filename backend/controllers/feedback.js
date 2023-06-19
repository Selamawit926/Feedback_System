const Feedback = require('../models/feedback');
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');
const he = require('he');

const addFeedback = asyncHandler(async (req,res) =>{
    const comment = req.body.comment;
    const title = req.body.title;
    const userId = req.params.id;

    const newFeedback = await Feedback.create({
        comment: comment,
        title: title,
        userId: userId
    });

    if(newFeedback){
        return res.status(201).json({
            comment: he.encode(newFeedback.comment),
            title: he.encode(newFeedback.title)
        })
    }
    else{
        res.status(400);
        throw new Error('Error adding a new feedback')
    }
});

const getFeedbacks = asyncHandler(async (req,res)=>{
    const userId = req.params.id;

    const feedbacks = await Feedback.find({
        userId: userId
    });

    if(feedbacks){
        return res.status(200).json({
            feedbacks: feedbacks
        })
    }
    else{
        res.status(400);
        throw new Error('Error fetching feedbacks');
    }

});

const getFeedback = asyncHandler(async (req,res)=>{
    const userId = req.params.id;
    const feedbackId = req.body.feedbackId;

    const feedback = await Feedback.find({
        _id: feedbackId,
        userId: userId
    });

    if(feedback){
        return res.status(200).json({
            comment: he.encode(feedback.comment),
            title: he.encode(feedback.title),
            id: feedback._id
        })
    }
    else{
        res.status(400);
        throw new Error('Error fetching feedback');
    }

});

const updateFeedback = asyncHandler(async (req,res) =>{
    const userId = req.params.id;
    const {feedbackId,feedback} = req.body;

    const updatedFeedback = await Feedback.findOneAndUpdate(
        {
            id: feedbackId,
            userId: userId
        },
        {
            feedback: feedback
        }
    )

    if(updatedFeedback){
        return res.status(201).json({
            comment: he.encode(updatedFeedback.comment),
            title: he.encode(updateFeedback.title)
        });

    }
    else{
        res.status(400)
        throw new Error('Error updating feedback');
    }
});

module.exports = {addFeedback,getFeedbacks,updateFeedback,getFeedback};