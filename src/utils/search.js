export const searchIt = (data,input)=>{
    const filterData = data.filter((item)=>{
        return item.title.toLowerCase().includes(input.toLowerCase())
    })
    return filterData
}