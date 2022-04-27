// JavaScript file that adds all the functionality to my To-Do list 
// web application

function addToList() {
    // main JS function that creates a list node to be appended to the unordered list
    var listObject = document.createElement("li");
    listObject.classList.add("listItm");

    // flag for complete or incomplete item in list
    listObject.setAttribute("flag", "incomplete");

    // time stored for sorting in sort function
    var tempTime = new Date();
    listObject.value = tempTime.getTime();

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.classList.add("deleteBtn");
    var newInput = document.getElementById("newEntry").value;
    document.getElementById("newEntry").value = "";

    // error check for null entry
    if (newInput.length === 0) {
        return;
    }

    // appending created objects to the html unordered list
    listObject.innerHTML = newInput;
    listObject.append(deleteButton);
    document.getElementById("toDoList").prepend(listObject);

    // function to mark item as complete or incomplete
    listObject.onclick = function () {
        // removes child to be appended at the bottom and sets the flag to be 
        // complete as well as adds the appropriate CSS class
        if (listObject.getAttribute("flag") === "incomplete") {
            document.getElementById("toDoList").removeChild(listObject);
            document.getElementById("toDoList").appendChild(listObject);
            listObject.setAttribute("flag", "complete");
            listObject.classList.add("finished");
            deleteButton.classList.remove("deleteBtn");
            deleteButton.classList.add("finishedBtn");
        } else if (listObject.getAttribute("flag") === "complete") {
            listObject.classList.remove("finished");
            deleteButton.classList.remove("finishedBtn");
            deleteButton.classList.add("deleteBtn");
            listObject.setAttribute("flag", "incomplete");
        }
    };

    // function to remove item on To-Do list
    deleteButton.onclick = function (event) {
        document.getElementById("toDoList").removeChild(listObject);
        // prevents listObject.onclick function from executing due to it being
        // the parent of the delete button and having its own onclick event
        event.stopPropagation();
    };

    // function to filter the list entries by complete/incomplete or all
    addToList.filter = function (filterChoice) {
        var tempUl = document.getElementById("toDoList");
        var listItems = tempUl.getElementsByTagName("li");
        for (var i = 0; i < listItems.length; ++i) {
            switch (filterChoice) {
                case 'all':
                    listItems[i].style.display = "block";
                    break;
                case 'complete':
                    if (listItems[i].getAttribute("flag") === "incomplete") {
                        listItems[i].style.display = "none";
                    } else {
                        listItems[i].style.display = "block";
                    }
                    break;
                case 'incomplete':
                    if (listItems[i].getAttribute("flag") === "complete") {
                        listItems[i].style.display = "none";
                    } else {
                        listItems[i].style.display = "block";
                    }
                    break;
            }
        }
    };

    // function that sorts the function from earliest entry to last and if
    // user wishes to do the opposite, reverses the nodes so that it goes 
    // from last entry to first
    addToList.sort = function (sortChoice) {
        var tempUl = document.getElementById("toDoList");
        sortHelper();

        // if statement that reverses nodes if user wishes to sort latest to earliest
        if (sortChoice === "reverse") {
            for (var i = 1; i < tempUl.childNodes.length; i++) {
                tempUl.insertBefore(tempUl.childNodes[i], tempUl.firstChild);
            }
        }

        // private sort helper function that runs a loop
        function sortHelper() {
            var i, loopCheck;
            var listItems = tempUl.getElementsByTagName("li");
            loopCheck = true;
            // do while loop which loops through list items and continues to loop
            // until all nodes in the unordered list have been sorted by ascending order
            do {
                loopCheck = false;
                // for loop that checks if current node has a larger time value than
                // the node after it. If so, the node after the current one is placed
                // in front
                for (i = 0; i < (listItems.length - 1); i++) {
                    if (listItems[i].value > listItems[i + 1].value) {
                        listItems[i].parentNode.insertBefore(listItems[i + 1], listItems[i]);
                        loopCheck = true;
                        break;
                    }
                }
            } while (loopCheck);
        }
    };
}



