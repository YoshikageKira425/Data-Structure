import { arrow } from "../index.js";

export async function linearSearch(data, number, time){
    arrow.classList.remove("hidden");

    if (number > data.length)
        number = data[data.length - 1];

    for (let i = 0; i < data.length; i++) {
        const rect = document.getElementById(data[i]).getBoundingClientRect();

        arrow.style.left = rect.left + window.scrollX + "px";
        arrow.style.top = rect.top + window.scrollY - 50 + "px";
        
        if (data[i] == number){
            break;
        }

        console.log(i);
        await sleep(time);
    }

    const node = document.getElementById(number);
    
    const rect = node.getBoundingClientRect();

    arrow.style.left = rect.left + window.scrollX + "px";
    arrow.style.top = rect.top + window.scrollY - 50 + "px";
    node.classList.remove("bg-gray-800");
    node.classList.add("bg-green-600");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 100));
}