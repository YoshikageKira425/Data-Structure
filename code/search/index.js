import { linearSearch } from "./Algorimth/linearsearch.js";

const container = document.getElementById("container");

const slider = document.getElementById("sliderAmount");
const sliderValue = document.getElementById("sliderAmountValue");

const sliderTime = document.getElementById("sliderTime");
const sliderTimeValue = document.getElementById("sliderTimeValue");

const number = document.getElementById("number");
const numberText = document.getElementById("numberText");

export const arrow = document.getElementById("arrow");

const searchingAlgorithm = document.getElementById("searchingAlgorithm");

const searchingBtn = document.getElementById("searching");

let data = Array.from({ length: 10 }, (_, i) => i + 1);
setData();

searchingBtn.addEventListener("click", () => {
    linearSearch(data, number.value, sliderTime.value);
});

slider.addEventListener("input", () => {
    const value = parseInt(slider.value);
    sliderValue.textContent = `Value: ${value}`;
    number.max = value;

    data = Array.from({ length: value }, (_, i) => i + 1);

    setData();
});

number.addEventListener("input", () => numberText.textContent = `Number: ${number.value}`);

sliderTime.addEventListener("input", () => {
    const value = parseFloat(sliderTime.value);
    sliderTimeValue.textContent = `Time: ${value / 100}s`;
});

function setData()
{
    container.innerHTML = "";

    data.forEach(item => {
        let element = document.createElement("div");
        element.className = "w-14 h-14 flex-shrink-0 bg-gray-800 border border-purple-600 rounded-lg text-center flex items-center justify-center text-3xl font-bold text-purple-400 shadow-xl transition-all duration-300";
        element.textContent = item;
        element.id = item;

        container.appendChild(element);
    });
}

function sort(){
    data = Array.from({ length: 10 }, (_, i) => i + 1);

    setData();
}

function randomizer() {
    for (let i = data.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [data[i], data[randomIndex]] = [data[randomIndex], data[i]];
    }

    setData();
}