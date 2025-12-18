// Clock Logic
    function updateClock(){
        const now = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const pad = (n) => n < 10 ? '0'+n : n;

        const dateStr = `${days[now.getDay()]}, ${pad(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
        let h = now.getHours();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        const timeStr = `${pad(h)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`;

        document.getElementById('header-clock').innerHTML = `${dateStr}<br>${timeStr}`;
    }

    // Dynamic Greeting
    function setGreeting() {
        const hour = new Date().getHours();
        const el = document.getElementById('dynamic-greeting');
        if (hour < 12) el.innerText = "Good Morning! ☀️";
        else if (hour < 18) el.innerText = "Good Afternoon! 🌤️";
        else el.innerText = "Good Evening! 🌙";
    }

    // UNIVERSAL TOGGLE FUNCTION
    function toggleSection(id) {
        const content = document.getElementById(id);
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    //FAMILY//
    //--carousel script--/
    let currentSlideIndex = 0;
    let slides;
    const TOTAL_SLIDES = 9;

    function showSlide(index){
        //find all slides//
        slides = document.querySelectorAll('.family-slide');
        if(!slides||slides.length === 0) return;

        //new index//
        if(index >= slides.length){
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length -1;
        } else {
            currentSlideIndex = index;
        }

        //hide all slides and remove the active class
        slides.forEach (slide => {
            slide.classList.remove ('active');
            slide.style.opacity ='0';
            slide.style.pointerEvents ='none';//disable interaction with hidden slides
            slide.style.zIndex= '1';
        });

        //show current slide
        slides[currentSlideIndex].classList.add('active');
        slides[currentSlideIndex].style.opacity='1';
        slides[currentSlideIndex].style.pointerEvents='auto';
        slides[currentSlideIndex].style.zIndex='10';//bring active slide to front

        //update indicator
        const indicator = document.getElementById('slideIndicator');
        if (indicator) {
            //changed single quotes
            indicator.textContent =
                `Card ${currentSlideIndex + 1} of ${TOTAL_SLIDES}`;
        }
    }

    //function exposed to the HTML buttons
    function changeSlide(n) {
        showSlide (currentSlideIndex + n);
    }

    //Initialization function called on DOMContentLoaded
    function initFamilyCarousel() {
        slides = document.querySelectorAll ('.family-slide');
        if (slides.length > 0) {
            //ensure all slides are set up for transition
            slides.forEach (slide => {
                slide.style.transition = 'opacity 0.5s ease-in-out';
                slide.style.position = 'absolute';
                slide.style.top = '0';
                slide.style.left = '0';
                slide.style.width = '100%';
            })
            showSlide(currentSlideIndex);
        }
    }

    // --- Gallery Lightbox Script ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    
    let currentCategoryImages = [];
    let currentCategoryCaptions = [];
    let slideIndex = 0;
//-- Function to open the modal and display the first image in the clicked category--//
    function openModal(category, index) {
        // Stop event propagation in case an image itself was clicked, preventing immediate closure
        event.stopPropagation();
        
        const data = dataMap[category];
        if (!data) return;

        currentCategoryImages = data.images;
        currentCategoryCaptions = data.captions;
        
        modal.style.display = 'block';
        showSlides(index);
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Function to change the slide index
    function plusSlides(n) {
        showSlides(slideIndex + n);
    }

    // Function to display the specific slide
    function showSlides(n) {
        if (currentCategoryImages.length === 0) return;

        // Loop back if index is out of bounds
        if (n >= currentCategoryImages.length) {
            slideIndex = 0;
        } else if (n < 0) {
            slideIndex = currentCategoryImages.length - 1;
        } else {
            slideIndex = n;
        }

        // Update the image source and caption
        modalImg.src = currentCategoryImages[slideIndex];
        modalImg.alt = currentCategoryCaptions[slideIndex];
        captionText.innerHTML = `${currentCategoryCaptions[slideIndex]} (${slideIndex + 1} of ${currentCategoryImages.length})`;
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        updateClock();
        setInterval(updateClock, 1000);
        setGreeting();
    });
