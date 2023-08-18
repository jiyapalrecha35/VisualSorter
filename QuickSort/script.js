var container = document.getElementById("container");
var arr = [];
var swaps = 0;

function generateArray() {
    // Filling array with random values
    for (var i = 0; i < 25; i++) {
        let value = Number(Math.ceil(Math.random() * 100));
        arr.push(value);
    }

    for (var i = 0; i < 25; i++) {
        let value = arr[i];

        var arrElement = document.createElement("div");
        arrElement.classList.add("block");
        arrElement.style.height = `${value * 3.4}px`;
        arrElement.style.transform = `translate(${i * 30}px)`;

        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        arrElement.appendChild(array_ele_label);
        container.appendChild(arrElement);
    }
}

async function QuickSort() {
    var blocks = document.querySelectorAll('.block');
    await quickSort(arr, blocks, 0, arr.length - 1);

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = '#55bd2b';
    }
}

async function quickSort(arr, blocks, left, right) {
    var loc;
    if (left < right) {
        loc = await partition(arr, blocks, left, right);
        await quickSort(arr, blocks, left, loc - 1);
        await quickSort(arr, blocks, loc + 1, right);
    }
}

async function swap(arr, blocks, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    blocks[i].classList.add("swapping");
    blocks[j].classList.add("swapping");

    blocks[i].style.height = `${arr[i] * 3.4}px`;
    blocks[j].style.height = `${arr[j] * 3.4}px`;

    var label1 = blocks[i].querySelector('.block_id');
    var label2 = blocks[j].querySelector('.block_id');
    var tempLabel = label1.innerText;
    label1.innerText = label2.innerText;
    label2.innerText = tempLabel;

    blocks[i].style.transform = `translateX(${i * 30}px)`;
    blocks[j].style.transform = `translateX(${j * 30}px)`;

    document.getElementById("explaination").innerText = `Swapping ${arr[i]} with ${arr[j]}`; 

    await new Promise(resolve => setTimeout(resolve, 400)); 

    blocks[i].classList.remove("swapping");
    blocks[j].classList.remove("swapping");

    await new Promise(resolve => setTimeout(resolve, 100));

    // Reset block colors after swap animation
    blocks[i].style.backgroundColor = '#55bd2b';
    blocks[j].style.backgroundColor = '#55bd2b';
}

async function partition(arr, blocks, left, right) {
    var pivotDiv = document.querySelector('.pivotDiv');
    var pivot = arr[right];

    // Reset block colors before highlighting pivot
    for (let k = left; k <= right; k++) {
        blocks[k].style.backgroundColor = '#55bd2b';
    }

    blocks[right].style.backgroundColor = 'yellow'; // Highlight the pivot

    pivotDiv.innerText = "Pivot element: " + pivot;

    var i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i = i + 1;
            await swap(arr, blocks, i, j);
        }
    }
    await swap(arr, blocks, i + 1, right);

    // Reset colors after partitioning
    for (let k = left; k <= right; k++) {
        if (k !== i + 1) {
            blocks[k].style.backgroundColor = '#55bd2b'; // Reset to sorted color
        }
    }

    // Reset pivot color
    blocks[right].style.backgroundColor = '#55bd2b';

    return i + 1;
}

generateArray();

setTimeout(() => {
    QuickSort();
}, 2000);
