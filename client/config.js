/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://nnklyn04.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        queryUrl: `${host}/weapp/query`,

        //上传新用户资料
        adduserUrl: `${host}/weapp/adduser`,

        //修改用户资料
        modifyuserUrl: `${host}/weapp/modifyuser`,

        //读最近的地点
        getnearestadrUrl: `${host}/weapp/getnearestadr`,

        //无图上传
        comwithoutpicUrl: `${host}/weapp/comwithoutpic`,

        //有图上传
        comwithpicUrl: `${host}/weapp/comwithpic`,

        //新建地点
        newadrUrl: `${host}/weapp/newadr`,
    }
};

module.exports = config;
