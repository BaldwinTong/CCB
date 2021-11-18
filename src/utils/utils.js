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