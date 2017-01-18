#3 用户模块

<br>
<br>
----

---
## 3.1 账密登录

### 概述
* url : /user/login
* 接口编号 : 31
* 请求类型 : post

### 请求参数           
|字段|类型|可否为空|描述|
|:--:|:--:|:--:|:--:|
| user_type |String|N|登录账号类别 (1为普通帐号登录，2:qq, 3:微信, 4:微博 )|
| token |String|Y|第三方账号access_token（没有则不传）|
| openid |String|Y|第三方账号openid (没有则不传)|
| account |String|N|帐号|
| password |String|Y|密码|


### 返回数据


```
{
	"code": 1000 , //状态码
	"msg":"succ", //注释信息
	data:{
		"user_info": //素材数组
		{
			"uid":6,
			"account": "13812345678" // 用户帐号
			"name":"felix"//用户名
			"gender":1 //性别 （1为男 0为女）
			"user_type":1 //第三方账户类别 （见 3.1 接口说明）
			"user_status":1//用户状态（1为正常 2为锁定）
			"avator":"http://xxx.com/1.jpg" //小头像url
			"large_avator":"http://xxx.com/1.jpg" //大头像url
			"token":"xxxx" //账号token
			"expires":1435919975 //token过期时间
			"phone":13812345678 //用户绑定手机
			"email":abc@abc.com // 邮箱
			"is_new_user":1 //是否为新用户（1为新用户、0为老用户）
		}
	}
}
```

### 错误码

|code|meaning|
|:--:|:--|
|3100|账号或密码错误|
|3101|账号已锁定|

<br>
<br>
---
## 3.2基本注册

### 概述
* url : /user/register
* 接口编号 : 32
* 请求类型 : post

### 请求参数

|字段|类型|可否为空|描述|
|:--:|:--:|:--:|:--:|:--:|
|phone|String|N|手机号|
|password|String|N|8-16位字母和数字的组合|
|verifycode|String|N|短信验证码|

### 返回数据

```
{
    "code":"000000",
    "msg":"success",
    "data":{
        "uid":"6666"
    }
}
```

### 错误码

|code|meaning|
|:--:|:--|
|3200|验证码错误|
|3201|手机号输入有误|
|3202|密码不符合规则|
|3203|系统错误|

<br>
<br>
---
## 3.3 上传头像
* url : /user/update_avator
* 接口编号 : 33
* 请求类型 : post

### 请求参数


|字段|类型|可否为空|描述|
|:--:|:--:|:--:|:--:|
|image|file|N|头像图片|

### 返回数据


```
{
    "code":"000000",
    "msg":"success",
    "data":{
        "avator":"http://www.baidu.com"
    }
}
```

### 错误码


|code|meaning|
|:--:|:--|
|3300|图片格式不正确|
|3301|图片过大|
|3302|图片过小|

<br>
<br>
----

## 3.4 补充用户信息

## 接口概述

* url : /user/update_info
* 接口编号 : 34
* 请求类型 : post

###  请求参数

|字段|类型|可否为空|描述|
|:--:|:--:|:--:|:--:|
|name|String|Y||
|gender|String|Y|性别|
|phone|String|Y||
|email|String|Y|

### 返回数据


```
{
    "code":"000000",
    "msg":"success",
    "data":{
        "name":"felix",
        "phone":"13800138000",
        "gender":"1",
        "avator":"http://www.baidu.com/small.png",
        "large_avator":"http://www.baidu.com/big.png",
        "email":"1234567@qq.com"
    }
}
```

### 错误码


|code|meaning|
|:--:|:--|
|3400|手机号已注册|
|3401|邮箱已被占用|
