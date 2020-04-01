/**
 * 过滤特殊字符
 * @param s
 * @returns {string}
 */
export function stripscript(s)
{
    var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    console.log("执行了")
    return rs;
}
 //方法都可以定义在这里
 //验证邮箱
 //验证密码
 //验证验证码
