var container = document.getElementById("container");
var arr = [];

function generateArray() {

    for (var i = 0; i < 25; i++) {
        let value = Math.ceil(Math.random() * 100);
        arr.push(value);
    }

    for (var i = 0; i < 25; i++) {
        let value = arr[i];

        var arrElement = document.createElement("div");
        arrElement.classList.add("block");
        arrElement.style.height = `${value * 3}px`;
        arrElement.style.transform = `translateX(${i * 30}px)`;

        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        arrElement.appendChild(array_ele_label);
        container.appendChild(arrElement);
    }
}

async function heapify(arr, blocks, n, i) {
    var largest = i;
    var left = 2 * i + 1;
    var right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        blocks[left].classList.add("comparing");
        document.getElementById("explanation").innerText = `Comparing ${arr[i]} with left child ${arr[left]}`;
        await new Promise(resolve => setTimeout(resolve, 800));
        blocks[left].classList.remove("comparing");
        largest = left;
        document.getElementById("comparisons").textContent = parseInt(document.getElementById("comparisons").textContent) + 1;
    }


    if (right < n && arr[right] > arr[largest]) {
        blocks[right].classList.add("comparing");
        document.getElementById("explanation").innerText = `Comparing ${arr[i]} with right child ${arr[right]}`;
        await new Promise(resolve => setTimeout(resolve, 800));
        blocks[right].classList.remove("comparing");
        largest = right;
        document.getElementById("comparisons").textContent = parseInt(document.getElementById("comparisons").textContent) + 1;
    }

    if (largest !== i) {
        await swap(arr, blocks, i, largest);
        document.getElementById("explanation").innerText = `Swapping ${arr[i]} with ${arr[largest]}`;
        await heapify(arr, blocks, n, largest);
    }
}

async function swap(arr, blocks, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    blocks[i].classList.add("swapping");
    blocks[j].classList.add("swapping");

    blocks[i].style.height = `${arr[i] * 3}px`;
    blocks[j].style.height = `${arr[j] * 3}px`;

    var label1 = blocks[i].querySelector(".block_id");
    var label2 = blocks[j].querySelector(".block_id");
    var tempLabel = label1.innerText;
    label1.innerText = label2.innerText;
    label2.innerText = tempLabel;


    blocks[i].style.transform = `translateX(${i * 30}px)`;
    blocks[j].style.transform = `translateX(${j * 30}px)`;
    document.getElementById("explanation").innerText = `Swapping ${arr[i]} with ${arr[j]}`;


    await new Promise(resolve => setTimeout(resolve, 800));

    blocks[i].classList.remove("swapping");
    blocks[j].classList.remove("swapping");
    document.getElementById("swaps").textContent = parseInt(document.getElementById("swaps").textContent) + 1;
}

async function heapSort() {
    var blocks = document.querySelectorAll('.block');
    var n = arr.length;

    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, blocks, n, i);
    }

    for (var i = n - 1; i > 0; i--) {
        await swap(arr, blocks, 0, i);
        document.getElementById("explanation").innerText = `Heapify the root at index 0 with size ${i}`;
        await heapify(arr, blocks, i, 0);
    }

    document.getElementById("explanation").innerText = "Sorting complete!";
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#55bd2b";
    }
}


generateArray();

setTimeout(() => {
    heapSort();
}, 2000); 
