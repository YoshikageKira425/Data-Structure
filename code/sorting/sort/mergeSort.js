import { setData, RenableElements} from '../index.js';

export async function mergeSort(data, time) {
    await sort(data, time);

    RenableElements();
}

async function sort(data, time) {
    if (data.length <= 1)
        return;

    const middle = Math.floor(data.length / 2);
    const leftArray = data.slice(0, middle);
    const rightArray = data.slice(middle);

    await sort(leftArray, time);
    await sort(rightArray, time);
    await merge(leftArray, rightArray, data, time)
}

async function merge(leftArray, rightArray, data, time) {
    let i = 0, l = 0, r = 0;

    while (l < leftArray.length && r < rightArray.length) {
        if (leftArray[l] < rightArray[r]) {
            data[i++] = leftArray[l++];
        } else {
            data[i++] = rightArray[r++];
        }

        setData();
        await sleep(time);
    }

    while (l < leftArray.length) {
        data[i++] = leftArray[l++];
        setData();
        await sleep(time);
    }

    while (r < rightArray.length) {
        data[i++] = rightArray[r++];
        setData();
        await sleep(time);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}