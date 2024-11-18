export interface HttpResponse<T> {
    timestamp : Date ;
    statusCode : number ;
    message : string ;
    data : T ;
}

export interface Document {
    filename : string ;
    directory : string ;
}