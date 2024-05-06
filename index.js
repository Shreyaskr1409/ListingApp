import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js"

const appSettings = {
    databaseURL: "https://reatime-database-5c209-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputField1 = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")










addButton.addEventListener("click", function() {
    let inputValue = inputField1.value

    addToDB(inputValue)
    clearInputField()


    console.log(inputValue)
})









function addToList( addition ) {
    if(addition!="")
        {
            // shoppingListEl.innerHTML += `<li>${addition}</li>`

            let itemID = addition[0]
            let itemValue = addition[1]

            let newEl = document.createElement("li")
            newEl.textContent = itemValue
            shoppingListEl.append(newEl)
        }
}

function addToDB( addition ) {
    if(addition!="")
        {
            push(shoppingListInDB, addition)
        }
}

function clearInputField() {
    inputField1.value = ""
}

onValue(shoppingListInDB, function(snapshot) {
    let itemArray = Object.entries(snapshot.val())
    
    shoppingListEl.innerHTML = ""

    for(let i=0; i<itemArray.length; i++) {
        let currentItem = itemArray[i]
        // let currentItemID = currentItem[0]
        // let currentItemValue = currentItem[1]

        addToList(currentItem)
        // console.log(itemArray[i])
    }
})