let siBtnSize = 1;
let noClickCount = 0;
let currentHeartIndex = 0;

// Array of heart images in sequence
const heartImages = [
    'img/corazon1.png',
    'img/corazon2.png',
    'img/corazon3.png',
    'img/corazonK.O.png'
];

document.addEventListener('DOMContentLoaded', function() {
    const noBtn = document.getElementById('no-btn');
    const siBtn = document.getElementById('si-btn');
    const heartImg = document.getElementById('heart-img');
    
    if (noBtn && siBtn) {
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Increment click counter
            noClickCount++;
            
            // Cycle through heart images
            if (heartImg && currentHeartIndex < heartImages.length - 1) {
                currentHeartIndex++;
                heartImg.src = heartImages[currentHeartIndex];
            }
            
            // Increase the size of the "Sí" button
            siBtnSize += 0.3;
            siBtn.style.transform = `scale(${siBtnSize})`;
            
            // Change button text based on clicks
            const texts = [
                '¿Estás segura? 🤔',
                'Piénsalo bien... 😢',
                'Por favor... 🥺',
                'No me hagas esto 😭',
                '¡Última oportunidad! 💔',
                '¡Dale que sí! 🥰',
                '¡Por favor di que sí! 💝',
                '¡Te lo ruego! 💕',
                '¡Sí es la única opción! ❤️',
                '¡Eso es un gancho al corazon! 💖'
            ];
            
            if (noClickCount <= texts.length) {
                noBtn.textContent = texts[noClickCount - 1] || '¡DI QUE SÍ! 💖';
            } else {
                noBtn.textContent = '¡DI QUE SÍ! 💖';
            }
            
            // Make the "No" button smaller
            const noBtnScale = Math.max(0.5, 1 - (noClickCount * 0.1));
            noBtn.style.transform = `scale(${noBtnScale})`;
            
            // Add shake animation to "Sí" button
            siBtn.style.animation = 'none';
            setTimeout(() => {
                siBtn.style.animation = 'heartbeat 0.5s ease-in-out 3';
            }, 10);
        });
    }
    
    // Handle "Sí" button click to show winning heart
    if (siBtn) {
        siBtn.addEventListener('click', function(e) {
            if (heartImg) {
                heartImg.src = 'img/CorazonWin.png';
            }
        });
    }
    // --- Lluvia de corazones ---
    const heartsContainer = document.getElementById("hearts-container");

    // Si existe el contenedor, activamos la lluvia
    if (heartsContainer) {
        const hearts = ["💖","💘","💝","💗","💓","💕"];

        function rand(min, max) {
            return Math.random() * (max - min) + min;
        }

        function createHeart() {
            const heart = document.createElement("div");
            heart.className = "heart-particle";
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            const startX = rand(0, window.innerWidth);
            const size = rand(14, 34);            // tamaño
            const duration = rand(6, 14);         // velocidad de caída
            const drift = rand(-120, 120) + "px"; // se mueve a los lados
            const rot = rand(-360, 360) + "deg";  // rotación

            heart.style.left = startX + "px";
            heart.style.fontSize = size + "px";
            heart.style.animationDuration = duration + "s";
            heart.style.setProperty("--drift", drift);
            heart.style.setProperty("--rot", rot);

            heartsContainer.appendChild(heart);
            heart.addEventListener("animationend", () => heart.remove());
        }

        setInterval(createHeart, 250); // menos = más corazones, más = menos
    }
});

