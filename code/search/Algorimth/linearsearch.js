import { arrow, RenableElement } from "../index.js";

export async function linearSearch(data, number, time) {
    if (number > data.length)
        number = data[data.length - 1];

    for (let i = 0; i < data.length; i++) {
        const node = document.getElementById(data[i]);
        const rect = node.getBoundingClientRect();

        arrow.style.left = rect.left + window.scrollX + "px";
        arrow.style.top = rect.top + window.scrollY - 50 + "px";

        if (data[i] == number) {
            break;
        }

        node.classList.remove("bg-gray-800");
        node.classList.add("bg-red-600");
        await sleep(time);
    }

    const node = document.getElementById(number);

    const rect = node.getBoundingClientRect();

    arrow.style.left = rect.left + window.scrollX + "px";
    arrow.style.top = rect.top + window.scrollY - 50 + "px";
    node.classList.remove("bg-gray-800");
    node.classList.add("bg-green-600");

    for (let i = 0; i < data.length; i++) {
        const elementToFade = document.getElementById(data[i]);

        if (elementToFade.classList.contains("bg-green-600") || elementToFade.classList.contains("bg-red-600"))
            continue;

        elementToFade.classList.remove("bg-gray-800");
        elementToFade.classList.add("bg-gray-900");
    }

    setTimeout(() => {
        document.querySelectorAll(".node").forEach(node => {
            node.classList.add("bg-gray-800");
            node.classList.remove("bg-green-600", "bg-red-600", "bg-gray-900");
        });

        arrow.classList.remove("opacity-100", "translate-y-0");
        arrow.classList.add("opacity-0", "translate-y-2");

        RenableElement();
    }, 1500);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 10));
}