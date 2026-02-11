import { formatCurrency } from "../scripts/utils/money.js";

//Automated testing
 console.log("Test Suite for FormatCurrency:")
console.log("test for 0 cents")

if(formatCurrency(0)==='0.00'){
    console.log("Passed")
}
else{
    console.log("Failed")
}

console.log("test for rounding to nearest cent")
if(formatCurrency(2000.5)==='20.01'){
    console.log("Passed");
}
else{
    console.log("Failed")
}
console.log("test for cents to dollars")
if(formatCurrency(2095)==='20.95'){
    console.log("Passed");
}
else{
    console.log("Failed")
}