const express = require("express");
const uploader = require("express-fileupload");
const bodyParser = require("body-parser");

const { extname, resolve } = require("path");
const { existsSync, appendFileSync, writeFileSync } = require("fs"); // sync是同步的意思
const ALLOW_TYPE = {
  "video/mp4": "mp4",
  "video/ogg": "ogg",
};
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
app.use(uploader());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,GET");
  next();
});

app.post("/upload_video", (req, res) => {
  const { name, type, size, fileName, uploadedSize } = req.body;
  // 此时你会发现少了一个file
  // file需要这样获取
  const { file } = req.files;
  if (!file) {
    res.send({
      code: 1001,
      msg: "No file uploaded",
    });
    return;
  }
  if (!ALLOW_TYPE[type]) {
    res.send({
      code: 1002,
      msg: "The type is not allowed for upload",
    });
    return;
  }

  // 需要一个后缀名 虽然fileName当中是存在的，但是可能需要转类型 所以需要获取extname(name)
  const uploadFileName = fileName;
  const filePath = resolve(__dirname, "./upload_src/" + uploadFileName);
  // uploadedSize !== "0" 刚开始时uploadedSize为 '0' 因为传过来的都是字符串
  // axios内部函数会将传过来的数据全部转化字符串这里不过多介绍
  // 不等于0说明文件正在上传或者已经上传完成
  if (uploadedSize !== "0") {
    if (existsSync(uploadFileName)) {
      res.send({
        code: 1003,
        msg: "No such files exists",
      });
      return;
    }
    appendFileSync(filePath, file.data);
    res.send({
      code: 0,
      msg: "Appended",
      data: {
        video_url: "http://localhost:8000" + uploadFileName,
      },
    });
    return;
  }
  // 否则就创建文件夹
  writeFileSync(filePath, file.data);
  res.send({
    code: 0,
    msg: "File upload complete",
  });
});

app.listen(PORT, () => console.log("Server is running on " + PORT));
