const dragBox = document.getElementById("dragBox");

let isDragging = false;
let offsetX, offsetY;

dragBox.addEventListener("mousedown", (e) => {
    if (dragBox.isContentEditable)
        return;

    isDragging = true;
    offsetX = e.clientX - dragBox.offsetLeft;
    offsetY = e.clientY - dragBox.offsetTop;
    dragBox.classList.replace("cursor-grab", "cursor-grabbing");
});

dragBox.addEventListener("dblclick", () => {
    dragBox.contentEditable = "true";
    dragBox.focus();
});

dragBox.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    console.log("Right-clicked!");
});

dragBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        dragBox.contentEditable = "false";
    }
});

dragBox.addEventListener("blur", () => {
    dragBox.contentEditable = "false";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    dragBox.style.left = `${e.clientX - offsetX}px`;
    dragBox.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    dragBox.classList.replace("cursor-grabbing", "cursor-grab");
});