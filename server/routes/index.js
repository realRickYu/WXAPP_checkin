/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)
router.get('/registered', validationMiddleware, controllers.registeredUrl)
router.get('/addfriend', validationMiddleware, controllers.addfriend)
router.get('/agreefriend', validationMiddleware, controllers.agreefriend)
router.get('/like', validationMiddleware, controllers.like)
router.get('/timeline', validationMiddleware, controllers.timeline)
router.get('/personal', validationMiddleware, controllers.personal)
router.get('/otherperson', validationMiddleware, controllers.otherperson)
router.get('/inbox', validationMiddleware, controllers.inbox)
router.get('/inboxupdate', validationMiddleware, controllers.inboxupdate)
router.get('/place', validationMiddleware, controllers.place)
router.get('/findperson', validationMiddleware, controllers.findperson)
router.get('/relation', validationMiddleware, controllers.relation)
router.get('/getuserinfo', validationMiddleware, controllers.getuserinfoUrl)
router.get('/suggestedadr', validationMiddleware, controllers.suggestedadr)
router.get('/adrinfo', validationMiddleware, controllers.adrinfo)
router.get('/adinfo', validationMiddleware, controllers.adinfo)
router.get('/likegroup', validationMiddleware, controllers.likegroup)
router.get('/adrinfofriend', validationMiddleware, controllers.adrinfofriend)
router.get('/searchadr', validationMiddleware, controllers.searchadr)

router.get('/query', validationMiddleware, controllers.query)

router.get('/adduser', validationMiddleware, controllers.adduser)//ok
router.get('/modifyuser', validationMiddleware, controllers.modifyuser)
router.get('/getnearestadr', validationMiddleware, controllers.getnearestadr)//ok
router.get('/comwithoutpic', validationMiddleware, controllers.comwithoutpic)//ok
router.post('/comwithpic', controllers.comwithpic)//ok
router.get('/newadr', validationMiddleware, controllers.newadr)//ok


// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

module.exports = router
