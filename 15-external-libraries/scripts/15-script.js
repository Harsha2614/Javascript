import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import isWeekend from './isweekend.js' ;
//15a
const today=dayjs();
const nextfiveday=today.add(5,'days');
const display=nextfiveday.format('MMMM D');
// document.querySelector('.js-date').innerHTML=display;
console.log(display);

//15b
const nextMonth=today.add(1,'months');
const displaymonth=nextMonth.format('MMMM D');
console.log(displaymonth);

//15c
const lastMonth=today.subtract(1,'months');
const displaylastmonth=lastMonth.format('MMMM D');
console.log(displaylastmonth);

//15d
const displayDay=nextfiveday.format('dddd,MMMM D');
console.log(displayDay)

//15e

      let date = dayjs();
      console.log(date.format('dddd, MMMM D'));
      console.log(isWeekend(date));

      date = dayjs().add(2, 'day');
      console.log(date.format('dddd, MMMM D'));
      console.log(isWeekend(date));

      date = dayjs().add(4, 'day');
      console.log(date.format('dddd, MMMM D'));
      console.log(isWeekend(date));

      date = dayjs().add(6, 'day');
      console.log(date.format('dddd, MMMM D'));
      console.log(isWeekend(date));


