 let calculationValue=localStorage.getItem('calculation')||"";
         display();
         function Calculation(number){
            calculationValue+=number;
            console.log(calculationValue);
            display();
            
         }
         function equals(){
            calculationValue=eval(calculationValue);
            console.log(calculationValue);
            display();

            localStorage.setItem('calculation',calculationValue);
            
         }

         function display(){
            document.querySelector('.display').innerHTML=calculationValue;
        }
