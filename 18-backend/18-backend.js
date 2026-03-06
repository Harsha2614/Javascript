/*
//callback
const xhr=new XMLHttpRequest();

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
})

xhr.open('GET','https://supersimplebackend.dev/greeting');
xhr.send();

//promise
const promise=fetch('https://supersimplebackend.dev/greeting');
promise.then((response)=>{
    return response.text();

}).then((text)=>{
    console.log(text)
})

//Async await

async function getGreeting(){
    const response=await fetch('https://supersimplebackend.dev/greeting');
    const text = await response.text();
    console.log(text);
}

getGreeting();

async function sendName(){
    const response=await fetch('https://supersimplebackend.dev/greeting',{
        method : 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name:"Harsha"
        })
    
       }
    );

    const order=await response.text();
    console.log(order);
}

sendName();

const prom=fetch('https://supersimplebackend.dev/greeting');
prom.then((response)=>{
    return response.text();
}).then((response)=>{
    console.log(response)
})

async function getGreet(){
    const promise=await fetch('https://supersimplebackend.dev/greeting',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name :"Harsha"
        })
    })
    const ans=await promise.text();
    console.log(ans);
}
getGreet();
*/

/*
//shows error because of cors

const amazon=fetch("https://amazon.com");
amazon.catch((error)=>{
    console.log("Unable to fetch data")

})

async function amaze(){
    try{

        const promise=await fetch('https://amazon.com');
    }
    catch{
        console.log("error at the backend")
    }

}

amaze()
*/

async function practice(){

   try{ 
    const response=await fetch('https://supersimplebackend.dev/greeting',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        }
    });

        if(response.status>=400){
            throw response;
        }

        const text = await response.text();
        console.log(text);
    }
    catch(error){
        if(error.status===404){
            const errorMessage = await error.json();
            console.log(errorMessage);
        }
        else {
            console.log('Network error. Please try again later.');
          }

    }



}

practice()