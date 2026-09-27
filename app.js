/* 
   =========================================
   Quick Service Booking System - Logic
   =========================================
*/

// --- 1. Global Elements and Data ---
const bookingForm = document.getElementById('booking-form');
const bookingsList = document.getElementById('bookings-list');
const successMessage = document.getElementById('success-message');
const loadingSpinner = document.getElementById('loading-spinner');

// Authentication & Themes
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authSection = document.getElementById('auth-section');
const mainContent = document.getElementById('main-content');
const userInfo = document.getElementById('user-info');
const loginLink = document.getElementById('login-link');
const userNameSpan = document.getElementById('user-name');
const authError = document.getElementById('auth-error');

// Dashboard Controls & Stats
const searchInput = document.getElementById('search-input');
const filterDate = document.getElementById('filter-date');
const statTotalBookings = document.getElementById('stat-total-bookings');
const statTotalSpent = document.getElementById('stat-total-spent');
const statTopService = document.getElementById('stat-top-service');
const statTopSubService = document.getElementById('stat-top-subservice');
const noBookingsMsg = document.getElementById('no-bookings-msg');

// Modal & Location Elements
const subServiceModal = document.getElementById('sub-service-modal');
const modalTitle = document.getElementById('modal-title');
const subServicesList = document.getElementById('sub-services-list');
const locationSelect = document.getElementById('location-selector');

// Hierarchical Service Data with Geographic Availability
const locations = ['Hyderabad', 'Secunderabad', 'Kukatpally', 'Kompally', 'Gachibowli'];

