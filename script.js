
// Global variables
let isRSVPSubmitted = false;
let userName = '';
let attendeesCount = '';
let isMusicPlaying = false;
let countdownInterval;

// Rundown data
const rundownData = [
    { 
        waktu: "05.00 – 06.00", 
        deskripsi: "Persiapan tempat dan perlengkapan", 
        area: "📍 Lapangan & Multimedia" 
    },
    { 
        waktu: "06.00 – 06.30", 
        deskripsi: "Persiapan panitia dan MC", 
        area: "📍 Lapangan & Multimedia" 
    },
    { 
        waktu: "06.30 – 07.30", 
        deskripsi: "Sterilisasi lokasi & Tarian Pembuka", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "07.30 – 08.42", 
        deskripsi: "Pembukaan, doa, menyanyikan lagu Indonesia Raya, dan sambutan", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "08.42 – 08.55", 
        deskripsi: "Sejarah Jakarta & Pembukaan Drama", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "08.55 – 09.37", 
        deskripsi: "Pertunjukan Drama & Tarian", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "09.37 – 09.57", 
        deskripsi: "Apresiasi & Pengarahan Fashion Show", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "09.57 – 10.27", 
        deskripsi: "Fashion Show per kelas", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "10.27 – 10.47", 
        deskripsi: "Penutupan, Flashmob, dan pengarahan sesi foto", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "10.47 – 11.52", 
        deskripsi: "Sesi Foto: Kepala Sekolah, Guru, dan Kelas", 
        area: "📍 Ruang Multimedia" 
    },
    { 
        waktu: "11.52 – 12.00", 
        deskripsi: "Pengarahan istirahat", 
        area: "📍 Lapangan" 
    }
];

// DOM elements
const rsvpPage = document.getElementById('rsvpPage');
const invitationPage = document.getElementById('invitationPage');
const rsvpForm = document.getElementById('rsvpForm');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const backgroundMusic = document.getElementById('backgroundMusic');
const mapBtn = document.getElementById('mapBtn');
const attendanceInfo = document.getElementById('attendanceInfo');
const rundownContainer = document.getElementById('rundownContainer');

// Event date for countdown
const eventDate = new Date("June 3, 2025 07:00:00").getTime();

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('P5 Invitation app initialized');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Generate rundown
    generateRundown();
    
    // Start countdown timer
    startCountdown();
});

function setupEventListeners() {
    // RSVP form submission
    rsvpForm.addEventListener('submit', handleRSVPSubmit);
    
    // Music toggle
    musicBtn.addEventListener('click', toggleMusic);
    
    // Map button
    mapBtn.addEventListener('click', openMap);
}

function handleRSVPSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const attendeesInput = document.getElementById('attendees');
    
    userName = nameInput.value.trim();
    attendeesCount = attendeesInput.value.trim();
    
    if (!userName || !attendeesCount) {
        showToast('Form tidak lengkap', 'Mohon isi nama dan jumlah tamu yang hadir', 'error');
        return;
    }
    
    isRSVPSubmitted = true;
    
    // Update attendance info
    attendanceInfo.textContent = `${userName} (${attendeesCount} orang)`;
    
    // Show invitation page
    rsvpPage.classList.add('hidden');
    invitationPage.classList.remove('hidden');
    
    // Show success toast
    showToast('Selamat Datang!', `Terima kasih ${userName}, kami menantikan kehadiran Anda`, 'success');
    
    // Re-initialize animations for new content
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

function toggleMusic() {
    console.log('Toggle music clicked, current state:', isMusicPlaying);
    
    if (isMusicPlaying) {
        backgroundMusic.pause();
        // Change icon to music note
        musicIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>`;
        showToast('Musik Dijeda', 'Musik tradisional dijeda', 'info');
        isMusicPlaying = false;
    } else {
        // Request permission for audio
        backgroundMusic.play().then(() => {
            // Change icon to volume off
            musicIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`;
            showToast('Musik Dimulai', 'Musik "Kita" sedang diputar', 'success');
            isMusicPlaying = true;
        }).catch((error) => {
            console.error('Audio play failed:', error);
            showToast('Audio Error', 'Browser tidak dapat memutar audio. Silakan klik untuk mengizinkan.', 'error');
        });
    }
}

function openMap() {
    window.open("https://maps.google.com/?q=Jl. Siaga No.9, RT.9/RW.6, Kb. Kosong, Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10630", "_blank");
}

function showToast(title, description, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastDescription = document.getElementById('toastDescription');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Show toast
    toast.classList.remove('translate-x-full');
    toast.classList.add('translate-x-0');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-full');
    }, 3000);
}

function startCountdown() {
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        }
    }, 1000);
}

function generateRundown() {
    rundownData.forEach((item, index) => {
        const rundownItem = document.createElement('div');
        rundownItem.className = 'bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#800000]/20';
        
        rundownItem.innerHTML = `
            <div class="flex flex-col space-y-2">
                <div class="font-bold text-[#800000] text-lg">${item.waktu}</div>
                <div class="text-gray-800 font-medium">${item.deskripsi}</div>
                <div class="text-gray-600 text-sm">${item.area}</div>
            </div>
        `;
        
        rundownContainer.appendChild(rundownItem);
    });
}

function initializeAnimations() {
    // Animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements after a short delay
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }, 100);
}

// Handle audio autoplay policy
document.addEventListener('click', function() {
    // This helps with browsers that require user interaction before playing audio
    if (backgroundMusic.paused && isMusicPlaying) {
        backgroundMusic.play().catch(console.error);
    }
}, { once: true });
