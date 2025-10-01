import { arrow } from "../index.js";

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

    setTimeout(() => {
        document.querySelectorAll(".node").forEach(node => {
            node.classList.add("bg-gray-800");
            node.classList.remove("bg-green-600", "bg-red-600");
        });

        arrow.classList.remove("opacity-100", "translate-y-0");
        arrow.classList.add("opacity-0", "translate-y-2");
    }, 1500);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 10));
}