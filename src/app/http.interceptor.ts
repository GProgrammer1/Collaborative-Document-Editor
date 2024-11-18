import { HttpInterceptorFn } from '@angular/common/http';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes("auth")) {
    return next(req) ;
  }
 
  const token = localStorage.getItem('token') ;
  const newReq = req.clone({
    setHeaders :{
      'Authorization' : `Bearer ${token}`   
    }
  }) ;

  return next(newReq) ;
};
