import service from "../axios";
export function GetSingleLimit(data) {
    return service({
        url: '/services/app/Configuration/GetSingleLimit',
        method: 'get',
        data
    })
}
export function EditSingleLimit(data) {
    return service({
        url: '/services/app/Configuration/ChangeSingleLimit',
        method: 'post',
        data
    })
}