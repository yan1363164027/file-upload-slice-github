import { UPLOAD_INFO, ALLOW_TYPE, CHUNK_SIZE, API } from "./config.js";

((doc) => {
  const oProgress = doc.querySelector("#uploadProgress");
  const oUploader = doc.querySelector("#videoUploader");
  const oInfo = doc.querySelector("#uploadInfo");
  const oBtn = doc.querySelector("#uploadBtn");

  let timer = null;

  async function uploadVideo() {
    if (!timer) {
      const [file] = oUploader.files;
      if (!file) {
        oInfo.innerText = UPLOAD_INFO["No_File"];
        return;
      }
      // 类型
      if (!ALLOW_TYPE[file.type]) {
        oInfo.innerText = UPLOAD_INFO["INVALID_Type"];
        return;
      }
      timer = 1;
      const { name, type, size } = file;
      const fileName = new Date().getTime() + "_" + name;
      let uploadResult = null;
      oProgress.max = size;
      oInfo.innerText = "";
      // 已经上传的大小
      let uploadedSize = 0;
      while (uploadedSize < size) {
        const fileChunk = file.slice(uploadedSize, uploadedSize + CHUNK_SIZE);
        // 创建切片
        const formData = createFormData({
          name,
          type,
          size,
          fileName,
          uploadedSize,
          file: fileChunk,
        });
        try {
          uploadResult = await axios.post(API.UPLOAD_VIDEO, formData);
          console.log(uploadResult);
        } catch (e) {
          console.log(e);
          oInfo.innerText = `${UPLOAD_INFO["UPLOAD_FAILED"]} (${e.msg})`;
          return;
        }
        uploadedSize += fileChunk.size;
        oProgress.value = uploadedSize;
      }
      oInfo.innerText = UPLOAD_INFO["UPLOAD_SUCCESS"];
      oUploader.value = null;
      oProgress.value = 0;
      timer = null;
    } else {
      alert("请先等待上一个文件上传完成！");
    }
  }

  // file就是每次的fileChunk(文件切片)
  function createFormData({ name, type, size, fileName, uploadedSize, file }) {
    const formData = new FormData();
    const [keyArr, valArr] = [
      Object.keys(arguments[0]),
      Object.values(arguments[0]),
    ];
    for (let i = 0; i < keyArr.length; i++) {
      formData.append(`${keyArr[i]}`, valArr[i]);
    }
    return formData;
  }
  // 绑定事件
  function bindEvent() {
    oBtn.addEventListener("click", uploadVideo, false);
  }
  const init = () => {
    bindEvent();
  };
  console.log("############");
  init();
})(document);
