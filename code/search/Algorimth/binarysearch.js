import { arrow, RenableElement } from "../index.js";

export async function binarySearch(data, number, time) {
    let start = 0;
    let end = data.length - 1;

    while (start <= end) {
        const middle = start + Math.floor((end - start) / 2);

        const node = document.getElementById(data[middle]);
        const rect = node.getBoundingClientRect();

        arrow.style.left = rect.left + window.scrollX + "px";
        arrow.style.top = rect.top + window.scrollY - 50 + "px";

        if (data[middle] == number) {
            node.classList.remove("bg-gray-800");
            node.classList.add("bg-green-600");

            for (let i = 0; i < data.length; i++) {
                const elementToFade = document.getElementById(data[i]);
                
                if (elementToFade.classList.contains("bg-green-600") || elementToFade.classList.contains("bg-red-600"))
                    continue;
                
                elementToFade.classList.remove("bg-gray-800");
                elementToFade.classList.add("bg-gray-900");
            }
            break;
        }

        node.classList.remove("bg-gray-800");
        node.classList.add("bg-red-600");

        if (data[middle] > number) {
            for (let i = middle; i <= end; i++) {
                const elementToFade = document.getElementById(data[i]);
                elementToFade.classList.remove("bg-gray-800");
                elementToFade.classList.add("bg-gray-900");
            }

            end = middle - 1;
        }
        else {
            for (let i = start; i < middle; i++) {
                const elementToFade = document.getElementById(data[i]); 
                elementToFade.classList.remove("bg-gray-800");
                elementToFade.classList.add("bg-gray-900");
            }

            start = middle + 1;
        }


        await sleep(time);
    }

    setTimeout(() => {
        document.querySelectorAll(".node").forEach(node => {
            node.classList.add("bg-gray-800");
            node.classList.remove("bg-green-600", "bg-red-600", "bg-gray-900");
        });

        arrow.classList.remove("opacity-100", "translate-y-0");
        arrow.classList.add("opacity-0", "translate-y-2");

        RenableElement();
    }, 2000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 10));
}