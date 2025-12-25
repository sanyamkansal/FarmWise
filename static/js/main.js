let selectedLanguage = 'en';

window.onload = () => {
    updateInterfaceLanguage();
    // Set dynamic year
    document.getElementById('current-year').innerText = new Date().getFullYear();

    // Check for saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-btn i').classList.replace('fa-moon', 'fa-sun');
    }

    // Initialize file input listener
    const fileInput = document.getElementById("plant-image");
    if (fileInput) {
        fileInput.addEventListener("change", function () {
            const file = this.files[0];
            const preview = document.getElementById("preview");
            if (file) {
                preview.src = URL.createObjectURL(file);
                preview.style.display = "block";
            } else {
                preview.style.display = "none";
            }
        });
    }
};

// Theme Toggle Logic
function toggleTheme() {
    const body = document.body;
    const btnIcon = document.querySelector('.theme-btn i');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if (btnIcon) {
            btnIcon.classList.remove('fa-moon');
            btnIcon.classList.add('fa-sun');
        }
    } else {
        localStorage.setItem('theme', 'light');
        if (btnIcon) {
            btnIcon.classList.remove('fa-sun');
            btnIcon.classList.add('fa-moon');
        }
    }
}

// --- Translations ---
const translations = {
    en: {
        "app-title": "FarmWise",
        "app-subtitle": "AI-Powered Assistant for Indian Farmers",
        "assistant-title": "AI Farm Assistant",
        "welcome-msg": "Namaste! Ask me anything about farming or upload a plant photo.",
        "chat-placeholder": "Type your question...",
        "weather-title": "Local Weather",
        "loading-weather": "Loading weather...",
        "market-title": "Crop Market Price",
        "crop-placeholder": "Crop Name (e.g., Tomato)",
        "state-placeholder": "State Name (e.g., Andhra Pradesh)",
        "check-price-btn": "Check Price",
        "schemes-title": "Government Schemes",
        "load-schemes-btn": "Load Government Schemes",
        "footer-text": "Empowering Farmers with AI."
    },
    hi: {
        "app-title": "फार्मवाइज (FarmWise)",
        "app-subtitle": "भारतीय किसानों के लिए एआई सहायक",
        "assistant-title": "एआई कृषि सहायक",
        "welcome-msg": "नमस्ते! खेती के बारे में कुछ भी पूछें या पौधे की फोटो अपलोड करें।",
        "chat-placeholder": "अपना सवाल टाइप करें...",
        "weather-title": "स्थानीय मौसम",
        "loading-weather": "मौसम लोड हो रहा है...",
        "market-title": "फसल बाजार भाव",
        "crop-placeholder": "फसल का नाम (जैसे: टमाटर)",
        "state-placeholder": "राज्य का नाम (जैसे: उत्तर प्रदेश)",
        "check-price-btn": "भाव देखें",
        "schemes-title": "सरकारी योजनाएं",
        "load-schemes-btn": "योजनाएं लोड करें",
        "footer-text": "एआई के साथ किसानों का सशक्तिकरण।"
    },
    ml: {
        "app-title": "ഫാംവൈസ് (FarmWise)",
        "app-subtitle": "ഇന്ത്യൻ കർഷകർക്കായുള്ള എഐ സഹായി",
        "assistant-title": "എഐ കാർഷിക സഹായി",
        "welcome-msg": "നമസ്കാരം! കൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കാം അല്ലെങ്കിൽ ചെടിയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യാം.",
        "chat-placeholder": "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...",
        "weather-title": "പ്രാദേശിക കാലാവസ്ഥ",
        "loading-weather": "കാലാവസ്ഥ ലഭ്യമാക്കുന്നു...",
        "market-title": "വിള വിപണി വില",
        "crop-placeholder": "വിളയുടെ പേര് (ഉദാ: തക്കാളി)",
        "state-placeholder": "സംസ്ഥാനം (ഉദാ: കേരളം)",
        "check-price-btn": "വില പരിശോധിക്കുക",
        "schemes-title": "സർക്കാർ പദ്ധതികൾ",
        "load-schemes-btn": "പദ്ധതികൾ കാണുക",
        "footer-text": "എഐയിലൂടെ കർഷകരെ ശാക്തീകരിക്കുന്നു."
    },
    ta: {
        "app-title": "பார்ம்வைஸ் (FarmWise)",
        "app-subtitle": "இந்திய விவசாயிகளுக்கான AI உதவியாளர்",
        "assistant-title": "AI விவசாய உதவியாளர்",
        "welcome-msg": "வணக்கம்! விவசாயம் பற்றி எதையும் கேளுங்கள் அல்லது தாவர புகைப்படத்தை பதிவேற்றவும்.",
        "chat-placeholder": "உங்கள் கேள்வியைத் தட்டச்சு செய்க...",
        "weather-title": "உள்ளூர் வானிலை",
        "loading-weather": "வானிலை ஏற்றப்படுகிறது...",
        "market-title": "பயிர் சந்தை விலை",
        "crop-placeholder": "பயிர் பெயர் (எ.கா: தக்காளி)",
        "state-placeholder": "மாநிலம் (எ.கா: தமிழ்நாடு)",
        "check-price-btn": "விலையைச் சரிபார்க்கவும்",
        "schemes-title": "அரசு திட்டங்கள்",
        "load-schemes-btn": "திட்டங்களை ஏற்றவும்",
        "footer-text": "AI மூலம் விவசாயிகளை மேம்படுத்துதல்."
    },
    kn: {
        "app-title": "ಫಾರ್ಮ್‌ವೈಸ್ (FarmWise)",
        "app-subtitle": "ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ಎಐ ಸಹಾಯಕ",
        "assistant-title": "ಎಐ ಕೃಷಿ ಸಹಾಯಕ",
        "welcome-msg": "ನಮಸ್ಕಾರ! ಕೃಷಿಯ ಬಗ್ಗೆ ಏನ್ನಾದರೂ ಕೇಳಿ ಅಥವಾ ಸಸ್ಯದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        "chat-placeholder": "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
        "weather-title": "ಸ್ಥಳೀಯ ಹವಾಮಾನ",
        "loading-weather": "ಹವಾಮಾನ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        "market-title": "ಬೆಳೆ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
        "crop-placeholder": "ಬೆಳೆ ಹೆಸರು (ಉದಾ: ಟೊಮ್ಯಾಟೊ)",
        "state-placeholder": "ರಾಜ್ಯದ ಹೆಸರು (ಉದಾ: ಕರ್ನಾಟಕ)",
        "check-price-btn": "ಬೆಲೆ ಪರಿಶೀಲಿಸಿ",
        "schemes-title": "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
        "load-schemes-btn": "ಯೋಜನೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಿ",
        "footer-text": "ಎಐ ಮೂಲಕ ರೈತರ ಸಬಲೀಕರಣ."
    }
};

