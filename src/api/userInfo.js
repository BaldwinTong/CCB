import service from "../axios";
export function GetUserInfo(data) {
    data.MaxResultCount = 999999;
    return service({
        url: '/services/app/User/GetAll',
        method: 'get',
        params: data
    })
}
export function UpdateUserInfo(data) {
    return service({
        url: '/services/app/User/Update',
        method: 'PUT',
        data
    })
}