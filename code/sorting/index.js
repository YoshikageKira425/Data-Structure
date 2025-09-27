const container = document.getElementById("container");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("sliderValue");

let data = Array.from({ length: 20 }, (_, i) => i + 1);

setData();

slider.addEventListener("input", () => {
    const value = parseInt(slider.value);
    sliderValue.textContent = `Value: ${value}`;
    data = Array.from({ length: value }, (_, i) => i + 1);
    console.log(data);
    setData();
});

function setData() {
    container.innerHTML = "";

    data.forEach(number => {
        const bar = document.createElement("div");
        bar.className = "bg-purple-700 rounded-xl w-full transition-all duration-300";
        bar.style.height = `${(number / data.length) * 100}%`;
        container.appendChild(bar);
    });
}

