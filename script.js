document.addEventListener('DOMContentLoaded', () => {
    const flame = document.getElementById('candleFlame');
    const blowButton = document.getElementById('blowButton');
    const mainContent = document.getElementById('main-content');
    const finalImageContainer = document.getElementById('finalImageContainer');
    const continueButton = document.getElementById('continueButton');
    const imageGallery = document.getElementById('imageGallery');
    const galleryInner = imageGallery.querySelector('.gallery-inner');
    const prevButton = imageGallery.querySelector('.prev-button');
    const nextButton = imageGallery.querySelector('.next-button');
    const giftButton = document.getElementById('giftButton');
    const quizContainer = document.getElementById('quizContainer');
    const quizQuestion = quizContainer.querySelector('.quiz-question');
    const quizForm = document.getElementById('quizForm');
    const quizResult = document.getElementById('quizResult');
    const submitQuizButton = document.getElementById('submitQuiz');
    const finalGifContainer = document.getElementById('finalGifContainer'); 
    const finalGif = document.getElementById('finalGif'); 

    let candleBlownOut = false;
    let currentImageIndex = 0;

    const galleryImages = [
        '1.JPEG',
        '2.JPEG',
        '3.JPEG',
        '4.JPEG',
        '5.JPEG',
        '6.JPEG'
    ];

    function preloadGalleryImages() {
        galleryImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    function populateGallery() {
        galleryImages.forEach(src => {
            const imgElement = document.createElement('img');
            imgElement.src = src;
            imgElement.alt = "Imagine din galerie";

            const galleryItemWrapper = document.createElement('div');
            galleryItemWrapper.classList.add('gallery-item-wrapper');
            galleryItemWrapper.appendChild(imgElement);

            galleryInner.appendChild(galleryItemWrapper);
        });
    }

    function showImage(index) {
        currentImageIndex = index;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        const offset = -currentImageIndex * 100;
        galleryInner.style.transform = `translateX(${offset}%)`;

        if (currentImageIndex === galleryImages.length - 1) {
            giftButton.classList.remove('hidden');
        } else {
            giftButton.classList.add('hidden');
        }
    }

    preloadGalleryImages();
    populateGallery();
    showImage(currentImageIndex);

    function extinguishCandle() {
        if (!candleBlownOut) {
            flame.classList.add('blown-out');
            candleBlownOut = true;

            blowButton.disabled = true;
            blowButton.textContent = "Yaaaaaay";
            blowButton.style.backgroundColor = '#0000CD';

            setTimeout(() => {
                mainContent.style.opacity = '0';
                setTimeout(() => {
                    mainContent.classList.add('hidden');
                    finalImageContainer.classList.remove('hidden');
                    finalImageContainer.style.opacity = '1';
                }, 1000);
            }, 2500);
        }
    }

    blowButton.addEventListener('click', extinguishCandle);

    continueButton.addEventListener('click', () => {
        finalImageContainer.style.opacity = '0';
        setTimeout(() => {
            finalImageContainer.classList.add('hidden');
            imageGallery.classList.remove('hidden');
            imageGallery.style.opacity = '1';
            showImage(0);
        }, 1000);
    });

    prevButton.addEventListener('click', () => {
        showImage(currentImageIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showImage(currentImageIndex + 1);
    });

    giftButton.addEventListener('click', () => {
        imageGallery.style.opacity = '0';
        setTimeout(() => {
            imageGallery.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            quizContainer.style.opacity = '1';
            
            quizForm.reset();
            quizResult.classList.add('hidden'); 
            finalGifContainer.classList.add('hidden'); 

            quizQuestion.classList.remove('hidden');
            quizForm.classList.remove('hidden');
            submitQuizButton.classList.remove('hidden');
            submitQuizButton.disabled = false; 
        }, 1000);
    });

    // Modificarea cheie: Logica formularului simplificată pentru a trece direct la rezultat
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Nu mai verificăm selectedOption, mergem direct la rezultat
        quizResult.textContent = "La multi ani, simpaticule! Esti un baiat cel putin caristmatic si caterincios. Te pup dulce!"; 
        quizResult.classList.remove('hidden');

        quizQuestion.classList.add('hidden');
        quizForm.classList.add('hidden');
        submitQuizButton.classList.add('hidden');

        finalGifContainer.classList.remove('hidden');
    });
});