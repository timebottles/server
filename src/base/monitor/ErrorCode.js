/** 常量定义 - 通用返回码 */
export default class ErrorCode{

}

// 成功返回码
ErrorCode.SUCCESS = 1000;
ErrorCode.SUCCESS_MSG = 'succ';
// 缺少参数
ErrorCode.LACK_PARAM = 1001;
ErrorCode.LACK_PARAM_MSG = 'lack param';
// 签名错误
ErrorCode.SIGN_ERR = 1002;
ErrorCode.SIGN_ERR_MSG = 'sign error';
// TOKEN错误
ErrorCode.TOKEN_ERR = 1003;
ErrorCode.TOKEN_ERR_MSG = 'token error';
// Param 错误
ErrorCode.PARAM_ERR = 1004;
ErrorCode.PARAM_ERR_MSG = 'param error';
// System 错误
ErrorCode.SYSTEM_ERR = 1005;
ErrorCode.SYSTEM_ERR_MSG = 'system error';
