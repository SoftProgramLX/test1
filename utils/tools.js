import SQtime from './SOtime.js'
console.log('SQtime', SQtime)
let timeout = null
let flag = false
let timer = null
export default {
	...SQtime,
	debounce(func, wait = 500, immediate = false) {
	    // 清除定时器
	    if (timeout !== null) clearTimeout(timeout)
	    // 立即执行，此类情况一般用不到
	    if (immediate) {
	        const callNow = !timeout
	        timeout = setTimeout(() => {
	            timeout = null
	        }, wait)
	        if (callNow) typeof func === 'function' && func()
	    } else {
	        // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
	        timeout = setTimeout(() => {
	            typeof func === 'function' && func()
	        }, wait)
	    }
	},
	throttle(func, wait = 500, immediate = true) {
	    if (immediate) {
	        if (!flag) {
	            flag = true
	            // 如果是立即执行，则在wait毫秒内开始时执行
	            typeof func === 'function' && func()
	            timer = setTimeout(() => {
	                flag = false
	            }, wait)
	        }
	    } else if (!flag) {
	        flag = true
	        // 如果是非立即执行，则在wait毫秒内的结束处执行
	        timer = setTimeout(() => {
	            flag = false
	            typeof func === 'function' && func()
	        }, wait)
	    }
	},
	// 获取时间
	getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)
	
		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
	
		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	},
	
	setSession(key, value) {
	  if (typeof value == 'object') {
	    //如果要存储对象，则先转为json串
	    value = window.JSON.stringify(value)
	  }
	  sessionStorage.setItem(key, value)
	},
	getSession(key) {
	  let value = sessionStorage.getItem(key) //字符串或json串
	  if (value) {
	    try {
	      let json = window.JSON.parse(value) //json串转为js对象
	
	      if (typeof json == 'object' && json) {
	        //利用了一点，当符合json格式，串会成功转为js对象，否则为null
	        return json
	      }
	      return value
	    } catch (e) {
	      return value
	    }
	  } else {
	    return value
	  }
	}
}