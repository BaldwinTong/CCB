import service from "../axios";
export function Login(data) {
    return service({
        url:'/TokenAuth/Authenticate',
        method:'post',
        data
    })
}