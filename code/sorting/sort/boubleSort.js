import { setData, slider, sliderTime, sortButton, randomizerButton } from './../index.js';

export async function sort(data, time) {
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i] > data[i + 1]) {
                [data[i], data[i + 1]] = [data[i + 1], data[i]];
                swapped = true;

                setData(); 

                await sleep(time);
            }
        }
    } while (swapped);

    sortButton.disabled = false;
    randomizerButton.disabled = false;
    slider.disabled = false;
    sliderTime.disabled = false;

    sortButton.classList.remove("bg-gray-500", "cursor-not-allowed");
    randomizerButton.classList.remove("bg-gray-500", "cursor-not-allowed");

    sortButton.classList.add("bg-purple-700", "hover:bg-purple-900");
    randomizerButton.classList.add("bg-purple-700", "hover:bg-purple-900");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}