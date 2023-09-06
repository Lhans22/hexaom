export default class HttpService {
    static async get(url:string,headers?:any){
        let responce = await fetch(url,headers);
        return await responce.json();
    }

    static async post(url:string ,data:any,token?:any,headers?:any){
        let response  = await fetch(url,{method:"POST",headers,body:JSON.stringify(data)});
        return await response.json();
    }
    static async delete(url:string,headers?:any){
        let response  = await fetch(url,{method:"DELETE",headers});
        return await response.json();
    }
    static async connect(url:string,data:any,headers?:any){
        let response  = await fetch(url,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body:new URLSearchParams(data)
        });
        return await response.json();
    }
}