let arr=[];
let arr2=[];

function AddElement(){
    const inputElement=document.querySelector('.js-input');
    let inputValue=inputElement.value;
    console.log(inputValue);
    
    arr.push(inputValue);
    console.log(arr);
    inputElement.value='';

}

function AddElement2(){
    const inputElement2=document.querySelector('.js-input2');
    let inputValue2=inputElement2.value;
    console.log(inputValue2);
    
    arr2.push(inputValue2);
    console.log(arr2);
    inputElement2.value='';

    let htmlonpage=''
    for(let i=0;i<arr2.length;i++){
    let val=arr2[i];
    let htmlp=`<p>${val}</p>`
    htmlonpage+=htmlp;
}
document.querySelector('.js-text').innerHTML=`${htmlonpage}`;

}

let finalArray=['Watering','Eating'];
let dates=['2025-12-12','2025-12-19'];
rendering();

function finalAdd(){
    const finalElement=document.querySelector('.input-js');
    let finalvalue=finalElement.value;
    
    const dateElement=document.querySelector('.date-js');
    let datevalue=dateElement.value;

    finalArray.push(finalvalue);
    dates.push(datevalue);

    console.log(finalArray);
    console.log(dates);

    finalElement.value='';
    dateElement.value='';
 rendering();
   









}

function rendering(){
     finHTML='';
    
    for(let i=0;i<finalArray.length;i++){
        let fval=finalArray[i]
        let fdate=dates[i];
        let HTMLs=`
       
    <div>${fval}</div>
    <div> ${fdate}</div> 
  <button class="del-css" onclick="finalArray.splice(${i},1); rendering(); ">
        
        delete
        
        </button>
        
        `
        finHTML+=HTMLs;

        console.log(finHTML);

       
    }
document.querySelector('.container').innerHTML=finHTML;

}