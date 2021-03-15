const filesRouter = require('express').Router();
const upload = require('../middlewares/upload');
const { addFile, getFilesInfo, deleteFile } = require('../controllers/files');

filesRouter.post('/upload', upload.single('file'), addFile);
filesRouter.get('/list', getFilesInfo);
filesRouter.delete('/delete/:id', deleteFile);


module.exports = filesRouter;