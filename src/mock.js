// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
	let posts = [];
	let banner = [];
	for (let i = 0; i < 4; i++) {
		let item = {
			name: Random.csentence(5, 30), //  Random.csentence( min, max )
			banner_pic: Random.dataImage('300x150', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
		}
		banner.push(item)
	}
	for (let i = 0; i < 10; i++) {
		let newArticleObject = {
			title: Random.csentence(5, 30), //  Random.csentence( min, max )
			thumbnail_pic_s: Random.dataImage('120x50', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
		}
		posts.push(newArticleObject)
	}
	
	return {
		data: {
			banner,
			posts
		} 
	}
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('http://192.168.89.72:81/v1/mock/page', 'post', produceNewsData);