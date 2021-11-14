import { useState,useEffect } from "react";

const useFetch = (url) =>{
    
    const abortCont = new AbortController();

    const [data, setData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setTimeout(()=>{
         fetch(url, {signal: abortCont.signal})
         .then(res=>{
           if(!res.ok){
             throw Error("Couldn't fetch the data for that resource");
           }
           return res.json();
         })
         .then(dayta=>{
           setData(dayta);
           setIsPending(false);
           setError(null);
         })
         .catch(err=>{
             if(err.name === 'AbortError'){
                 console.log('fetch aborted');
             }
           setIsPending(false);
           setData(null);
           setError(err.message);
         })
      },1000);
      return ()=> abortCont.abort();
     },[url]);

     return {data,isPending,error};
}

export default useFetch;