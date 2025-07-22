
let cardState = 0;
const card = document.getElementById('card');
const hintText = document.getElementById('hint-text');
const petalsContainer = document.getElementById('petals-container');

/**
 * @param {MouseEvent} e
 */
function createClickParticles(e) {
    const x = e.clientX;
    const y = e.clientY;
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 50 + 50;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        requestAnimationFrame(() => {
            sparkle.style.transform = `translate(${targetX}px, ${targetY}px) scale(0)`;
            sparkle.style.opacity = '0';
        });

        petalsContainer.appendChild(sparkle);
        setTimeout(() => { sparkle.remove(); }, 800);
    }
}

function animateCard(event) {
    createClickParticles(event);
    if (cardState === 2) {
        card.classList.add('is-closing');
    }

    cardState = (cardState + 1) % 3;
    card.classList.remove('leaf-opened', 'flipped-over');

    switch (cardState) {
        case 0:
            hintText.textContent = 'Tap to open the letter 🌸';
            setTimeout(() => { card.classList.remove('is-closing'); }, 1200);
            break;
        case 1:
            card.classList.add('leaf-opened');
            hintText.textContent = 'Tap to flip the card 🌼';
            break;
        case 2:
            card.classList.add('flipped-over');
            hintText.textContent = 'With Love 🌸';
            break;
    }
}

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
    petal.style.animationDelay = (Math.random() * 2) + 's';
    const size = Math.random() * 8 + 6;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petalsContainer.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 10000);
}

// MODIFICAR: Frecuencia con la que aparecen nuevos pétalos (en milisegundos). Menor número = más pétalos.
setInterval(createPetal, 300);
                            