// Update Interface with Language
function updateInterfaceLanguage() {
    // If called directly (e.g. onload), sync values
    const mainSel = document.getElementById('global-language');
    const secSel = document.getElementById('assistant-language');

    if (mainSel && secSel) {
        // Default to checking main selector if mismatch, or just ensure consistency
        if (!selectedLanguage) selectedLanguage = mainSel.value;
        mainSel.value = selectedLanguage;
        secSel.value = selectedLanguage;
    } else if (mainSel) {
        selectedLanguage = mainSel.value;
    }

    const t = translations[selectedLanguage] || translations['en'];

    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    // Update Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });

    detectAndFetchWeather();
}

function syncAndSwitchLanguage(sourceElement) {
    selectedLanguage = sourceElement.value;

    // Sync other selectors
    const mainSel = document.getElementById('global-language');
    const secSel = document.getElementById('assistant-language');

    if (mainSel) mainSel.value = selectedLanguage;
    if (secSel) secSel.value = selectedLanguage;

    updateInterfaceLanguage();
}

// --- Custom Toast Notification ---
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return alert(message); // Fallback

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-circle-info';
    if (type === 'error') icon = 'fa-circle-exclamation';
    if (type === 'success') icon = 'fa-circle-check';

    toast.innerHTML = `
        <i class="fa-solid ${icon} toast-icon"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Voice Recognition ---
function recordVoice() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        showToast('Your browser does not support voice recognition. Please use Chrome or Edge.', 'error');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const languageMap = {
        en: 'en-IN', hi: 'hi-IN', ml: 'ml-IN', ta: 'ta-IN', kn: 'kn-IN'
    };

    recognition.lang = languageMap[selectedLanguage] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('text-query').value = transcript;
        showToast("Voice recognized!", "success");
    };

    recognition.onerror = (event) => {
        if (event.error === 'no-speech') {
            showToast("No speech detected. Please try again.", "info");
        } else {
            showToast("Voice recognition error: " + event.error, "error");
        }
    };
}

// --- API Calls ---

async function detectAndFetchWeather() {
    const loader = document.getElementById("weather-loader");
    const output = document.getElementById("weather-output");

    toggleLoader(loader, true);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async pos => {
            const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
            try {
                const res = await fetch("/weather", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ location: coords })
                });
                const data = await res.json();
                toggleLoader(loader, false);

                if (data.error) {
                    output.innerHTML = `<p style="color:var(--error-color);">${data.error}</p>`;
                    return;
                }

                renderWeather(data, output);

            } catch (err) {
                toggleLoader(loader, false);
                output.innerHTML = `<p style="color:var(--error-color);">Error fetching weather.</p>`;
            }
        }, err => {
            toggleLoader(loader, false);
            output.innerHTML = `<p style="color:var(--text-color);">Location access needed for local weather.</p>`;
        });
    } else {
        toggleLoader(loader, false);
        output.innerHTML = `<p style="color:var(--error-color);">Geolocation not supported.</p>`;
    }
}

// --- Modal Logic ---
let weatherDataCache = null;

function openForecastModal() {
    if (!weatherDataCache) return;

    const modal = document.getElementById('forecast-modal');
    const container = document.getElementById('forecast-grid-container');

    // Generate Forecast Cards
    let html = '';
    weatherDataCache.forecast.forEach(day => {
        let icon = 'cloud';
        if (day.condition.toLowerCase().includes('sun')) icon = 'sun';
        else if (day.condition.toLowerCase().includes('rain')) icon = 'cloud-showers-heavy';
        else if (day.condition.toLowerCase().includes('storm')) icon = 'cloud-bolt';

        html += `
        <div class="modal-forecast-card">
            <span class="modal-date">${day.date}</span>
            <span class="modal-icon"><i class="fa-solid fa-${icon}" style="color:var(--primary-color)"></i></span>
            <div class="modal-temp">${day.max_temp}° <span style="color:#94a3b8">/ ${day.min_temp}°</span></div>
            <div class="modal-rain">💧 ${day.rain_chance}%</div>
            <div style="font-size:0.8rem; margin-top:0.4rem; color:#64748b">${day.condition}</div>
        </div>
        `;
    });

    container.innerHTML = html;
    modal.style.display = 'flex';
    // Small delay for CSS transition
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeForecastModal() {
    const modal = document.getElementById('forecast-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close on outside click
window.onclick = function (event) {
    const modal = document.getElementById('forecast-modal');
    if (event.target == modal) {
        closeForecastModal();
    }
}

function renderWeather(data, output) {
    weatherDataCache = data; // Cache for modal
    const cw = data.current_weather;

    // Create Card HTML for Bottom Grid
    let html = `
    <div class="weather-card-inner">
        <div class="weather-main-info">
             <h3>${data.location_name}</h3>
             <div class="temp">${cw.temperature}°</div>
             <div class="cond">${cw.condition}</div>
        </div>
        
        <div class="weather-details-mini-grid">
            <div class="wd-item">💧 ${cw.humidity}%</div>
            <div class="wd-item">💨 ${cw.wind_kph} km/h</div>
            <div class="wd-item">👁️ ${cw.visibility} km</div>
            <div class="wd-item">☀️ UV: ${cw.uv_index}</div>
        </div>
        
        <button onclick="openForecastModal()" style="width:100%; padding:0.6rem; font-size:0.9rem; margin-top:auto;">
            <i class="fa-solid fa-calendar-days"></i> View 3-Day Forecast
        </button>
    </div>
    `;

    output.style.display = 'block';
    output.innerHTML = html;
}

// --- Unified Assistant Logic ---

function handleImageUpload(input) {
    const file = input.files[0];
    const preview = document.getElementById("preview");
    const container = document.getElementById("image-preview-container");

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
        container.style.display = "block";
    }
}

function clearImage() {
    const input = document.getElementById("plant-image");
    const container = document.getElementById("image-preview-container");
    input.value = "";
    container.style.display = "none";
}

async function submitQuery() {
    const textInput = document.getElementById("text-query");
    const imageInput = document.getElementById("plant-image");
    const output = document.getElementById("assistant-output");

    const text = textInput.value.trim();
    const hasImage = imageInput.files.length > 0;

    if (!text && !hasImage) return showToast("Please type a question or upload an image.", "info");

    // Clear input
    textInput.value = "";

    // Add User Bubble
    if (text) addChatBubble(text, 'user');
    else if (hasImage) addChatBubble("📷 [Image Uploaded]", 'user');

    output.scrollTo({ top: output.scrollHeight, behavior: 'smooth' });

    // Show Loader
    const loadingId = addChatBubble("...", 'bot', true);

    try {
        let data;

        if (hasImage) {
            const formData = new FormData();
            formData.append("image", imageInput.files[0]);
            formData.append("language", selectedLanguage);

            const res = await fetch("/identify", { method: "POST", body: formData });
            data = await res.json();

            // Remove loading bubble
            removeChatBubble(loadingId);

            if (data.error) {
                addChatBubble(`❌ ${data.error}`, 'bot');
            } else {
                const color = data.disease_detected ? 'var(--msg-error-bg)' : 'var(--msg-success-bg)';
                const borderColor = data.disease_detected ? 'var(--msg-error-border)' : 'var(--msg-success-border)';

                // Format the advice text (remove asterisks, Handle bold)
                const adviceText = data.treatment_advice || data.message;
                const formattedAdvice = formatMessage(adviceText);

                const msg = `
                    <div style="background: ${color}; border: 1px solid ${borderColor}; padding: 0.8rem; border-radius: 8px;">
                        <h4 style="color: ${borderColor}; margin-bottom: 0.5rem; margin-top:0;">${data.plant_name}</h4>
                        <div style="font-family: inherit; line-height: 1.5;">${formattedAdvice}</div>
                    </div>
                `;
                addChatBubble(msg, 'bot');
            }

            // Reset image
            clearImage();

        } else {
            const res = await fetch("/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: text, language: selectedLanguage })
            });
            data = await res.json();

            removeChatBubble(loadingId);

            if (data.answer) addChatBubble(data.answer, 'bot');
            else addChatBubble(`❌ ${data.error}`, 'bot');
        }
    } catch (e) {
        if (typeof removeChatBubble === "function") removeChatBubble(loadingId);
        addChatBubble("❌ Error connecting to server.", 'bot');
    }
}

// --- TTS Logic ---
let currentUtterance = null;

function formatMessage(text) {
    let html = text;

    // 1. Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 2. Bullets: * followed by space (Handle newlines first to detect start of lines)
    // Replace "* " at very start
    if (html.trim().startsWith('* ')) {
        html = html.trim().replace(/^\* /, '• ');
    }
    // Replace newline + * + space
    html = html.replace(/\n\* /g, '\n• ');

    // 3. Convert newlines to <br> after list processing
    html = html.replace(/\n/g, '<br>');

    return html;
}

function speakText(text, btnId) {
    const btn = document.getElementById(btnId);

    if (window.speechSynthesis.speaking && currentUtterance) {
        window.speechSynthesis.cancel();
        if (currentUtterance === text) {
            // If clicking same button, just stop
            currentUtterance = null;
            document.querySelectorAll('.tts-btn').forEach(b => {
                b.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                b.classList.remove('speaking');
            });
            return;
        }
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Select Voice based on Language
    const voices = window.speechSynthesis.getVoices();
    let langCode = 'en-IN'; // Default
    if (selectedLanguage === 'hi') langCode = 'hi-IN';
    else if (selectedLanguage === 'ml') langCode = 'ml-IN';
    else if (selectedLanguage === 'ta') langCode = 'ta-IN';
    else if (selectedLanguage === 'kn') langCode = 'kn-IN';

    const preferredVoice = voices.find(v => v.lang === langCode) || voices.find(v => v.lang.startsWith(selectedLanguage));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => {
        currentUtterance = text;
        document.querySelectorAll('.tts-btn').forEach(b => {
            b.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            b.classList.remove('speaking');
        });
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-stop"></i>';
            btn.classList.add('speaking');
        }
    };

    utterance.onend = () => {
        currentUtterance = null;
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            btn.classList.remove('speaking');
        }
    };

    window.speechSynthesis.speak(utterance);
}

function addChatBubble(content, sender, isLoading = false) {
    const output = document.getElementById("assistant-output");
    const welcome = output.querySelector('.welcome-message');
    if (welcome) welcome.style.display = 'none';

    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    const uniqueId = "msg-" + Date.now();
    div.id = uniqueId;

    if (isLoading) {
        div.innerHTML = '<i class="fa-solid fa-ellipsis fa-fade"></i> Thinking...';
    } else {
        let finalContent = content;

        // Check if content looks like HTML (from image response) or Text
        if (!content.trim().startsWith('<div')) {
            finalContent = formatMessage(content);
        }

        // Append TTS Button for Bot
        if (sender === 'bot') {
            const rawText = div.innerText || content.replace(/<[^>]*>/g, ''); // Strip HTML for reading
            const ttsBtnId = `tts-${uniqueId}`;
            // Sanitize content for onclick to avoid quote issues
            const safeText = rawText.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, ' ');

            div.innerHTML = `
                <div>${finalContent}</div>
                <button id="${ttsBtnId}" class="tts-btn" onclick="speakText('${safeText}', '${ttsBtnId}')" title="Listen">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            `;
            // Store text data attribute as backup
            setTimeout(() => {
                const btn = document.getElementById(ttsBtnId);
                if (btn) btn.onclick = () => speakText(rawText, ttsBtnId);
            }, 0);

        } else {
            div.innerHTML = finalContent;
        }
    }

    output.appendChild(div);
    output.scrollTo({ top: output.scrollHeight, behavior: 'smooth' });
    return div.id;
}

function removeChatBubble(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// --- Market Price & Schemes ---
async function getCropPrice() {
    const crop = document.getElementById("crop-name").value;
    const state = document.getElementById("state-name").value;
    const output = document.getElementById("market-price-output");

    if (!crop || !state) {
        showToast("Please enter both crop and state name.", "error");
        output.innerHTML = `<p style="color:var(--error-color)">Please enter both crop and state name.</p>`;
        return;
    }

    output.innerHTML = `<div class="loader active"><i class="fa-solid fa-spinner fa-spin"></i> Fetching prices...</div>`;

    try {
        const res = await fetch("/crop_price", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ crop_name: crop, state: state })
        });
        const data = await res.json();

        if (data.error) {
            output.innerHTML = `<p style="color:var(--error-color)">${data.error}</p>`;
        } else {
            if (Array.isArray(data)) {
                if (data.length > 0) {
                    let table = `<table style="width:100%; font-size:0.9rem; margin-top:1rem; border-collapse: collapse;">
                        <tr style="background:#f1f5f9; text-align:left;">
                            <th style="padding:0.5rem;">Market</th>
                            <th style="padding:0.5rem;">Price</th>
                            <th style="padding:0.5rem;">Date</th>
                        </tr>`;
                    data.slice(0, 5).forEach(item => {
                        table += `<tr style="border-bottom:1px solid #e2e8f0;">
                            <td style="padding:0.5rem;">${item.Market}</td>
                            <td style="padding:0.5rem; color:var(--primary-color); font-weight:bold;">₹${item.Price}</td>
                            <td style="padding:0.5rem; color:#64748b;">${item.Date}</td>
                         </tr>`;
                    });
                    table += `</table>`;
                    output.innerHTML = table;
                } else {
                    output.innerHTML = `<p>No data found for this crop in this state.</p>`;
                }
            } else {
                output.innerHTML = `<p>Unexpected response format.</p>`;
            }
        }
    } catch (err) {
        output.innerHTML = `<p style="color:var(--error-color)">Failed to fetch market prices.</p>`;
    }
}

async function getGovernmentSchemes() {
    const output = document.getElementById("schemes-output");
    output.innerHTML = `<div class="loader active"><i class="fa-solid fa-spinner fa-spin"></i> Loading schemes...</div>`;

    try {
        const res = await fetch("/schemes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ language: selectedLanguage })
        });
        const data = await res.json();

        if (data.schemes) {
            let html = `<ul style="margin-top:1rem; padding-left:1rem;">`;
            data.schemes.forEach(scheme => {
                html += `<li style="margin-bottom:0.8rem; padding-bottom:0.8rem; border-bottom:1px solid #f0f0f0;">
                    <strong style="color:var(--primary-color)">${scheme.scheme}</strong><br>
                    <span style="font-size:0.9rem; color:#555;">${scheme.details}</span>
                </li>`;
            });
            html += `</ul>`;
            output.innerHTML = html;
        } else {
            output.innerHTML = `<p>No schemes found.</p>`;
        }

    } catch (err) {
        output.innerHTML = `<p style="color:var(--error-color)">Failed to load schemes.</p>`;
    }
}

function toggleLoader(element, show) {
    if (show) element.classList.add('active');
    else element.classList.remove('active');
}
