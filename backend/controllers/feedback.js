const Feedback = require('../models/feedback');
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');
const multer = require('multer');
const pdfParser = require('pdf-parse');

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the directory where you want to store the uploaded files
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const originalExtension = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.${originalExtension}`);
    },
  });
  
  // Create the Multer upload middleware
  const upload = (req, res, next)=>{
    multer({ storage });
    res.status(200).send('Success');
  }
  
  // File validation middleware
  const checkPdf = (req, res, next) => {
    const { path } = req.file;
    pdfParser(path)
      .then(() => {
        // File is a valid PDF
        next();
      })
      .catch((err) => {
        // File is not a valid PDF
        res.status(401).send('Invalid File');
      });
  }


module.exports = {addFeedback,getFeedbacks,updateFeedback, getFeedback, checkPdf, upload};