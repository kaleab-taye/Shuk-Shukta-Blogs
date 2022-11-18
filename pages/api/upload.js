// import mongoose from 'mongoose';
// import React from 'react';
// import * as Grid from 'gridfs-stream';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import multer from 'multer';

export default function upload(req, res) {
    
    
    try {
      
      
      res.json({file: req.body.file})
    } catch (error) {
        
        res.json({error : error.toString()})
    }
}
