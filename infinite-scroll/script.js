const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = []

let initialLoad = true;


// Unsplash API
let count = 5;
const apiKey='nCqG4WPUEQ-EH47MlweLZQxq09l3RlSQE72FBlVZvRo'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Check if all iamges are loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    }
}

//Helper Function to Set Attributes to  DOM elements
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}


// Create Elements For Links & Photos and Add them to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;
    console.log('total images ',totalImages);
    photos.forEach((photo) =>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank'
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event Listener, check when each is loaded
        img.addEventListener('load',imageLoaded)
        //Put <img> inside <a>, then put both inside imageContainer Element

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash api
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photos = await response.json();
        displayPhotos()
    } catch(error){
        //catch eror
    }
}

// Check if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',() =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        console.log('load more');
        getPhotos();
    }
})
getPhotos()