const serviceData = {
    "Home Maintenance": [
        { name: "Electric Repair", price: 499, rating: 4.5, icon: "⚡", availableIn: ['Hyderabad', 'Kukatpally'] },
        { name: "Plumbing", price: 599, rating: 4.6, icon: "🚰", availableIn: ['Secunderabad', 'Kompally'] },
        { name: "Carpenter", price: 699, rating: 4.4, icon: "🪚", availableIn: ['Hyderabad', 'Gachibowli'] }
    ],
    "Cleaning Services": [
        { name: "Home Cleaning", price: 399, rating: 4.7, icon: "🏠", availableIn: ['Hyderabad', 'Secunderabad', 'Gachibowli'] },
        { name: "Bathroom Cleaning", price: 299, rating: 4.5, icon: "🛁", availableIn: ['Kukatpally', 'Kompally'] },
        { name: "Kitchen Cleaning", price: 349, rating: 4.6, icon: "🍳", availableIn: ['Hyderabad', 'Kukatpally'] }
    ],
    "Appliance Repair": [
        { name: "AC Repair", price: 999, rating: 4.3, icon: "❄️", availableIn: ['Hyderabad', 'Gachibowli'] },
        { name: "Washing Machine", price: 799, rating: 4.4, icon: "🧺", availableIn: ['Secunderabad', 'Kukatpally'] },
        { name: "Refrigerator", price: 899, rating: 4.5, icon: "🧊", availableIn: ['Kompally', 'Hyderabad'] }
    ],
    "Maid Services": [
        { name: "Full-time Maid", price: 5000, rating: 4.6, icon: "🧹", availableIn: ['Hyderabad', 'Gachibowli', 'Secunderabad'] },
        { name: "Part-time Maid", price: 2500, rating: 4.5, icon: "🧤", availableIn: ['Kukatpally', 'Kompally'] }
    ],
    "Personal & Lifestyle": [
        { name: "Yoga Trainer", price: 799, rating: 4.7, icon: "🧘", availableIn: ['Hyderabad', 'Kukatpally', 'Gachibowli'] },
        { name: "Beauty Parlour", price: 599, rating: 4.6, icon: "💄", availableIn: ['Secunderabad', 'Kompally'] },
        { name: "Home Massage", price: 999, rating: 4.5, icon: "💆", availableIn: ['Gachibowli', 'Hyderabad'] }
    ],
    "Vehicle Services": [
        { name: "Car Wash", price: 299, rating: 4.5, icon: "🚗", availableIn: ['Hyderabad', 'Kukatpally'] },
        { name: "Bike Repair", price: 399, rating: 4.4, icon: "🏍️", availableIn: ['Secunderabad', 'Kompally'] },
        { name: "Car Servicing", price: 999, rating: 4.6, icon: "🔧", availableIn: ['Gachibowli', 'Hyderabad'] }
    ],
    "Event & Occasion": [
        { name: "Birthday Decoration", price: 1999, rating: 4.7, icon: "🎈", availableIn: ['Hyderabad', 'Kukatpally', 'Secunderabad'] },
        { name: "Wedding Planning", price: 9999, rating: 4.8, icon: "👰", availableIn: ['Gachibowli', 'Hyderabad'] },
        { name: "Photography", price: 2999, rating: 4.6, icon: "📸", availableIn: ['Kukatpally', 'Kompally'] }
    ],
    "Outdoor & Utility": [
        { name: "Gardening", price: 399, rating: 4.4, icon: "🌻", availableIn: ['Hyderabad', 'Kompally'] },
        { name: "Pest Control", price: 599, rating: 4.5, icon: "🐜", availableIn: ['Secunderabad', 'Kukatpally'] },
        { name: "Water Tank Cleaning", price: 699, rating: 4.3, icon: "🚰", availableIn: ['Gachibowli', 'Hyderabad'] }
    ],
    "Safety & Installation": [
        { name: "CCTV Installation", price: 1499, rating: 4.6, icon: "📹", availableIn: ['Hyderabad', 'Gachibowli'] },
        { name: "Door Lock Installation", price: 499, rating: 4.4, icon: "🔐", availableIn: ['Kukatpally', 'Kompally'] },
        { name: "Fire Safety Setup", price: 999, rating: 4.5, icon: "🔥", availableIn: ['Secunderabad', 'Gachibowli'] }
    ],
    "Digital Services": [
        { name: "Website Development", price: 4999, rating: 4.7, icon: "💻", availableIn: ['Hyderabad', 'Gachibowli', 'Kukatpally', 'Secunderabad', 'Kompally'] },
        { name: "Graphic Design", price: 999, rating: 4.5, icon: "🎨", availableIn: ['Hyderabad', 'Gachibowli'] },
        { name: "SEO Optimization", price: 1999, rating: 4.6, icon: "📈", availableIn: ['Hyderabad', 'Secunderabad'] }
    ],
    "Interior Services": [
        { name: "Painting", price: 1999, rating: 4.5, icon: "🖌️", availableIn: ['Hyderabad', 'Secunderabad'] },
        { name: "Modular Kitchen", price: 15000, rating: 4.8, icon: "🍽️", availableIn: ['Gachibowli', 'Hyderabad'] },
        { name: "Furniture Setup", price: 999, rating: 4.4, icon: "🛋️", availableIn: ['Kukatpally', 'Kompally'] }
    ]
};

// --- 2. Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    displayBookings();
    loadTheme();
});

// --- 3. Authentication & Theme Logic ---

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.getElementById('theme-toggle').innerText = newTheme === 'dark' ? '☀️ Mode' : '🌙 Mode';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-toggle').innerText = savedTheme === 'dark' ? '☀️ Mode' : '🌙 Mode';
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedInUser) {
        mainContent.classList.remove('hidden');
        authSection.classList.add('hidden');
        userInfo.classList.remove('hidden');
        loginLink.classList.add('hidden');
        userNameSpan.innerText = loggedInUser.name;
    } else {
        mainContent.classList.add('hidden');
        authSection.classList.remove('hidden');
        userInfo.classList.add('hidden');
        loginLink.classList.remove('hidden');
    }
}

// Provider Data (Mock professionals for the system)
const providerData = {
    "Electric Repair": [
        { name: "Ravi Teja", exp: 3, rating: 4.5, price: 499, loc: "Hyderabad", img: "👨‍🔧" },
        { name: "Suresh Kumar", exp: 5, rating: 4.7, price: 599, loc: "Kukatpally", img: "👨‍🔧" }
    ],
    "Plumbing": [
        { name: "Manish Singh", exp: 4, rating: 4.6, price: 599, loc: "Secunderabad", img: "👨‍🔧" },
        { name: "Vicky Rawat", exp: 2, rating: 4.2, price: 499, loc: "Kompally", img: "👨‍🔧" }
    ],
    "Home Cleaning": [
        { name: "Sunita Reddy", exp: 6, rating: 4.8, price: 399, loc: "Hyderabad", img: "👩‍🌾" },
        { name: "Anitha Devi", exp: 3, rating: 4.4, price: 299, loc: "Gachibowli", img: "👩‍🌾" }
    ],
    "Website Development": [
        { name: "Rahul Varma", exp: 5, rating: 4.9, price: 4999, loc: "Gachibowli", img: "👨‍💻" },
        { name: "Sneha Kapur", exp: 3, rating: 4.7, price: 4499, loc: "Hyderabad", img: "👩‍💻" }
    ]
    // Generic generator for other sub-services will be used to populate UI
};

