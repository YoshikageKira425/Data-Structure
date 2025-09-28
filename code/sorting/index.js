import { sort } from "./sort/boubleSort.js";
import { quickSort } from "./sort/quickSort.js";

const container = document.getElementById("container");
export const slider = document.getElementById("sliderAmount");
const sliderValue = document.getElementById("sliderAmountValue");

export const sliderTime = document.getElementById("sliderTime");
const sliderTimeValue = document.getElementById("sliderTimeValue");

export const sortButton = document.getElementById("sort");
export const randomizerButton = document.getElementById("randomizer");

let data = Array.from({ length: 20 }, (_, i) => i + 1);

randomizer();
setData();

slider.addEventListener("input", () => {
    const value = parseInt(slider.value);
    sliderValue.textContent = `Value: ${value}`;

    data = Array.from({ length: value }, (_, i) => i + 1);
    randomizer();

    setData();
});

sliderTime.addEventListener("input", () => {
    const value = parseFloat(sliderTime.value);
    sliderTimeValue.textContent = `Time: ${value / 100}s`;
});

sortButton.addEventListener("click", () => {
    sortButton.disabled = true;
    randomizerButton.disabled = true;
    slider.disabled = true;
    sliderTime.disabled = true;

    sortButton.classList.remove("bg-purple-700", "hover:bg-purple-900");
    randomizerButton.classList.remove("bg-purple-700", "hover:bg-purple-900");

    sortButton.classList.add("bg-gray-500", "cursor-not-allowed");
    randomizerButton.classList.add("bg-gray-500", "cursor-not-allowed");

    quickSort(data, 0, data.length - 1, parseFloat(sliderTime.value));
});

randomizerButton.addEventListener("click", () => { randomizer(); setData(); });

export function setData() {
    container.innerHTML = "";

    data.forEach(number => {
        const bar = document.createElement("div");
        bar.className = "bg-purple-700 rounded-xl w-full transition-all duration-300";
        bar.style.height = `${(number / data.length) * 100}%`;
        container.appendChild(bar);
    });
}

function randomizer() {
    for (let i = data.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [data[i], data[randomIndex]] = [data[randomIndex], data[i]];
    }
}