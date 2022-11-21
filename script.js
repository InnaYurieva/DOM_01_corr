import colors from "./colors.js";
import openModal from "./modal.js";

const container = document.querySelector(".container"); //Выбираем контейнер
//const SQUARES = 35; //количество квадратиков
for (let index = 0; index < colors.length; index++) {
  const square = document.createElement("div");
  square.classList.add("square"); // Добавляем стили квадратикам
  square.setAttribute("style", `background-color: ${colors[index]};`);
  square.addEventListener("click", getAddDivColor); //сорректировала (Миша)
  container.append(square);
  square.style.cursor = 'pointer'
}

const icon = document.querySelector(".icon"); //Выбираем иконку
icon.addEventListener("click", openModal);
const overlay = document.querySelector(".overlay");

overlay.onclick = function (event) {
  //в прошлый раз было реализовано, тольео если нажимала на overlay - переделала
  let a = event.target.className;
  //console.log(a.length);
  if (event.target.className === "overlay") {
    container.classList.remove("is-open");
    //icon.style.fill = "#f6bf54";
  } else if (a.length === 0) {
    container.classList.remove("is-open");
  }
};

const input = document.createElement("input");
input.classList.add("input");
input.placeholder = "#000000";
input.type = 'text'
container.append(input);
const divColor = document.createElement("div");
divColor.classList.add("div-color");
divColor.style.cursor = 'pointer'
input.before(divColor);

const checkMarkIcon = document.querySelector("#svg"); //Галочка
input.after(checkMarkIcon);



const inputChange = function (event) { //если ввели hex, галочка зелёная, иначе инпут красный - не работает, инпут всегда красный
  //console.log(event.target.value);
  //console.log(event.target.value === '#888888');
  for (let index = 0; index < colors.length; index++) {
    const element = colors[index];

    if (colors.includes(event.target.value)) {
      checkMarkIcon.style.stroke = "green"
      input.style.borderColor = 'black';
      input.style.borderRadius = '5px';
      
      //divColor.style.background = element;
    } 
    else {
      input.style.borderColor = 'red';
      input.style.borderRadius = '5px';
  //   }
   }
}
};

input.addEventListener("input", inputChange); 


const svgGetColor = function () { //
  for (let index = 0; index < colors.length; index++) {
    const element = colors[index];
    if (checkMarkIcon.style.stroke === "green") {
      divColor.style.background = element
    
      //container.classList.remove("is-open");
    }
  }
};
checkMarkIcon.addEventListener("click", svgGetColor); //если значение в инпуте соответствует формату hex, галочка подсвечивается зеленым и при клике на галочку  цвет иконки меняется на цвет, который ввели и поповер закрывается
const svgGetClose = function () {
  if (checkMarkIcon.style.stroke === "green") {
    container.classList.remove("is-open");
  }
}
checkMarkIcon.addEventListener('click', svgGetClose)



const rgbToHex = (string) => {
  //console.log(string);
  const rgb = string.split("(")[1].split(")")[0].split(",");
  const hex = rgb.map(function (x) {
    x = parseInt(x).toString(16);
    return x.length === 1 ? "0" + x : x;
  });
  return "#" + hex.join("");
};

function getAddDivColor(event) {
  //вернула function Declaration, т.к. вызов функции перенесла на строку 10. Подскажи, полуйста, если можно этого избежать в данном коде
  let rgbTarget = event.target.style.backgroundColor;
  let rgbHex = rgbToHex(rgbTarget);
  icon.style.fill = rgbHex;
  if (rgbToHex(icon.style.fill) === rgbHex) {
    container.classList.remove("is-open");
  }
}


const svgColorGet = function (event) { //когда поповер открыт, иконка подсвечивается оранжевым,  outline: 1px solid #f6bf54; при наведении на цвет, он немного увеличивается
  //console.log(icon.style.fill === 'rgb(246, 191, 84)');
  if (icon.style.fill === "rgb(246, 191, 84)") {
    icon.classList.add("svg-colorGet");
    icon.removeAttribute("data-title");
  } else {
    icon.classList.remove("svg-colorGet");
  }
};
icon.addEventListener("mouseout", svgColorGet);