// --- 4. Selection & Filtering Logic ---

function onLocationChange() {
    const loc = locationSelect.value;
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText;
        const availableSubs = serviceData[title].filter(sub => loc === "All" || sub.availableIn.includes(loc));
        card.style.opacity = availableSubs.length === 0 ? "0.4" : "1";
        card.style.pointerEvents = availableSubs.length === 0 ? "none" : "auto";
    });
}

function showSubServices(mainService) {
    const loc = locationSelect.value;
    modalTitle.innerHTML = `<button onclick="closeSubServiceModal()" class="back-btn">←</button> ${mainService}`;
    subServicesList.innerHTML = ''; 

    const options = serviceData[mainService];
    const filteredOptions = options.filter(sub => loc === "All" || sub.availableIn.includes(loc));

    filteredOptions.forEach(sub => {
        const card = document.createElement('div');
        card.className = 'sub-card';
        card.innerHTML = `
            <i>${sub.icon}</i>
            <h4>${sub.name}</h4>
            <span class="price">From ₹${sub.price} | ⭐ ${sub.rating}</span>
            <button class="sub-book-btn" onclick="showProviders('${mainService}', '${sub.name}', ${sub.price})">Select Expert</button>
        `;
        subServicesList.appendChild(card);
    });

    subServiceModal.classList.remove('hidden');
}

function showProviders(main, sub, basePrice) {
    const loc = locationSelect.value;
    modalTitle.innerHTML = `<button onclick="showSubServices('${main}')" class="back-btn">←</button> Professionals for ${sub}`;
    subServicesList.innerHTML = '';

    // Get real providers if defined, or generate mock ones
    let providers = providerData[sub] || [
        { name: "Expert Pro", exp: "5+", rating: 4.9, price: basePrice + 100, loc: "Gachibowli", img: "👨‍🔧" },
        { name: "Reliable Hand", exp: "2", rating: 4.4, price: basePrice, loc: loc === 'All' ? 'Hyderabad' : loc, img: "👨‍🔧" }
    ];

    // Filter providers by location
    const filteredProviders = providers.filter(p => loc === "All" || p.loc === loc);

    if (filteredProviders.length === 0) {
        subServicesList.innerHTML = `<p class="error-msg">No professionals found in ${loc}. Try another area.</p>`;
    } else {
        filteredProviders.forEach(p => {
            const card = document.createElement('div');
            card.className = 'provider-card';
            card.innerHTML = `
                <div class="p-avatar">${p.img}</div>
                <div class="p-info">
                    <h4>${p.name}</h4>
                    <p>${p.exp} yrs exp | ⭐ ${p.rating}</p>
                    <p class="p-loc">📍 ${p.loc}</p>
                </div>
                <div class="p-price">₹${p.price}</div>
                <button class="book-expert-btn" onclick="selectProvider('${main}', '${sub}', '${p.name}', ${p.price}, '${p.loc}')">Book Now</button>
            `;
            subServicesList.appendChild(card);
        });
    }
}

function closeSubServiceModal() {
    subServiceModal.classList.add('hidden');
}

