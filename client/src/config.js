const BASE_URL = "http://localhost:8000";
export const UPLOAD_INFO = {
  No_File: "请先选择文件！",
  INVALID_Type: "不支持该文件类型上传！",
  UPLOAD_FAILED: "上传失败！",
  UPLOAD_SUCCESS: "上传成功！",
};

export const ALLOW_TYPE = {
  "video/mp4": "mp4",
  "video/ogg": "ogg",
};

export const CHUNK_SIZE = 10 * 1024 * 1024; // 64k = 64 * 1024

export const API = {
  UPLOAD_VIDEO: BASE_URL + "/upload_video",
};
