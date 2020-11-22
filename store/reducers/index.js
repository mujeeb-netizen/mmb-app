

const loginReducer = (state={
    title:null,
    fname :null,
    lname:null,
    email: null,
    password: null,
    address: null,
    town: null,
    phone:null,
    zip: null,
    customerId: null,
    masjid: null,
    issq: null,
    isans: null,
    islo: null,
    isjg: null,
    iscg: null,
    docid: null,
    uid:null
   
},action)=>{
    switch(action.type){
        case 'GET_USER':
            return state
        case 'EDIT_UID':
            return state={
                uid:action.uid
            }
        case 'EDIT_USER':
            return state={
                ...state,
                uid: action.uid,
                
                title: action.title,
                fname: action.fname,
                lname: action.lname,
                email: action.email,
                phone: action.phone,
                customerId: action.customerId,
                address: action.address,
                town: action.town,
                zip: action.zip,
                masjid: action.masjid,
                issq: action.issq,
                isans: action.isans,
                islo: action.islo,
                iscg: action.iscg,
                isjg: action.isjg,
                docid: action.docid,
              
            }
 
        case 'EDIT_ROLE': 
            return state={
                ...state,
                role:action.role
            }
        case 'EDIT_NAME': 
            return state={
                ...state,
                name:action.name
            }
 
 
        case 'DELETE_USER':
            return state={
                title: null,
                fname: null,
                lname: null,
                email: null,
                password: null,
                address: null,
                town: null,
                phone:null,
                customerId:null,
                zip: null,
                masjid: null,
                issq: null,
                isans: null,
                islo: null,
                isjg: null,
                iscg: null,
                docid: null,
                uid: null
            }
 
        default: return state
    }
}
export default loginReducer