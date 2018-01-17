/* 
* @Author: Marte
* @Date:   2017-12-07 17:33:59
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-16 09:01:20
*/
import axios from 'axios';
import qs from 'qs';
<<<<<<< HEAD
var baseUrl = 'http://10.3.136.76:888/';
=======
var baseUrl = 'http://10.3.136.126:888/';
>>>>>>> a9089c3ed7dbd9de3568bfc137a0c26c4a7f4884
var fliterUrl = function(url){
    if(url.startsWith('http')){
        return url;
    }
    return baseUrl + url;
}
export default {
    get:(opt)=>{
        return  new Promise((resolve,reject)=>{
                    if(opt.ve){
                        opt.ve['loading'] = true;
                    }
                    axios.get(fliterUrl(opt.url)).then((response)=>{
                        if(opt.ve){
                            opt.ve['loading'] = false;
                        }
                        resolve(response);
                    }).catch((error)=>{
                        if(opt.ve){
                            opt.ve['loading'] = false;
                        }
                        reject(error);
                    })
                })
    },
    post:(opt)=>{
        return new Promise((reslove,reject)=>{
                 axios({
                    url:fliterUrl(opt.url),
                    data: qs.stringify(opt.parmas),
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((response) => {
                       reslove(response);
                    })
                    .catch((error) => {
                       reject(error);
                    }
                );
   
        })
    }
}
