let start = 0;
export let idArray = []
export const setId=()=>{ 
    try{
        start +=1 
        idArray.push(start.toString())
    }catch(err){}
}

export const getId=()=>{
    return idArray.pop()
}




