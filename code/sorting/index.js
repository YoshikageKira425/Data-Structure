import { sort } from "./sort/boubleSort.js";
import { quickSort } from "./sort/quickSort.js";
import { mergeSort } from "./sort/mergeSort.js";

const container = document.getElementById("container");
const slider = document.getElementById("sliderAmount");
const sliderValue = document.getElementById("sliderAmountValue");

const sliderTime = document.getElementById("sliderTime");
const sliderTimeValue = document.getElementById("sliderTimeValue");

const sortingAlgorithmSelect = document.getElementById("sortingAlgorithm");

const sortButton = document.getElementById("sort");
const randomizerButton = document.getElementById("randomizer");

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
    if (sortingAlgorithmSelect.value == "") {
        alert("Chose a option.")
        return;
    }

    sortButton.disabled = true;
    randomizerButton.disabled = true;
    slider.disabled = true;
    sliderTime.disabled = true;
    sortingAlgorithmSelect.disabled = true;

    sortingAlgorithmSelect.classList.remove("bg-purple-700", "hover:bg-purple-900");
    sortButton.classList.remove("bg-purple-700", "hover:bg-purple-900");
    randomizerButton.classList.remove("bg-purple-700", "hover:bg-purple-900");

    sortButton.classList.add("bg-gray-500", "cursor-not-allowed");
    sortingAlgorithmSelect.classList.add("bg-gray-500", "cursor-not-allowed");
    randomizerButton.classList.add("bg-gray-500", "cursor-not-allowed");

    switch (sortingAlgorithmSelect.value) {
        case "Bouble Sort":
            sort(data, parseFloat(sliderTime.value));
            break;
        case "Quick Sort":
            quickSort(data, 0, data.length - 1, parseFloat(sliderTime.value))
            break;
        case "Merge Sort":
            mergeSort(data, parseFloat(sliderTime.value));
            break;
    }
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

export function RenableElements(){
    sortButton.disabled = false;
    randomizerButton.disabled = false;
    slider.disabled = false;
    sliderTime.disabled = false;
    sortingAlgorithmSelect.disabled = false;

    sortingAlgorithmSelect.classList.remove("bg-gray-500", "cursor-not-allowed");
    sortButton.classList.remove("bg-gray-500", "cursor-not-allowed");
    randomizerButton.classList.remove("bg-gray-500", "cursor-not-allowed");

    sortingAlgorithmSelect.classList.add("bg-purple-700", "hover:bg-purple-900");
    sortButton.classList.add("bg-purple-700", "hover:bg-purple-900");
    randomizerButton.classList.add("bg-purple-700", "hover:bg-purple-900");
}