var config = {
    apiKey: "AIzaSyB1U2BccSuU96ok87fJOk-cidH4aGggCWI",
    authDomain: "sportsmania-aa59d.firebaseapp.com",
    databaseURL: "https://sportsmania-aa59d.firebaseio.com",
    projectId: "sportsmania-aa59d",
    storageBucket: "sportsmania-aa59d.appspot.com",
    messagingSenderId: "807409288694"
  };
  firebase.initializeApp(config);
var firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});

const nameD = document.querySelector("#name");
const slipD = document.querySelector("#slip");
const amountD = document.querySelector("#amount");
const saveButton = document.querySelector("#save");
const date = firebase.firestore.FieldValue.serverTimestamp();
saveButton.addEventListener("click",function(e){
  e.preventDefault()
  const n = nameD.value;
  const s = slipD.value;
  const a = amountD.value;
  const d = date;
  const z = {
    name: n,
    slipNo: s,
    amount: a,
    time: d 
  }

  
  firestore.collection("throwball").doc().set(z)
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
});




const listdata = document.querySelector("datalist");

function renderlist(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let slipno = document.createElement('span');
  let amount = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = " Name: "+doc.data().name + "    Slip No:";
  slipno.textContent = doc.data().slipNo+ "    Amount: ";
  amount.textContent = doc.data().amount+" ." ;

  li.appendChild(name);
  li.appendChild(slipno);
  li.appendChild(amount);

  datalist.appendChild(li);
} 

//firestore.collection('chess').orderBy('time').get().then((snapshot) => {
//        snapshot.docs.forEach(doc => {
//          renderlist(doc);
//          console.log(doc.data())
//        })
//})

//real time updates
firestore.collection('throwball').orderBy('time').onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    console.log(change.doc.data()); 
    if(change.type == 'added'){
        renderlist(change.doc);
    }
  })
})
