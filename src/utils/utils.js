export function generateMixed(n) {
    var str = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 9);
        res += str[id];
    }
    console.log(res);
    return res;
}

export function choiceDate(n) {
    let date = getDay();
    let startDate = "";
    let endDate = "";
    if (n == 1) {
        let list = [startDate, endDate];
        return list
    } else if (n == 2) {
        startDate = date.Year + '-' + date.month + '-01';
        endDate = date.Year + '-' + date.month + '-' + date.day;
        let list = [startDate, endDate];
        return list
    } else if (n == 3) {
        if (date.month - n > 0) {
            startDate = date.Year + '-' + (date.month - 3) + '-01';
        } else if (date.month - n == 0) {
            startDate = (date.Year - 1) + '-' + 12 + '-01';
        } else if (date.month - n < 0) {
            let year = date.Year - 1;
            let month = 12 + (date.month - n);
            startDate = year + '-' + month + '-01';
        }
        endDate = date.Year + '-' + date.month + '-' + date.day;
        let list = [startDate, endDate];
        return list
    } else if (n == 4) {
        if (date.month - 6 > 0) {
            startDate = date.Year + '-' + ((date.month - 6) > 10 ? (date.month - 6) : ('0' + (date.month - 6))) + '-' + '01'
        } else if (date.month - 6 == 0) {
            startDate = (date.Year - 1) + '-' + (date.month = 12) + '-' + '01'
        } else if (date.month - 6 < 0) {
            startDate = (date.Year - 1) + '-' + (((12 + date.month - 6) > 10) ? (date.month - 6) : ('0' + (date.month - 6))) + '-' + '01'
        }
        endDate = date.Year + '-' + (date.month > 10 ? date.month : ('0' + date.month)) + '-' + date.day;
        let list = [startDate, endDate];
        return list
    }
}

function getDay(dates) {
    let date = dates ? dates : new Date();
    let obj = {};
    obj.Year = date.getFullYear();
    obj.month = date.getMonth() + 1; // date.getMonth() + 1
    obj.day = date.getDate();
    return obj
}