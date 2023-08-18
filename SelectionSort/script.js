var container = document.getElementById("container");
var arr = [];
var swaps = 0;

function generateArray() {
    // Filling array with random values
    for (var i = 0; i < 25; i++) {

        //generate a random value from 1 to 100 
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


async function SelectionSort() {

    var swapsDisplay = document.createElement("div");
    swapsDisplay.classList.add("swaps");
    container.appendChild(swapsDisplay);


    var blocks = document.querySelectorAll('.block');
    for (let i = 0; i < arr.length - 1; i++) {
        let min_index = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_index]) { 
                min_index = j;
            }
        }
        swaps++;

        
        var temp = arr[i];
        arr[i] = arr[min_index];
        arr[min_index] = temp;

        // Update the heights of bars
        blocks[i].style.height = `${arr[i] * 3.4}px`;
        blocks[min_index].style.height = `${arr[min_index] * 3.4}px`;

        // Swap the labels on the bars
        var label1 = blocks[i].querySelector(".block_id");
        var label2 = blocks[min_index].querySelector(".block_id");
        var tempLabel = label1.innerText;
        label1.innerText = label2.innerText;
        label2.innerText = tempLabel;

        // Update the transform property to reflect the new positions
        blocks[i].style.transform = `translate(${i * 30}px)`;
        blocks[min_index].style.transform = `translate(${min_index * 30}px)`;

        // Reset block colors before the next iteration
        blocks[i].style.backgroundColor = "#13CE66";
        blocks[min_index].style.backgroundColor = "#13CE66";

        swapsDisplay.innerText = `Iteration: ${i + 1} | Total number of swaps made: ${swaps}`;
        // Add a delay for visualization
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

generateArray();

setTimeout(() => {
    SelectionSort();
}, 2000); 
