var container = document.getElementById("container");
var arr = [];
var swaps = 0;
function generateArray() {
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

        // Creating label element for displaying number on bar
        var array_ele_label = document.createElement("label");

        //adding class to the created label
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        // Appending created elements to index.html
        arrElement.appendChild(array_ele_label);
        container.appendChild(arrElement);
    }
}

async function InsertionSort() {
    var blocks = document.querySelectorAll('.block');
    for (let i = 1; i < arr.length; i++) {
        let temp = arr[i];
        let j = i - 1;

        blocks[i].style.backgroundColor = "#FF6B6B";  //highlight the current element

        var infoDisplay = document.createElement("div");
        infoDisplay.classList.add("info");
        infoDisplay.innerText = `Inserting  ${temp}`;
        container.appendChild(infoDisplay);

        while (j >= 0 && arr[j] > temp) {
            // Highlight the compared elements
            blocks[j].style.backgroundColor = "#FFD700"; 
            blocks[j + 1].style.backgroundColor = "#FFD700"; 

            var tempHeight = blocks[j].style.height;
            blocks[j].style.height = blocks[j + 1].style.height;
            blocks[j + 1].style.height = tempHeight;

            arr[j + 1] = arr[j];

            var label1 = blocks[j].querySelector(".block_id");
            var label2 = blocks[j + 1].querySelector(".block_id");
            var tempLabel = label1.innerText;
            label1.innerText = label2.innerText;
            label2.innerText = tempLabel;

            await new Promise(resolve => setTimeout(resolve, 500));

            blocks[j + 1].style.transform = `translate(${(j + 1) * 30}px)`;
            blocks[j].style.transform = `translate(${j * 30}px)`;

            await new Promise(resolve => setTimeout(resolve, 500));

            blocks[j].style.backgroundColor = "#7c52fa";
            blocks[j + 1].style.backgroundColor = "#7c52fa";

            j--;
        }

        arr[j + 1] = temp;

        blocks[j + 1].style.height = `${temp * 3.4}px`;
        var sortedLabel = blocks[j + 1].querySelector(".block_id");
        sortedLabel.innerText = temp;
        
        container.removeChild(infoDisplay);

        await new Promise(resolve => setTimeout(resolve, 600));
    }

    for (var k = 0; k < arr.length; k++) {
        blocks[k].style.backgroundColor = "#13CE66"; // Green color
    }
}

generateArray();
setTimeout(() => {
    InsertionSort();
}, 2000);