function selectProvider(main, sub, expert, price, loc) {
    document.getElementById('service-type').value = main;
    document.getElementById('sub-service-type').value = sub;
    document.getElementById('service-price').value = `₹${price}`;
    document.getElementById('booking-location').value = loc;
    document.getElementById('expert-name').value = expert;

    closeSubServiceModal();
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// --- 5. Booking Logic ---

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formError = document.getElementById('form-error');
    formError.classList.add('hidden');

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const location = document.getElementById('booking-location').value;
    const providerName = document.getElementById('expert-name').value;
    const mainService = document.getElementById('service-type').value;
    const subService = document.getElementById('sub-service-type').value;
    const price = document.getElementById('service-price').value.replace('₹', '');
    const date = document.getElementById('date').value;

    if (phone.length !== 10 || isNaN(phone)) {
        formError.innerText = "Error: Invalid 10-digit phone number.";
        formError.classList.remove('hidden');
        return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    const userEmail = loggedInUser ? loggedInUser.email : 'guest';

    const booking = { name, phone, address, location, providerName, mainService, subService, price: parseInt(price), date, userEmail };
    
    loadingSpinner.classList.remove('hidden');

    setTimeout(() => {
        let bookings = JSON.parse(localStorage.getItem('myBookings')) || [];
        bookings.push(booking);
        localStorage.setItem('myBookings', JSON.stringify(bookings));
        
        loadingSpinner.classList.add('hidden');
        successMessage.classList.remove('hidden');
        bookingForm.reset();
        
        setTimeout(() => successMessage.classList.add('hidden'), 3000);
        displayBookings();
    }, 600);
});

// --- 6. Dashboard & Search Logic ---

function displayBookings() {
    let bookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    const searchTerm = searchInput.value.toLowerCase();
    const filterDateValue = filterDate.value;

    const filtered = bookings.filter(item => {
        const matchesSearch = item.mainService.toLowerCase().includes(searchTerm) || 
                             item.subService.toLowerCase().includes(searchTerm) || 
                             item.location.toLowerCase().includes(searchTerm) ||
                             item.providerName.toLowerCase().includes(searchTerm);
        const matchesDate = filterDateValue ? item.date === filterDateValue : true;
        return matchesSearch && matchesDate;
    });

    bookingsList.innerHTML = '';
    if (filtered.length === 0) {
        noBookingsMsg.classList.remove('hidden');
    } else {
        noBookingsMsg.classList.add('hidden');
        filtered.forEach((item, index) => {
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td><b>${item.providerName}</b></td>
                    <td>${item.subService} (${item.location})</td>
                    <td>${item.date}</td>
                    <td>₹${item.price}</td>
                    <td><button class="delete-btn" onclick="deleteBooking(${index})">Delete</button></td>
                </tr>
            `;
            bookingsList.innerHTML += row;
        });
    }

    updateStats(bookings);
}

function updateStats(bookings) {
    statTotalBookings.innerText = bookings.length;
    const totalSpent = bookings.reduce((sum, item) => sum + item.price, 0);
    statTotalSpent.innerText = `₹${totalSpent}`;

    if (bookings.length > 0) {
        const mainTags = bookings.map(b => b.mainService);
        statTopService.innerText = getMostFrequent(mainTags);
        const subTags = bookings.map(b => b.subService);
        statTopSubService.innerText = getMostFrequent(subTags);
    } else {
        statTopService.innerText = "-";
        statTopSubService.innerText = "-";
    }
}

function getMostFrequent(arr) {
    const counts = {};
    arr.forEach(val => counts[val] = (counts[val] || 0) + 1);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

function clearFilters() {
    searchInput.value = '';
    filterDate.value = '';
    displayBookings();
}

function deleteBooking(index) {
    if (confirm("Cancel this booking?")) {
        let bookings = JSON.parse(localStorage.getItem('myBookings')) || [];
        bookings.splice(index, 1);
        localStorage.setItem('myBookings', JSON.stringify(bookings));
        displayBookings();
    }
}

// --- 7. Auth Logic ---
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    if (users.find(u => u.email === email)) {
        showAuthError("Email already taken!");
        return;
    }
    users.push({ name, email, password });
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    alert("Signup success! You can login now.");
    toggleAuth('login');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        location.reload();
    } else {
        showAuthError("Wrong email or password!");
    }
});

function logoutUser() {
    localStorage.removeItem('currentUser');
    location.reload();
}

function toggleAuth(type) {
    document.getElementById('login-form-div').classList.toggle('hidden', type === 'signup');
    document.getElementById('signup-form-div').classList.toggle('hidden', type === 'login');
}

function showAuthError(msg) {
    authError.innerText = msg;
    authError.classList.remove('hidden');
}
