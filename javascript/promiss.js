

const a = 3;
const b = 5;

const promis1 = new Promise((res,rej)=>{
     const c = a + b;
     setTimeout(() => {
        c > 1 ? res("promis1 success") : rej('promis1 failed');
     }, 1000);
   
})

const promis2 = new Promise((res,rej)=>{
    const c = a - b;
    setTimeout(() => {
       c > 1 ? res("promis2 success") : rej('promis2 failed');
    }, 1000);
})

const promis3 = new Promise((res,rej)=>{
    const c = a / b;
    setTimeout(() => {
       c > 1 ? res("promis3 success") : rej('promis3 failed');
    }, 1000);
})

Promise.all([promis3,promis2,promis1])
.then(respon =>{
    console.log(` All Promiss is successfull :: ${respon}`);
    
}).catch(err=>{
    console.log(err);  
})

Promise.allSettled([promis3,promis2,promis1])
.then(respon =>{
    console.log(` All Promiss is successfull :: ${JSON.stringify(respon)}`);
    
}).catch(err=>{
    console.log(err);  
})