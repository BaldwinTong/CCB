import service from "../axios";
export function GetAll(data) {
    data.MaxResultCount = 999999;
    return service({
        url: '/services/app/Whitelist/GetAll',
        method: 'get',
        params: data
    })
}
export function Create(data) {
    return service({
        url: '/services/app/Whitelist/Create',
        method: 'post',
        data
    })
}

export function Update(data) {
    return service({
        url: '/services/app/Whitelist/Update',
        method: 'put',
        data
    })
}

export function Delete(data) {
    return service({
        url: '/services/app/Whitelist/Delete',
        method: 'DELETE',
        params: data
    })
}
export function BatchDelete(data) {
    console.log(data);
    return service({
        url: '/services/app/Whitelist/BatchDelete',
        method: 'post',
        data
    })
}