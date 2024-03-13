import { createContext } from "react"

const user={
    id:'',
    nom:'',
    prenom:'',
    adresse:'',
    type:''
}
const userData=createContext(user);

export default userData;