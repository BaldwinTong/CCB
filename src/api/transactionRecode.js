import service from "../axios";
export function GetAll(data) {
    data.MaxResultCount = 999999;
    return service({
        url: '/services/app/TransactionRecode/GetAll',
        method: 'get',
        params: data
    })
}