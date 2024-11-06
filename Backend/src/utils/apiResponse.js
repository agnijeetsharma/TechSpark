class apiResponse{
    constructor(statucode,data,message="success"){
        this.statucode=statucode,
        this.data=data,
        this.message=message,
        this.success=statucode<400
    }
    
}

export {apiResponse}