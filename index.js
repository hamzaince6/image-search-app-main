// index.js

const accessKey = "QPxPERHGLldaJCnmNsuNzhiJo3PhWHv4Y40ybVGAhcc";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

const selectedImageEl = document.getElementById("selected-image");
const imageCaptionEl = document.getElementById("image-caption");

let inputData = "";
let page = 1;
let isFirstPopupOpen = true;

function showImageSelectionAlert() {
  if (isFirstPopupOpen) {
    Swal.fire({
      icon: 'info',
      title: 'Lütfen Görsel Seçmek İçin Çift Tıklayınız',
      showConfirmButton: false,
      timer: 1500
    });
    isFirstPopupOpen = false;
  }
}

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);


    image.addEventListener("dblclick", () => {
      selectedImageEl.src = result.urls.regular;
      selectedImageEl.alt = result.alt_description;
      imageCaptionEl.textContent = result.alt_description;

      // SweetAlert kullanarak başarılı ekleme mesajı gösterme
      Swal.fire({
        icon: 'success',
        title: 'Görsel Eklendi!',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

// Popup açıldığında görsel seçmek için çift tıklama uyarısı gösterme
document.getElementById('popup').addEventListener('click', showImageSelectionAlert);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Popup.js
document.getElementById('search-button').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target == document.getElementById('popup')) {
    document.getElementById('popup').style.display = 'none';
  }
});



