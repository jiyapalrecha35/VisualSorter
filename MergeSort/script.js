var container = document.getElementById("container");
var arr = [];

function generateArray() {
    for (let i = 0; i < 25; i++) {
        let value = Number(Math.ceil(Math.random() * 100));
        arr.push(value);
    }

    for (let i = 0; i < 25; i++) {
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

async function MergeSort() {
    var blocks = document.querySelectorAll('.block');
    await mergeSort(arr, blocks, 0, arr.length - 1);
}

async function mergeSort(arr, blocks, left, right) {
    if (left < right) {
        var mid = Math.floor((left + right) / 2);

        for (let i = left; i <= right; i++) {
            blocks[i].style.backgroundColor = "#ff40ac"; // Pink color for division
            await new Promise((resolve) => setTimeout(resolve, 50));
        }

        await mergeSort(arr, blocks, left, mid);
        await mergeSort(arr, blocks, mid + 1, right);

        await merge(arr, blocks, left, mid, right);

        for (let i = left; i <= right; i++) {
            blocks[i].style.backgroundColor = "#7c52fa";
        }
    }
}

async function merge(arr, blocks, left, mid, right) {
    var p = mid - left + 1;
    var q = right - mid;

    var L = new Array(p);
    var R = new Array(q);

    for (let i = 0; i < p; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < q; j++) {
        R[j] = arr[mid + 1 + j];
    }

    var i = 0;
    var j = 0;
    var k = left;

    while (i < p && j < q) {
        blocks[k].style.backgroundColor = "#ff40ac";
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            blocks[k].style.height = `${arr[k] * 3.4}px`;

            var label2 = blocks[k].querySelector(".block_id");
            label2.innerText = L[i];

            await new Promise((resolve) => setTimeout(resolve, 300));
            i++;
        } else {
            arr[k] = R[j];
            blocks[k].style.height = `${arr[k] * 3.4}px`;

            var label2 = blocks[k].querySelector(".block_id");
            label2.innerText = R[j];

            await new Promise((resolve) => setTimeout(resolve, 300));
            j++;
        }
        k++;
    }

    while (i < p) {
        arr[k] = L[i];
        blocks[k].style.height = `${arr[k] * 3.4}px`;

        var label2 = blocks[k].querySelector(".block_id");
        label2.innerText = L[i];

        await new Promise((resolve) => setTimeout(resolve, 300));
        i++;
        k++;
    }

    while (j < q) {
        arr[k] = R[j];
        blocks[k].style.height = `${arr[k] * 3.4}px`;

        var label2 = blocks[k].querySelector(".block_id");
        label2.innerText = R[j];

        await new Promise((resolve) => setTimeout(resolve, 300));
        j++;
        k++;
    }


}
generateArray();

setTimeout(() => {
    MergeSort();
}, 2000); 
