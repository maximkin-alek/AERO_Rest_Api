const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// Функция удаления файла из хранилища
function deleteFile(res, id, sendText) {
  const filePath = path.join(__dirname, `../my-uploads/${id}`);
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
    else {
      res.status(200).send({ message: sendText });
    }
  });
}

// Добавить файл
module.exports.addFile = (req, res) => {
  const { filename, originalname, mimetype, size } = req.file;
  const ext = originalname.substr(originalname.lastIndexOf('.') + 1);

  db.query("INSERT INTO `files`( `name`, `extension`, `mime-type`, `size`, `date`) VALUES ('" + filename + "', '" + ext + "', '" + mimetype + "', '" + size + "', NOW())", (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    }
    res.status(200).send({ message: 'Файл успешно загружен' });
  })
}
// Получить список файлов с параметрами
module.exports.getFilesInfo = (req, res) => {
  const list_size = req.headers.list_size ? req.headers.list_size : 10;
  let page = req.headers.page ? (req.headers.page - 1) : 0;

  db.query("SELECT `name`, `extension`, `mime-type`, `size`, `date` FROM `files` LIMIT " + page + ", " + list_size + " ", (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    else {
      res.status(200).send({ result });
    }
  })
}
// Удалить файл 
module.exports.deleteFile = (req, res) => {

  const id = req.params.id;
  db.query(" SELECT `id` FROM `files` WHERE name = '" + id + "'", (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    } else if (result.length <= 0) {
      res.status(404).send({ message: 'Файл не найден' });
    }
    else {
      db.query(" DELETE FROM `files` WHERE name = '" + id + "'", (err, result) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          deleteFile(res, id, 'Файл успешно удален');
        }
      })
    }
  })
}
// Получить информацию о файле
module.exports.getFileInfo = (req, res) => {
  const id = req.params.id;
  db.query("SELECT `name`, `extension`, `mime-type`, `size`, `date` FROM `files` WHERE name = '" + id + "'", (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    }
    else {
      res.status(200).send({ result });
    }
  })
}
module.exports.updateFile = (req, res) => {
  const id = req.params.id;
  // Проверяем наличие файла
  db.query(" SELECT `id` FROM `files` WHERE name = '" + id + "'", (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    } else if (result.length <= 0) {
      res.status(404).send({ message: 'Файл не найден' });
    }
    else {
      // Обновляем файл
      const { filename, originalname, mimetype, size } = req.file;
      const ext = originalname.substr(originalname.lastIndexOf('.') + 1);
      db.query("UPDATE `files` SET `name`='" + filename + "',`extension`='" + ext + "',`mime-type`='" + mimetype + "',`size`='" + size + "',`date`= NOW() WHERE name = '" + id + "'", (err, result) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          deleteFile(res, id, 'Файл успешно обновлен');
        }
      })
    }
  })
}

