export const constant = {
    baseUrl : 'https://localhost/fittr/api/',
}

export interface apiResponce{
    statusCode : number,
    message :String,
    data : any,
    isSuccess : boolean
}