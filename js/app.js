const loadPhone = async (search, dataLimite) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone (data.data, dataLimite);
}

const displayPhone = (phones, dataLimite) =>{
    console.log(phones);
    const displayPhone = document.getElementById("display-phone");
    displayPhone.innerText = "";

    // DISPLAY JUST 10 ITEMS
    const showMore = document.getElementById("show-more");
    if(dataLimite && phones.length > 10){
        phones = phones.slice(0, 10)
        showMore.classList.remove("d-none")
    }else{
        showMore.classList.add("d-none")
    }
    

    // IF SEARCH RESULT NOT FOUND
    const itemNotFound = document.getElementById("item-not-found");
    phones.length === 0 ? itemNotFound.classList.remove("d-none") : itemNotFound.classList.add("d-none")

    phones.forEach(phone => {
        // DISPLAY PHONE
        const colDiv = document.createElement("div");
        colDiv.classList.add("col");
        colDiv.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="fw-bold">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick ="phoneDetailsDisplay('${phone.slug}');" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
                </div>
            </div>
        `;

        // STOP SPINNER LOADER
        displayPhone.appendChild(colDiv);
    });

    // STOP SPINNER LOADER
    toggleSpinner(false);
}

const phoneDetailsDisplay = async (phoneID) =>{
    phoneIdURL = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    const res = await fetch(phoneIdURL);
    const data = await res.json();
    displayPhoneDetailsModal(data.data)
}
const displayPhoneDetailsModal = (phone) =>{
    const modalTitle = document.getElementById("modal-title");
    modalTitle.innerText = phone.name;

    const modalImg = document.getElementById("modal-img")
    modalImg.src= phone.image;

    const releaseDate = document.getElementById("releaseDate");
    releaseDate.innerText = phone.releaseDate;
}


// SEARCH FIELD 
document.getElementById("search-btn").addEventListener("click", function(){

    searchProcess(10);

})

// START SEARCH WHEN PRESS ENTER AFTER TYPING
document.getElementById("search-text").addEventListener("keypress", (e)=> {
    if (e.key === "Enter") { // key code of the keybord key
        searchProcess(10);
    }
});


// ADDED SPINNER
const toggleSpinner = (isLoading) =>{
    const spinner = document.getElementById("spinner");

    if(isLoading){
        spinner.classList.remove("d-none");
    }
    else{
        spinner.classList.add("d-none")
    }
}

const searchProcess = (dataLimite) =>{
     // SPINNER START 
     toggleSpinner(true)
     const searchText = document.getElementById("search-text")
     const search = searchText.value
     loadPhone(search, dataLimite);
     //searchText.value = "";
}

document.getElementById("show-more-btn").addEventListener("click", function(){
    searchProcess()
})




loadPhone("iphone")