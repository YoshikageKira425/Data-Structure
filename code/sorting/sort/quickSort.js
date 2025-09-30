import { setData, RenableElements } from './../index.js';

export async function quickSort(data, start, end, time) {
    await sort(data, start, end, time);

    RenableElements();
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
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}