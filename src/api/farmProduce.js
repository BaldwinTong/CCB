import service from "../axios";
export function GetAll(data) {
    data.MaxResultCount = 999999;
    return service({
        url: '/services/app/FarmProduct/GetAll',
        method: 'get',
        params: data
    })
}
export function Create(data) {
    return service({
        url: '/services/app/FarmProduct/Create',
        method: 'post',
        data
    })
}
export function Update(data) {
    return service({
        url: '/services/app/FarmProduct/Update',
        method: 'put',
        data
    })
}
export function Delete(data) {
    return service({
        url: '/services/app/FarmProduct/Delete',
        method: 'DELETE',
        params: data
    })
}

export function BatchDelete(data) {
    return service({
        url: '/services/app/FarmProduct/BatchDelete',
        method: 'post',
        data
    })
}