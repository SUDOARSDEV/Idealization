export class Globallist {
    public static activeuser:any;

    public setlocalstorage(data:any,name:any){
        localStorage.setItem(name,data);
    }

    public getUserinfo() {  
        let data:any = localStorage.getItem('currentUser');
        Globallist.activeuser = JSON.parse(data);
        return Globallist.activeuser.userinfo;
    }

    public printInfo(data:any){
        console.log(data);        
    }

}
