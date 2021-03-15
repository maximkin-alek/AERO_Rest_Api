const db = require('../config/db');
const fs = require('fs');
const path = require('path');


// Добавить файл
module.exports.addFile = async (req, res) => {
    const { filename, originalname, mimetype, size } = req.file;
    const ext = originalname.substr(originalname.lastIndexOf('.') + 1);
    try {
        await db.query("INSERT INTO `files`( `name`, `extension`, `mime-type`, `size`, `date`) VALUES ('" + filename + "', '" + ext + "', '" + mimetype + "', '" + size + "', NOW())", (err, result) => {
            if (err) {
                res.status(400).send({ message: err });
            }
            res.status(200).send({ message: 'Файл успешно загружен' });
        })
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
}
// Получить список файлов с параметрами
module.exports.getFilesInfo = async (req, res) => {
    await db.query("SELECT `name`, `extension`, `mime-type`, `size`, `date` FROM `files`", (err, result) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            res.status(200).send({ result });
        }
    })
}
// Удалить файл 
module.exports.deleteFile = async (req, res) => {

    const id = req.params.id;
    await db.query(" SELECT `id`, `name`, `extension`, `mime-type`, `size`, `date` FROM `files` WHERE name = '" + id + "'", (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        } else if (result.length <= 0) {
            res.status(404).send({ message: 'Файл не найден' });
        }
        else {
            db.query(" DELETE FROM `files` WHERE name = '" + id + "'", (err, result) => {
                if (err) {
                    res.status(400).send({ message: err });
                } else {
                    const filePath = path.join(__dirname, `../my-uploads/${id}`);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            res.status(200).send({ message: 'Файл успешно удален' });
                        }
                    });


                }

            })
        }
    })



}