# fileUpload_slice

#### 介绍
大文件上传视频文件
文件的切片上传，之前接手过一个项目上面是需要上传文件的，这两天深入挖掘一下，学习切片上传以及断点续传。

#### 使用说明

1.  首先需要进入对应的文件夹，前端client以及后端server
2.  其次运行后端（npm run dev）因为修改了package.json里面script当中的代码
3.  后端服务可能会出现module_not_find的错误，不清楚原因，但是手敲一遍引入的express以及express-fileupload就行
4.  前端也是一样需要使用npm run dev运行，因为也是修改了package.json
5.  需要安装vite 以及 nodemon（这里的作用是监控）；nodemon ./app_server.js监控app_server.js文件
6.  安装使用cnpm可能会出现各种问题，所以建议大家使用npm安装各类包
