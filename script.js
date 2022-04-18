'use strict';
// YOU NEED TO GET THE CONFIG FILE.  SINCE IT ISNT ON GITHUB, CLONING THE REPO DOESNT GET IT.
import { API_URL } from './config.js';
import { KEY } from './config.js';
// import { COUNT } from './config.js';

const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let apiURL = `${API_URL}?client_id=${KEY}&count=${count}`;

let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let countToLoad = 5;

const imageLoaded = function () {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		// page is ready, everything has finished loading
		ready = true;
		loader.hidden = true;
		countToLoad = 30;
		apiURL = `${API_URL}?client_id=${KEY}&count=${countToLoad}`;
	}
};

// function to set multiple attributes.  takes in an object for attributes.  key is the type of attribute, attributes[key] is the value
const setAttributes = function (element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

const displayPhotos = function () {
	imagesLoaded = 0;
	totalImages = photoArray.length;

	photoArray.forEach((photo) => {
		// link to unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		// creates img
		const image = document.createElement('img');
		setAttributes(image, {
			src: photo.urls.regular,
			alt: photo.alt_description,
		});

		image.addEventListener('load', imageLoaded);

		// insert image inside of anchor element, then both in image container
		item.appendChild(image);
		imageContainer.appendChild(item);
	});
};

const fetchPhotos = async function () {
	try {
		const response = await fetch(apiURL);
		photoArray = await response.json();

		displayPhotos();
	} catch (error) {
		console.error(error);
	}
};
fetchPhotos();

window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		fetchPhotos();
	}
});

// const displayPhotos = async function () {
// 	const photoArray = await fetchPhotos();
// 	console.log(photoArray);
// 	photoArray.forEach((photo) => {
// 		const html = `
// 	<a href="${photo}.links.html"
// 		<img src="${photo}.urls.regular" alt="${photo}.alt_description" title="${photo}.alt_description">
// 	</a>
// 	`;

// 		imageContainer.insertAdjacentHTML('afterbegin', html);
// 	});
// };
// displayPhotos();
