const express = require('express');
const filesRouter = require('express').Router();
const upload = require('../middlewares/upload');
const { addFile, getFilesInfo, deleteFile, getFileInfo } = require('../controllers/files');

filesRouter.post('/upload', upload.single('file'), addFile);
filesRouter.get('/list', getFilesInfo);
filesRouter.get('/:id', getFileInfo);
filesRouter.use('/download', express.static('my-uploads'));
filesRouter.delete('/delete/:id', deleteFile);


module.exports = filesRouter;