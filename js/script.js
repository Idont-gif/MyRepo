class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        if (!this.slider) {
            return;
        }
        this.track = this.slider.querySelector('.slider-track');
        if (!this.track) {
            return;
        }
        this.slides = Array.from(this.track.querySelectorAll('.slide'));
        this.previousButton = this.slider.querySelector('.slider-btn.prev');
        this.nextButton = this.slider.querySelector('.slider-btn.next');
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        this.dots=[];
        this.currentIndex = 0;
        this.autoplayId = null;
        if (this.slides.length === 0 || !this.dotsContainer) {
            return;
        }
        this.createDots();
        this.bindEvents();
        this.updateSliderPosition();
        this.startAutoplay();
    }
    bindEvents() {
        this.previousButton?.addEventListener('click', () => this.previousSlide());
        this.nextButton?.addEventListener('click', () => this.nextSlide());
        this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
        this.slider.addEventListener('mouseleave', () => this.startAutoplay());
    }
    createDots(){
        this.dotsContainer.innerHTML = "";
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add("dot");
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSliderPosition();
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateSliderPosition() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        this.updateDots();
    }
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSliderPosition();
    }
    previousSlide() {
        this.currentIndex =
            (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSliderPosition();
    }
    startAutoplay() {
        if (this.autoplayId !== null || this.slider.matches(':hover')) {
            return;
        }
        this.autoplayId = window.setInterval(() => this.nextSlide(), 5000);
    }
    stopAutoplay() {
        if (this.autoplayId === null) {
            return;
        }
        window.clearInterval(this.autoplayId);
        this.autoplayId = null;
    }
}
document.addEventListener('DOMContentLoaded', () => { new ImageSlider('.slider');}
);
