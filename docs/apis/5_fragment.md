# 5 时光碎片

<br>
<br>
--------------------------------------------------------------------   
## 5.1 上传时光碎片

### 接口概述

* url : /fragment/upload
* 接口编号 : 51
* 请求类型 : post


### 请求参数


|字段|类型|可否为空|描述|
|:--|:--|:--|:--|:--|
|fragment|file|非空|时光碎片内容：图片、音频或视频等|
|fragment_type|int|非空|碎片类型：0图片，1音频、2视频|
|name|string|可空|时光碎片名字|
|des|string|可空|时光碎片描述|
|bid| string |可空|碎片所属瓶子id,空则为默认瓶子|
|create_time| timesteamp |可空|时光创建的时间（比如照片拍摄时间）|
|latitude| string |可空|纬度|
|longitude| string |可空|经度|
|local_id| string |可空|图片的本地标识|

### 返回数据

```
{
  "code": 1000 , //状态码
  "msg":"succ", //注释信息
  data:{
    "fragment": // 上传成功返回时光对象
    {
      "fid":"6lkjokj2lkjdoassd",
      "url":"http://xxxx/xxxx/xxx.xxx"
    }
  }
}
```

### 错误码

|code|meaning|
|:--:|:--|
|5101|创建失败|
|5102|文件解析失败|
|5103|瓶子不存在|


<br>
<br>
--------------------------------------------------------------------   
## 5.2 获取时光碎片列表

### 接口概述

* url : /fragment/list
* 接口编号 : 52
* 请求类型 : post


### 请求参数


|字段|类型|可否为空|描述|
|:--|:--|:--|:--|:--|
|bid| string |非空|碎片所属瓶子id|

### 返回数据

```
{
  "code": 1000,
  "msg": "succ",
  "data": {
    "fragments": [
      {
        "fid": "5880cf5fb110dcf76e700ddd", // 碎片id
        "name": "小宝宝的照片",
        "des": "小宝宝在玩耍",
        "fragment_type": 0,
        "url": "http://120.25.234.188/upload/fragment-1484836703761.png",
        "uid": "5880cd6d6a7279466e0e274f", // 创建者
        "bid": "5880cd8c6a7279466e0e2751",  // 瓶子id
        "upload_time": "2017-01-19T14:38:23.769Z",
        "update_time": "2017-01-19T14:38:23.769Z"
      }
    ]
  }
}
```

### 错误码

|code|meaning|
|:--:|:--|
|5201|获取失败|


