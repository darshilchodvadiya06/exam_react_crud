import axios from "axios"

export const getData = () => {
    return axios.get(" http://localhost:3030/posts").then((res)=>{
        // console.log(res.data);
        return res.data;
    });
}