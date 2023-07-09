export const shortIt =(data,key)=>{
    const filterData = [...data]
    filterData.sort((a,b)=>{
        // if(typeof a[key] === "string" && typeof b[key] === "string"){
        //     return a.name.localeCompare(b.name);
        // }else{
        //     return a[key]-b[key]
        // }
        let start = new Date(a[key])
        let end = new Date(b[key])
        return start - end
    })
    return filterData
}