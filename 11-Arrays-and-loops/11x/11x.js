let finalArray=JSON.parse(localStorage.getItem('todo-event')) || ['Watering','Eating'];
let dates= JSON.parse(localStorage.getItem('todo-time')) ||['2025-12-12','2025-12-19'];
rendering();

function finalAdd(){
    const finalElement=document.querySelector('.input-js');
    let finalvalue=finalElement.value;
    
    const dateElement=document.querySelector('.date-js');
    let datevalue=dateElement.value;

     if (finalvalue === '' || datevalue === '') {
        alert('Please enter both todo name and date.');
        return;
    }

    finalArray.push(finalvalue);
    dates.push(datevalue);

    console.log(finalArray);
    console.log(dates);

    finalElement.value='';
    dateElement.value='';

 localStorage.setItem('todo-event',JSON.stringify(finalArray));
 localStorage.setItem('todo-time',JSON.stringify(dates));
  rendering();
}

function rendering(){
     let finHTML='';
    
    for(let i=0;i<finalArray.length;i++){
        let fval=finalArray[i]
        let fdate=dates[i];
        let HTMLs=`
       
    <div>${fval}</div>
    <div> ${fdate}</div> 
 <button class="del-css"
  onclick="
    finalArray.splice(${i}, 1);
    dates.splice(${i}, 1);
    localStorage.setItem('todo-event', JSON.stringify(finalArray));
    localStorage.setItem('todo-time', JSON.stringify(dates));
    rendering();
  ">
  delete
</button>

        
        `
        finHTML+=HTMLs;

        console.log(finHTML);

       
    }
document.querySelector('.container').innerHTML=finHTML;

}