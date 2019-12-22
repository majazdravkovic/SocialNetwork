let apiUrl = "https://api.myjson.com/bins/1dohg8";

fetch(apiUrl)
     .then(response => response.json())
     .then ( (data) => {

const app = document.getElementById("app");

// Kreiranje glavnog naslova
const mainHeading = document.createElement("h1");
mainHeading.className = "mainHeading";
mainHeading.innerHTML = "Social Network";
app.appendChild(mainHeading);

// Kreiranje Select elementa
const selectBox = document.createElement("select");
selectBox.className = "selectBox";
selectBox.addEventListener("change", showInfo);
const defaultOption = document.createElement("option");
defaultOption.selected = "selected";
defaultOption.disabled = "disabled";
defaultOption.innerHTML = "-- Choose a User --";
selectBox.appendChild(defaultOption);
app.appendChild(selectBox);

//Dinamičko dodavanje option elemenata u Select element
data.forEach( (user) => {
    const option = document.createElement("option");
    option.innerHTML = `${user.firstName} ${user.surname}`;
    selectBox.appendChild(option);
})

//Kreiranje boxa za prikazivanje informacija
const infoBox = document.createElement("div");
infoBox.className = "infoBox";
const personName = document.createElement("h3");
personName.className = "personName";
infoBox.appendChild(personName);

let directFriendsContainer = document.createElement("div");
directFriendsContainer.className = "directFriendsContainer";
const directFriendsHeading = document.createElement("h3");
directFriendsHeading.innerHTML = "Direct Friends:";
directFriendsContainer.appendChild(directFriendsHeading);
let directFriendsBox = document.createElement("ul");
directFriendsContainer.appendChild(directFriendsBox);

const friendsOfFriendsContainer = document.createElement("div");
friendsOfFriendsContainer.className = "friendsOfFriendsContainer";
const friendsOfFriendsHeading = document.createElement("h3");
friendsOfFriendsHeading.innerHTML = "Friends of Friends:";
friendsOfFriendsContainer.appendChild(friendsOfFriendsHeading);
const friendsOfFriendsBox = document.createElement("ul");
friendsOfFriendsContainer.appendChild(friendsOfFriendsBox);

const suggestedFriendsContainer = document.createElement("div");
suggestedFriendsContainer.className = "suggestedFriendsContainer";
const suggestedFriendsHeading = document.createElement("h3");
suggestedFriendsHeading.innerHTML = "Suggested Friends:";
suggestedFriendsContainer.appendChild(suggestedFriendsHeading);
const suggestedFriendsBox = document.createElement("ul");
suggestedFriendsContainer.appendChild(suggestedFriendsBox);

infoBox.appendChild(directFriendsContainer);
infoBox.appendChild(friendsOfFriendsContainer);
infoBox.appendChild(suggestedFriendsContainer);
app.appendChild(infoBox);



function showInfo() {

    directFriendsBox.textContent = "";
    friendsOfFriendsBox.textContent = "";
    suggestedFriendsBox.textContent = "";

    let person = data[this.options[this.selectedIndex].index - 1];

    let directFriends = [];
    let friendsOfFriends = [];

    // Prikazuje ime i prezime odabrane osobe u zaglavlju
    personName.innerHTML = `${person.firstName} ${person.surname}`;

    for (let i = 0;  i < data.length; i++) {

        for (let j = 0; j < person.friends.length; j++) {

            if (data[i].id == person.friends[j]) {
                directFriends.push(data[i].id);
                const directFriend = document.createElement("li");
                directFriend.innerHTML = data[i].firstName + " " + data[i].surname;
                directFriendsBox.appendChild(directFriend);
            }              
        }


        for (let k = 0; k < directFriends.length; k++) {

            if (data[i].id == directFriends[k]) {

                friendsOfFriends.push(data[i].friends);
            }
        }
    }

    // Pravi jedan veliki niz koji se sastoji od elemenata svih nizova - sadrži prijatelje svih prijatelja
    let friendsOfFriendsFilter1 = [].concat.apply([],friendsOfFriends);
     // Uklanja elemente koji postoje u nizu DirectFriends - uklanja direktne prijatelje iz liste prijatelji prijatelja
     let friendsOfFriendsFilter2 = friendsOfFriendsFilter1.filter(arr1Item => !directFriends.includes(arr1Item)); 
     // Uklanja elemente koji su jednaki person.id - uklanja samu osobu iz liste
     let friendsOfFriendsFilter3 = friendsOfFriendsFilter2.filter(arrItem => arrItem != person.id);
    // Uklanja duplikate iz niza - svaku osobu prikazuje jednom
    let finalFriends = friendsOfFriendsFilter3.filter(function(item, pos, self) { 
        return self.indexOf(item) == pos;
     });
    // Uzima duplikata iz glavnog Arraya - uzima samo osobe koje se pojavljuju dva ili više puta
    let suggestedFriendsArray = friendsOfFriendsFilter3.filter(function(item, index, self) {
        return self.indexOf(item) != index;
     });
     // Uklanjanja duplikata iz suggestedFriendsArray - svaku osobu prikazuje jednom
     let suggestedFriendsFinal = suggestedFriendsArray.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
     });


    for (let i = 0; i < data.length; i++) {

        for (let m = 0; m < finalFriends.length; m++) {

            if (data[i].id == finalFriends[m]) {
                const friendsOfFriend = document.createElement("li");
                friendsOfFriend.innerHTML = data[i].firstName + " " + data[i].surname;
                friendsOfFriendsBox.appendChild(friendsOfFriend);
            }
        }

        for (let n = 0; n < suggestedFriendsFinal.length; n++) {

            if (data[i].id == suggestedFriendsFinal[n]) {
                let suggestedFriendItem = document.createElement("li");
                suggestedFriendItem.innerHTML = data[i].firstName + " " + data[i].surname;
                suggestedFriendsBox.appendChild(suggestedFriendItem);
            }
        }
    }
}
       
});