import { setData, RenableElements } from './../index.js';

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

    RenableElements();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}