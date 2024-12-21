const output = document.getElementById("output");  
const btn = document.getElementById("download-images-button");  

const images = [  
    { url: "https://picsum.photos/id/237/200/300" },  
    { url: "https://picsum.photos/id/238/200/300" },  
    { url: "https://picsum.photos/id/239/200/300" },  
];  

// Function to download an image given its URL  
function downloadImage(image) {  
    return new Promise((resolve, reject) => {  
        const img = new Image();  
        img.src = image.url;  

        img.onload = () => resolve(img); // Resolve with the image element if successful  
        img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Reject with an error message if failed  
    });  
}  

// Function to download all images  
function downloadImages() {  
    const promises = images.map(downloadImage); // Create an array of promises for each image  

    Promise.all(promises)  
        .then((loadedImages) => {  
            // Clear previous images  
            output.innerHTML = '';  
            // Append each successfully loaded image to the output div  
            loadedImages.forEach((img) => {  
                output.appendChild(img);  
            });  
        })  
        .catch((error) => {  
            // Handle any error that occurred during the image loading  
            output.innerHTML = `<p style="color: red;">${error}</p>`;  
        });  
}  

// Listen for the button click  
btn.addEventListener("click", downloadImages);