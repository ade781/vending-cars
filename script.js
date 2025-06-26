// --- File JavaScript (script.js) ---

document.addEventListener('DOMContentLoaded', () => {

    const CARS_AVAILABLE = {
        '1': { nama: 'City Car Listrik', harga: 450000000, gambar: 'https://autonetmagz.com/wp-content/uploads/2018/08/Sono_Sion_thumbnail-860x474.jpg' },
        '2': { nama: 'Sedan Klasik', harga: 500000000, gambar: 'https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2023/07/2001-bmw-nm5.jpg' },
        '3': { nama: 'Pickup 4x4 Diesel', harga: 650000000, gambar: 'https://i.pinimg.com/736x/69/19/8f/69198f901df23c686d221a26e0fc377d.jpg' },
        '4': { nama: 'SUV Keluarga 7-Seater', harga: 750000000, gambar: 'https://cdn.antaranews.com/cache/1200x800/2024/02/03/587931-premieres-images-du-gmc-acadia-2024.jpg' },
        '5': { nama: 'MPV Premium Hybrid', harga: 900000000, gambar: 'https://medias.auto2000.co.id/sys-master-hybrismedia/ha0/h8b/8843010408478/Thumbnail_Silver-metalicq2re.png' },
        '6': { nama: 'Mobil Sport Turbo V6', harga: 1200000000, gambar: 'https://www.toyota.astra.co.id/sites/default/files/2021-08/TC_32_JULI_-_SEJARAH_TOYOTA_GR_SUPRA_%28UMUM%29-min.jpeg' },
        '7': { nama: 'Supercar V12', harga: 55000000000, gambar: 'https://cdn1-production-images-kly.akamaized.net/2hd4B6pKgY_DxLQrURBeewkppOQ=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1112088/original/005450200_1452840450-15012016-mobilpisang.jpg' },
        '8': { nama: 'Rubicon Mario Dandy', harga: 100000, gambar: 'https://awsimages.detik.net.id/community/media/visual/2023/02/24/mario-dandy-satrio_169.jpeg?w=1200' },
        '9': { nama: 'Mobil Balap Bekas Need for Speed', harga: 999999999, gambar: 'https://www.gtplanet.net/forum/attachments/1588245880212-png.890129/' },
        '10': { nama: 'Angkot Legendaris Cipaganti', harga: 30000, gambar: 'https://cimanggubogor.com/wp-content/uploads/2023/10/foto-didalam-angkot-750x400.jpg' },
        '11': { nama: 'Mobil Google Street View', harga: 2000000000, gambar: 'https://akcdn.detik.net.id/visual/2023/06/12/mobil-google_169.webp?w=1200' },
        '12': { nama: 'Odong-Odong Full LED', harga: 50000, gambar: 'https://down-id.img.susercontent.com/file/51462ecb717572064c9fd45fae280993' }
    };


    // Elemen DOM
    const carListContainer = document.getElementById('car-list');
    const saldoInput = document.getElementById('saldo-input');
    const buyButton = document.getElementById('buy-button');
    const modalOverlay = document.getElementById('message-modal');
    const modalContent = document.getElementById('modal-content');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseButton = document.getElementById('modal-close-button');
    const confettiContainer = document.getElementById('confetti-container');
    const purchasedListContainer = document.getElementById('purchased-list-container');

    const icons = {
        success: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1.93 14.93L6 12.86l1.41-1.41 2.66 2.66 5.66-5.66L17.14 10l-7.07 7.07z" fill="#3fb950"></path></svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#f85149"></path></svg>`
    };

    let selectedCarId = null;
    let purchasedCars = []; // Array untuk menyimpan mobil yang dibeli

    // Fungsi untuk menampilkan mobil di garasi
    function displayPurchasedCars() {
        purchasedListContainer.innerHTML = ''; // Kosongkan daftar
        if (purchasedCars.length === 0) {
            purchasedListContainer.innerHTML = `<p class="empty-garage-message">Garasi masih kosong.</p>`;
            return;
        }

        purchasedCars.forEach(car => {
            const item = document.createElement('div');
            item.classList.add('purchased-car-item');
            item.innerHTML = `
                <img src="${car.gambar}" alt="${car.nama}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/161b22/f0f6fc?text=Image+Error';">
                <h4>${car.nama}</h4>
            `;
            purchasedListContainer.appendChild(item);
        });
    }

    function createConfettiExplosion() {
        const confettiCount = 100;
        const colors = ['#f85149', '#58a6ff', '#3fb950', '#f0f6fc', '#ffcb00'];
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `50%`;
            confetti.style.top = `50%`;
            const angle = Math.random() * 360;
            const distance = Math.random() * (window.innerWidth / 2);
            const transformX = Math.cos(angle * (Math.PI / 180)) * distance;
            const transformY = Math.sin(angle * (Math.PI / 180)) * distance;
            const existingKeyframes = `@keyframes confetti-explosion-${i} { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(${transformX}px, ${transformY}px) scale(0); opacity: 0; } }`;
            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(existingKeyframes, styleSheet.cssRules.length);
            confetti.style.animation = `confetti-explosion-${i} 2s ease-out forwards`;
            confettiContainer.appendChild(confetti);
            setTimeout(() => { confetti.remove(); }, 2000);
        }
    }

    function displayCars() {
        carListContainer.innerHTML = '';
        for (const key in CARS_AVAILABLE) {
            const car = CARS_AVAILABLE[key];
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');
            carItem.dataset.id = key;
            const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(car.harga);
            carItem.innerHTML = `<img src="${car.gambar}" alt="${car.nama}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/161b22/f0f6fc?text=Image+Error';"><div class="car-info"><h3>${car.nama}</h3><p>${formattedPrice}</p></div>`;
            carItem.addEventListener('click', handleCarSelection);
            carListContainer.appendChild(carItem);
        }
    }

    function handleCarSelection(event) {
        const clickedCar = event.currentTarget;
        if (selectedCarId === clickedCar.dataset.id) {
            selectedCarId = null;
            clickedCar.classList.remove('selected');
        } else {
            selectedCarId = clickedCar.dataset.id;
            document.querySelectorAll('.car-item').forEach(item => item.classList.remove('selected'));
            clickedCar.classList.add('selected');
        }
    }

    function showMessage(title, message, type) {
        modalIcon.innerHTML = icons[type] || '';
        modalTitle.textContent = title;
        modalMessage.innerHTML = message;
        modalContent.className = 'modal-content';
        modalContent.classList.add(type);
        modalOverlay.style.display = 'flex';
        setTimeout(() => modalOverlay.classList.add('show'), 10);
    }

    function hideModal() {
        modalOverlay.classList.remove('show');
        setTimeout(() => { modalOverlay.style.display = 'none'; }, 400);
    }

    function handleTransaction() {
        if (!selectedCarId) {
            showMessage('Error', 'Silakan pilih mobil terlebih dahulu.', 'error');
            return;
        }

        const saldoStr = saldoInput.value.replace(/[^0-9]/g, '');
        if (saldoStr === '') {
            showMessage('Error', 'Silakan masukkan jumlah saldo Anda.', 'error');
            return;
        }

        const saldo = parseInt(saldoStr, 10);
        if (isNaN(saldo)) {
            showMessage('Error', 'Input saldo tidak valid. Harap masukkan angka.', 'error');
            return;
        }

        const selectedCar = CARS_AVAILABLE[selectedCarId];

        if (saldo >= selectedCar.harga) {
            createConfettiExplosion();

            // Tambahkan mobil ke array garasi
            purchasedCars.push(selectedCar);
            // Perbarui tampilan garasi
            displayPurchasedCars();

            const kembalian = saldo - selectedCar.harga;
            const formattedKembalian = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(kembalian);
            const successMessage = `Anda telah berhasil membeli <strong>${selectedCar.nama}</strong>.<br>Sisa saldo Anda: <strong>${formattedKembalian}</strong>`;
            showMessage('Transaksi Berhasil!', successMessage, 'success');

            saldoInput.value = '';
            selectedCarId = null;
            document.querySelectorAll('.car-item').forEach(item => item.classList.remove('selected'));

        } else {
            const kekurangan = selectedCar.harga - saldo;
            const formattedKekurangan = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(kekurangan);
            const errorMessage = `Maaf, saldo Anda tidak mencukupi.<br>Kekurangan dana: <strong>${formattedKekurangan}</strong>`;
            showMessage('Transaksi Gagal', errorMessage, 'error');
        }
    }

    // Event Listeners
    buyButton.addEventListener('click', handleTransaction);
    modalCloseButton.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) { hideModal(); }
    });

    // Inisialisasi awal
    displayCars();
    displayPurchasedCars(); // Tampilkan garasi (awalnya kosong)
});
