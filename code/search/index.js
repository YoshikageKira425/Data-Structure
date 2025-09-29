const container = document.getElementById("container");

const slider = document.getElementById("sliderAmount");
const sliderValue = document.getElementById("sliderAmountValue");

const sliderTime = document.getElementById("sliderTime");
const sliderTimeValue = document.getElementById("sliderTimeValue");

let data = Array.from({ length: 5 }, (_, i) => i + 1);
setData();

slider.addEventListener("input", () => {
    const value = parseInt(slider.value);
    sliderValue.textContent = `Value: ${value}`;

    data = Array.from({ length: value }, (_, i) => i + 1);

    setData();
});

sliderTime.addEventListener("input", () => {
    const value = parseFloat(sliderTime.value);
    sliderTimeValue.textContent = `Time: ${value / 100}s`;
});

function setData()
{
    container.innerHTML = "";

    data.forEach(item => {
        let element = document.createElement("div");
        element.className = "w-14 h-14 flex-shrink-0 bg-gray-800 border border-purple-600 rounded-lg text-center flex items-center justify-center text-3xl font-bold text-purple-400 shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-700";
        element.textContent = item;

        container.appendChild(element);
    });
}