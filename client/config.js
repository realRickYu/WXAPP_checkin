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

        idUrl: `${host}/weapp/id`,

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

        //判断是否注册过
        registeredUrl: `${host}/weapp/registered`,

        //获取用户资料
        getuserinfoUrl: `${host}/weapp/getuserinfo`,

        //获取坐标附近的地址名称（最多20个）
        suggestedadrUrl: `${host}/weapp/suggestedadr`,

        //搜索数据库中有的地址名称
        searchadrUrl: `${host}/weapp/searchadr`,

        //地址信息
        adrinfoUrl: `${host}/weapp/adrinfo`,

        //时间线
        timelineUrl: `${host}/weapp/timeline`,

        //个人历史
        personalUrl: `${host}/weapp/personal`,

        //搜索用户
        findpersonUrl: `${host}/weapp/findperson`,

        //其他人的个人主页
        otherpersonUrl: `${host}/weapp/otherperson`,

        //两个用户是否为好友
        relationUrl: `${host}/weapp/relation`,

        //地址名称的主页
        placeUrl: `${host}/weapp/place`,

        //查看收件箱
        inboxUrl: `${host}/weapp/inbox`,

        //收件箱更新
        inboxupdateUrl: `${host}/weapp/inboxupdate`,

        //加好友申请
        addfriendUrl: `${host}/weapp/addfriend`,

        //同意成为好友
        agreefriendUrl: `${host}/weapp/agreefriend`,

        //点赞
        likeUrl: `${host}/weapp/like`,

        //根据地址id获取相关信息
        adinfoUrl: `${host}/weapp/adinfo`,

        //地址信息(friend)
        adrinfofriendUrl: `${host}/weapp/adrinfofriend`,
        
        //根据动态的id返回点赞的所有人的id及name
        likegroupUrl: `${host}/weapp/likegroup`,

    }
};

module.exports = config;
