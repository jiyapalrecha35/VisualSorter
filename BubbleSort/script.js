var container = document.getElementById("container");
var arr = [];
var swaps = 0;
function generateArray() {
    for (var i = 0; i < 25; i++) {
        let value = Number(Math.ceil(Math.random() * 100));
        arr.push(value);
    }
    for (var i = 0; i < 25; i++) {
        let value = arr[i];
        var arrElement = document.createElement("div");

        // Adding class to the div created
        arrElement.classList.add("block");

        // Adding style to div
        arrElement.style.height = `${value * 3.4}px`;
        arrElement.style.transform = `translate(${i * 30}px)`;

        // Creating label element for displaying size of particular block
        var array_ele_label = document.createElement("label");

        //adding class to the created label
        array_ele_label.classList.add("block_id");

        array_ele_label.innerText = value;

        // Appending created elements to index.html
        arrElement.appendChild(array_ele_label);
        container.appendChild(arrElement);
    }
}


async function BubbleSort() {
    var blocks = document.querySelectorAll('.block');
    var swapsDisplay = document.createElement("div");
    swapsDisplay.classList.add("swaps");
    container.appendChild(swapsDisplay);

    for (var i = 0; i < arr.length - 1; i++) {
        var swapped = false;

        for (var j = 0; j < arr.length - i - 1; j++) {

            blocks[j].style.backgroundColor = "#ff40ac";
            blocks[j + 1].style.backgroundColor = "#ff40ac";

            await new Promise((resolve) => setTimeout(resolve, 500));

            if (arr[j] > arr[j + 1]) {

                //swapping in array
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swaps++;

                // Update the heights of bars
                blocks[j].style.height = `${arr[j] * 3.4}px`;
                blocks[j + 1].style.height = `${arr[j + 1] * 3.4}px`;

                // Swap the labels on the bars
                var label1 = blocks[j].querySelector(".block_id");
                var label2 = blocks[j + 1].querySelector(".block_id");
                var temp = label1.innerText;
                label1.innerText = label2.innerText;
                label2.innerText = temp;

                // Update the transform property to reflect the new positions
                blocks[j].style.transform = `translate(${j * 30}px)`;
                blocks[j + 1].style.transform = `translate(${(j + 1) * 30}px)`;

                swapped = true;
            }

            blocks[j].style.backgroundColor = "#7c52fa";
            blocks[j + 1].style.backgroundColor = "#7c52fa";
        }

        blocks[25 - i - 1].style.backgroundColor = "#13CE66";
        //changing the color of the highest bars we get after every iteration

        if (!swapped) {
            break;
        }

        swapsDisplay.innerText = `Iteration: ${i + 1} | Total number of swaps made: ${swaps}`;
    }

    // Change the color of blocks to green one by one after sorting
    for (var k = 0; k < arr.length; k++) {
        blocks[k].style.backgroundColor = "#13CE66";
    }

    var completeMessage = document.createElement("div");
    completeMessage.classList.add("info");
    completeMessage.innerText = "Sorting complete !";
    container.appendChild(completeMessage);
}

generateArray();

setTimeout(() => {
    BubbleSort();
}, 2000); 
