import reqConfig from '@/config/request_config.js' 
const { proApi, devApi, preApi } = reqConfig
// #ifdef MP-WEIXIN
const accountInfo = wx.getAccountInfoSync()
const env = accountInfo.miniProgram.envVersion
// #endif

// #ifndef MP-WEIXIN
const env = 'release'
// #endif
// 这里的环境更改针对开发版和体验版 proApi, devApi, preApi
const baseApi = devApi

const CONFIG = {
	//开发环境
	development: {
		baseUrl: baseApi[env],
		formHeader: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	},
	//生产环境配置
	production: {
		baseUrl: baseApi[env],
		formHeader: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
}
export default CONFIG[process.env.NODE_ENV]
