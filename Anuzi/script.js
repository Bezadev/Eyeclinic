// Mobile Navigation
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const menuIcon = menuBtn.querySelector("i");

function setMenuState(isOpen) {
    navLinks.classList.toggle("active", isOpen);
    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuBtn.addEventListener("click", () => {
    setMenuState(!navLinks.classList.contains("active"));
});

document.addEventListener("click", (event) => {
    if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        setMenuState(false);
    }
});

menuBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        menuBtn.click();
    }
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        setMenuState(false);
    });
});



// ===== Typewriter Effect =====

const phrases = [
  "Your Vision, Our Priority",
  "See the World Clearly",
  "Trusted Eye Care Service",
  "Protecting Your Sight"
];

const typingElement = document.getElementById("typing");

let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {
    typingElement.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;

    if (letterIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeEffect, 2000); // Pause before deleting
      return;
    }

    setTimeout(typeEffect, 90); // Typing speed

  } else {
    typingElement.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;

    if (letterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 500); // Pause before next phrase
      return;
    }

    setTimeout(typeEffect, 50); // Deleting speed
  }
}

window.addEventListener("load", typeEffect);
// Scroll-to-Top Button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Send form details to the clinic's WhatsApp chat.
const whatsappNumber = "2348029179647";
const appointmentForm = document.getElementById("appointmentForm");
const appointmentDate = document.getElementById("appointmentDate");

function getToday() {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    return new Date(today.getTime() - (offset * 60 * 1000)).toISOString().split("T")[0];
}

function formatDate(dateValue) {
    return new Intl.DateTimeFormat("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(`${dateValue}T12:00:00`));
}

appointmentDate.min = getToday();
appointmentDate.addEventListener("change", () => {
    const selectedDay = new Date(`${appointmentDate.value}T12:00:00`).getDay();
    if (selectedDay === 0 || selectedDay === 6) {
        appointmentDate.setCustomValidity("Please choose a Monday to Friday.");
    } else {
        appointmentDate.setCustomValidity("");
    }
});

appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
    }

    const formData = new FormData(appointmentForm);
    const message = [
        "Hello Anuzi Eye Clinic, I would like to book an appointment.",
        "",
        `Name: ${formData.get("fullName")}`,
        `Email: ${formData.get("email")}`,
        `Phone: ${formData.get("phone")}`,
        `Preferred date: ${formatDate(formData.get("appointmentDate"))}`,
        `Service: ${formData.get("service")}`,
        `Additional message: ${formData.get("message") || "None"}`
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const formData = new FormData(contactForm);
    const message = [
        "Hello Anuzi Eye Clinic, I have a question.",
        "",
        `Name: ${formData.get("contactName")}`,
        `Phone: ${formData.get("contactPhone")}`,
        `Message: ${formData.get("contactMessage")}`
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

// Fade-in Animation
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});