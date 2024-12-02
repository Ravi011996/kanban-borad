function addTwoNum(callback, a, b) {
    setTimeout(() => {
      const result = callback(a, b); 
      console.log(result);
    }, 1000);
  }
  
 
  function callback(a, b) {
    return a + b;
  }
 
  addTwoNum(callback, 5, 3);


// Convert for promisess

  
const promisaddTwoNum = (a,b) =>{
   return new Promise((res,rej)=>{
        const c = a + b;
        setTimeout(() => {
            res(c)
        }, 1000);
    })
}


promisaddTwoNum(5,3).then(responce=>{
    console.log(responce);
}).catch(err =>{
    console.log(err);
    
})