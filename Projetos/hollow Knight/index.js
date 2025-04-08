// Dados dos slides
const slides = [
    {
        image: 'img/image1.gif',
        description: 'Um cavaleiro sem nome explora um reino em ruínas...',
        descriptionClass: 'gradient-blue-black',
        music: 'audio/musica2.mp3'
    },
    {
        image: 'img/image2.gif',
        description: 'Hornet aparece inicialmente como um antagonista errante e recorrente do Cavaleiro',
        descriptionClass: 'gradient-red-gray',
        music: 'audio/musica1.mp3'
    },
    {
        image: 'img/image3.gif',
        description: 'Grimm o mestre da trupe que chega em Dirtmouth',
        descriptionClass: 'gradient-red-black',
        music: 'audio/musica3.mp3'
    }
];

let currentIndex = 0;

const carouselImage = document.getElementById('carousel-image');
const descriptionElement = document.getElementById('description');
const audio = document.getElementById('audio');
const youtubePlayer = document.getElementById('youtube-player');

function changeSlide(index) {
    const slide = slides[index];
    carouselImage.src = slide.image;
    descriptionElement.textContent = slide.description;
    descriptionElement.className = `gradient ${slide.descriptionClass}`;

    audio.pause();
    audio.src = '';

    if (slide.music.includes('youtu')) {
        audio.style.display = 'none';
        youtubePlayer.src = `https://www.youtube.com/embed/${extractYouTubeID(slide.music)}?autoplay=1`;
        youtubePlayer.style.display = 'block';
    } else {
        youtubePlayer.src = '';
        youtubePlayer.style.display = 'none';
        audio.style.display = 'block';
        audio.src = slide.music;
        audio.play();
    }
}

function extractYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

document.getElementById('prev-button').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    changeSlide(currentIndex);
});

document.getElementById('next-button').addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    changeSlide(currentIndex);
});

document.getElementById('play-button').addEventListener('click', () => {
    playMusic();
});

document.getElementById('pause-button').addEventListener('click', () => {
    pauseMusic();
});

function playMusic() {
    if (slides[currentIndex].music.includes('youtu')) {
        youtubePlayer.src += "&autoplay=1";
    } else {
        audio.play();
    }
}

function pauseMusic() {
    if (slides[currentIndex].music.includes('youtu')) {
        youtubePlayer.src = youtubePlayer.src;
    } else {
        audio.pause();
    }
}

changeSlide(currentIndex);
