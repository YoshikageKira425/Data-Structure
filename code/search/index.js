import { linearSearch } from "./Algorimth/linearsearch.js";
import { binarySearch } from "./Algorimth/binarysearch.js";

const container = document.getElementById("container");

const slider = document.getElementById("sliderAmount");
const sliderValue = document.getElementById("sliderAmountValue");

const sliderTime = document.getElementById("sliderTime");
const sliderTimeValue = document.getElementById("sliderTimeValue");

const number = document.getElementById("number");
const numberText = document.getElementById("numberText");

export const arrow = document.getElementById("arrow");

const searchingAlgorithm = document.getElementById("searchingAlgorithm");

const randomBtn = document.getElementById("random");
const sortBtn = document.getElementById("sort");
const searchingBtn = document.getElementById("searching");

let data = Array.from({ length: 10 }, (_, i) => i + 1);
setData();

searchingBtn.addEventListener("click", () => {
    const rect = document.getElementById(data[0]).getBoundingClientRect();

    arrow.style.left = rect.left + window.scrollX + "px";
    arrow.style.top = rect.top + window.scrollY - 50 + "px";

    arrow.classList.remove("opacity-0", "translate-y-2");
    arrow.classList.add("opacity-100", "translate-y-0");

    document.querySelectorAll(".node").forEach(node => {
        node.classList.add("bg-gray-800");
        node.classList.remove("bg-green-600", "bg-red-600");
    });

    randomBtn.disabled = true;
    searchingAlgorithm.disabled = true;
    sortBtn.disabled = true;
    searchingBtn.disabled = true;
    sliderTime.disabled = true;
    slider.disabled = true;
    number.disabled = true;

    randomBtn.classList.remove("bg-purple-600", "hover:bg-purple-700", "active:bg-green-800");
    sortBtn.classList.remove("bg-purple-600", "hover:bg-purple-700", "active:bg-green-800");
    searchingBtn.classList.remove("bg-green-500", "hover:bg-green-600", "active:bg-green-700");
    searchingAlgorithm.classList.remove("bg-purple-600", "hover:bg-purple-700", "active:bg-green-800");

    randomBtn.classList.add("bg-gray-500", "cursor-not-allowed");
    sortBtn.classList.add("bg-gray-500", "cursor-not-allowed");
    searchingBtn.classList.add("bg-gray-500", "cursor-not-allowed");
    searchingAlgorithm.classList.add("bg-gray-500", "cursor-not-allowed");
    number.classList.add("bg-gray-500", "cursor-not-allowed");

    if (searchingAlgorithm.value == "Linear Search")
        linearSearch(data, number.value, sliderTime.value);
    else if (searchingAlgorithm.value == "Binary Search")
        binarySearch(data, number.value, sliderTime.value);
});

randomBtn.addEventListener("click", () => randomizer());

sortBtn.addEventListener("click", () => sort());

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

searchingAlgorithm.addEventListener("change", () => {
    if (searchingAlgorithm.value !== "") {
        searchingBtn.classList.remove("hidden");
        setTimeout(() => searchingBtn.classList.add("opacity-100"));
    } else {
        searchingBtn.classList.remove("opacity-100");
        setTimeout(() => searchingBtn.classList.add("hidden"), 300);
    }
});

function setData() {
    container.innerHTML = "";

    data.forEach(item => {
        let element = document.createElement("div");
        element.className = "node w-14 h-14 flex-shrink-0 bg-gray-800 border border-purple-600 rounded-lg text-center flex items-center justify-center text-3xl font-bold text-purple-400 shadow-xl transition-all duration-300";
        element.textContent = item;
        element.id = item;

        container.appendChild(element);
    });
}

function sort() {
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

export function RenableElement() {
    randomBtn.disabled = false;
    searchingAlgorithm.disabled = false;
    sortBtn.disabled = false;
    searchingBtn.disabled = false;
    sliderTime.disabled = false;
    slider.disabled = false;
    number.disabled = false;

    randomBtn.classList.add("bg-purple-600", "hover:bg-purple-700", "active:bg-green-800");
    sortBtn.classList.add("bg-purple-600", "hover:bg-purple-700", "active:bg-green-800");
    searchingBtn.classList.add("bg-green-500", "hover:bg-green-600", "active:bg-green-700");
    searchingAlgorithm.classList.add("bg-purple-600", "hover:bg-purple-700", "active:bg-green-800");

    randomBtn.classList.remove("bg-gray-500", "cursor-not-allowed");
    sortBtn.classList.remove("bg-gray-500", "cursor-not-allowed");
    searchingBtn.classList.remove("bg-gray-500", "cursor-not-allowed");
    searchingAlgorithm.classList.remove("bg-gray-500", "cursor-not-allowed");
    number.classList.remove("bg-gray-500", "cursor-not-allowed");
}