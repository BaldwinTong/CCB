import service from "../axios";
export function CategoryGetAll(data) {
    return service({
        url: '/services/app/FarmProductCategory/GetAll',
        method: 'get',
        params: data
    })
}