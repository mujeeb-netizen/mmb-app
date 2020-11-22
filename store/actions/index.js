
export const getUser=(data)=>{
    return {
        type:'GET_USER',
    }
}
export const editUid=(data)=>(
    {
        type: 'EDIT_UID',
        uid: data.uid
    }
)
export const editUser=(data)=>{
    return {
        type:'EDIT_USER',
        uid: data.uid,

        title: data.title,
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        phone: data.phone,
        customerId: data.customerId,
        address: data.address,
        town: data.town,
        zip: data.zip,
        masjid: data.masjid,
        issq: data.issq,
        isans: data.isans,
        islo: data.islo,
        isjg: data.isjg,
        iscg: data.iscg,
        docid: data.docid,

    }
}
 
export const editROLE = (data) => (
    {
        type: 'EDIT_ROLE',
        role: data.role
    }
)
export const editNAME = (data) => (
    {
        type: 'EDIT_NAME',
        role: data.name
    }
)
 
 
 
export const deleteUser=()=>(
    {
        type:'DELETE_USER',
    }
)
 