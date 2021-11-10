import Mock from "mockjs"
var Random = Mock.Random
function bill() {
    let list = [];
    for (let i = 0; i < 20; i++) {
      let obj =   Mock.mock({
            id:Random.id(),
            weight: Random.natural(1,999),
            date:Random.datetime('yyyy-MM-dd  HH:mm:ss'),
            unitPrice: Random.float(1, 100,2,2),
            totalPrice: Random.float(100, 999999,2,2),
            tradingUserName: Random.cname(),
            checkUser: Random.cname(),
            type: Random.integer(1, 4)
        })
        list.push(obj)
    }
    return list
}

export default bill


