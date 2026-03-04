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