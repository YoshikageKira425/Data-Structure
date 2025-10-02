import { setData, RenableElements } from './../index.js';

function getDigit(num, place) {
    if (num < 0) return 0;
    return Math.floor(num / Math.pow(10, place)) % 10;
}

function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(num)) + 1;
}

function mostDigits(arr) {
    let maxDigits = 0;
    for (let i = 0; i < arr.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(arr[i]));
    }
    return maxDigits;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function radixSort(data, time) {
    const maxDigitCount = mostDigits(data);
    let arr = [...data];

    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < arr.length; i++) {
            let digit = getDigit(arr[i], k);
            digitBuckets[digit].push(arr[i]);

            setData(arr);
            await sleep(time);
        }

        arr = [].concat(...digitBuckets);

        for (let i = 0; i < data.length; i++) {
            data[i] = arr[i];
            
            setData(data);
            await sleep(time);
        }
    }

    setData(data);

    RenableElements();
}