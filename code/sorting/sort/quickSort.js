import { setData, slider, sliderTime, sortButton, randomizerButton, sortingAlgorithmSelect } from './../index.js';

export async function quickSort(data, start, end, time) {
    await sort(data, start, end, time);

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

async function sort(data, start, end, time) {
    if (end <= start)
        return;

    let pivot = await findPivot(data, start, end, time);
    await sort(data, start, pivot - 1, time);
    await sort(data, pivot + 1, end, time);
}

async function findPivot(data, start, end, time) {
    let pivot = data[end];

    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (data[j] < pivot) {
            i++;
            [data[i], data[j]] = [data[j], data[i]];

            setData();
            await sleep(time);
        }
    }

    i++;
    [data[i], data[end]] = [data[end], data[i]];

    setData();
    await sleep(time);

    return i;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}