import service from "../axios";
export function GetAll(data) {
    data.MaxResultCount = 999999;
    return service({
        url: '/services/app/FarmProductPrice/GetAll',
        method: 'get',
        data
    })
}
export function Create(data) {
    return service({
        url: '/services/app/FarmProductPrice/Create',
        method: 'post',
        data
    })
}
export function Update(data) {
    return service({
        url: '/services/app/FarmProductPrice/Update',
        method: 'put',
        data
    })
}
export function Delete(data) {
    return service({
        url: '/services/app/FarmProductPrice/delete',
        method: 'delete',
        data
    })
}
export function BatchDelete(data) {
    return service({
        url: '/services/app/FarmProductPrice/BatchDelete',
        method: 'post',
        data
    })
}