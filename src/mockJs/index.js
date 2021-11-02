import Mock from 'mockjs';
const Random = Mock.Random;

var listData = function () {
    let _data = []
    for (let i = 0; i < 20; i++) {
        let dataList = { // 详细 规则 参照mockjs官网
            num:Random.natural(1000,5000),
            name: Random.cname(), // Random.cname() 随机生成中文名
            "gender|1":["男","女"],
            "age|25-60": 100,
            // "userID|"
        }
        _data.push(dataList)
    }
    return { _data }
}
// url为要拦截的请求地址  请求方式  请求数据（规则） （此处api会被mockjs拦截）
Mock.mock('http://test.com/api/detailData', 'get', listData())


