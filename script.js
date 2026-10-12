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
    const saldoStatus = document.getElementById('saldo-status');

    const icons = {
        success: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1.93 14.93L6 12.86l1.41-1.41 2.66 2.66 5.66-5.66L17.14 10l-7.07 7.07z" fill="#3fb950"></path></svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#f85149"></path></svg>`
    };

    let selectedCarId = null;
    let purchasedCars = []; // Array untuk menyimpan mobil yang dibeli
    const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    let lastFocusedElement = null;

    function formatCurrency(value) {
        return currencyFormatter.format(value);
    }

    function sanitizeNumberInput(value) {
        return value.replace(/[^0-9]/g, '');
    }

    function parseSaldo(value) {
        const cleaned = sanitizeNumberInput(value);
        if (!cleaned) {
            return null;
        }
        const parsed = Number.parseInt(cleaned, 10);
        return Number.isNaN(parsed) ? null : parsed;
    }

    function setSaldoStatus(message, type = 'default') {
        saldoStatus.textContent = message;
        saldoStatus.classList.remove('is-success', 'is-error');
        if (type === 'success') saldoStatus.classList.add('is-success');
        if (type === 'error') saldoStatus.classList.add('is-error');
    }

    function getFallbackImage() {
        return 'https://placehold.co/600x400/1b2a43/e5edf8?text=Image+Unavailable';
    }

    function createCarImage(src, alt) {
        const image = document.createElement('img');
        image.src = src;
        image.alt = alt;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.addEventListener('error', () => {
            image.src = getFallbackImage();
        }, { once: true });
        return image;
    }

    // Fungsi untuk menampilkan mobil di garasi
    function displayPurchasedCars() {
        purchasedListContainer.innerHTML = ''; // Kosongkan daftar
        if (purchasedCars.length === 0) {
            purchasedListContainer.innerHTML = `<p class="empty-garage-message">Garasi masih kosong. Mobil yang berhasil dibeli akan tampil di sini.</p>`;
            return;
        }

        purchasedCars.forEach(car => {
            const item = document.createElement('div');
            item.classList.add('purchased-car-item');
            const formattedPrice = formatCurrency(car.harga);

            const info = document.createElement('div');
            const title = document.createElement('h4');
            title.textContent = car.nama;
            const price = document.createElement('p');
            price.textContent = `Harga beli: ${formattedPrice}`;
            info.append(title, price);

            item.append(createCarImage(car.gambar, car.nama), info);
            purchasedListContainer.appendChild(item);
        });
    }

    function createConfettiExplosion() {
        const confettiCount = 70;
        const colors = ['#f85149', '#58a6ff', '#3fb950', '#f0f6fc', '#ffcb00'];
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            const angle = Math.random() * 360;
            const distance = Math.random() * Math.min(window.innerWidth * 0.5, 520);
            const transformX = Math.cos(angle * (Math.PI / 180)) * distance;
            const transformY = Math.sin(angle * (Math.PI / 180)) * distance;
            confetti.style.setProperty('--x', `${transformX}px`);
            confetti.style.setProperty('--y', `${transformY}px`);
            confetti.style.setProperty('--r', `${Math.random() * 360}deg`);
            confettiContainer.appendChild(confetti);
            setTimeout(() => { confetti.remove(); }, 1200);
        }
    }

    function displayCars() {
        carListContainer.innerHTML = '';
        for (const key in CARS_AVAILABLE) {
            const car = CARS_AVAILABLE[key];
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');
            carItem.dataset.id = key;
            carItem.setAttribute('role', 'button');
            carItem.setAttribute('tabindex', '0');
            carItem.setAttribute('aria-pressed', 'false');
            const formattedPrice = formatCurrency(car.harga);
            const info = document.createElement('div');
            info.className = 'car-info';
            const title = document.createElement('h3');
            title.textContent = car.nama;
            const price = document.createElement('p');
            price.textContent = formattedPrice;
            info.append(title, price);
            carItem.append(createCarImage(car.gambar, car.nama), info);
            carItem.addEventListener('click', handleCarSelection);
            carItem.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleCarSelection({ currentTarget: carItem });
                }
            });
            carListContainer.appendChild(carItem);
        }
    }

    function handleCarSelection(event) {
        const clickedCar = event.currentTarget;
        if (selectedCarId === clickedCar.dataset.id) {
            selectedCarId = null;
            clickedCar.classList.remove('selected');
            clickedCar.setAttribute('aria-pressed', 'false');
            buyButton.disabled = true;
        } else {
            selectedCarId = clickedCar.dataset.id;
            document.querySelectorAll('.car-item').forEach(item => {
                item.classList.remove('selected');
                item.setAttribute('aria-pressed', 'false');
            });
            clickedCar.classList.add('selected');
            clickedCar.setAttribute('aria-pressed', 'true');
            buyButton.disabled = false;
            setSaldoStatus(`Mobil dipilih: ${CARS_AVAILABLE[selectedCarId].nama}`);
        }
    }

    function showMessage(title, message, type) {
        lastFocusedElement = document.activeElement;
        modalIcon.innerHTML = icons[type] || '';
        modalTitle.textContent = title;
        modalMessage.innerHTML = message;
        modalContent.className = 'modal-content';
        modalContent.classList.add(type);
        modalOverlay.classList.add('show');
        modalOverlay.setAttribute('aria-hidden', 'false');
        modalCloseButton.focus();
    }

    function hideModal() {
        modalOverlay.classList.remove('show');
        modalOverlay.setAttribute('aria-hidden', 'true');
        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    function handleTransaction() {
        if (!selectedCarId) {
            setSaldoStatus('Pilih mobil terlebih dahulu sebelum transaksi.', 'error');
            showMessage('Error', 'Silakan pilih mobil terlebih dahulu.', 'error');
            return;
        }

        const saldo = parseSaldo(saldoInput.value);
        if (saldo === null) {
            saldoInput.setAttribute('aria-invalid', 'true');
            setSaldoStatus('Saldo belum valid. Isi nominal angka yang benar.', 'error');
            showMessage('Error', 'Silakan masukkan jumlah saldo Anda.', 'error');
            return;
        }
        saldoInput.setAttribute('aria-invalid', 'false');

        const selectedCar = CARS_AVAILABLE[selectedCarId];

        if (saldo >= selectedCar.harga) {
            createConfettiExplosion();

            // Tambahkan mobil ke array garasi
            purchasedCars.push(selectedCar);
            // Perbarui tampilan garasi
            displayPurchasedCars();

            const kembalian = saldo - selectedCar.harga;
            const formattedKembalian = formatCurrency(kembalian);
            const successMessage = `Anda telah berhasil membeli <strong>${selectedCar.nama}</strong>.<br>Sisa saldo Anda: <strong>${formattedKembalian}</strong>`;
            showMessage('Transaksi Berhasil!', successMessage, 'success');
            setSaldoStatus(`Transaksi berhasil. Sisa saldo: ${formattedKembalian}`, 'success');

            saldoInput.value = '';
            selectedCarId = null;
            buyButton.disabled = true;
            document.querySelectorAll('.car-item').forEach(item => {
                item.classList.remove('selected');
                item.setAttribute('aria-pressed', 'false');
            });

        } else {
            const kekurangan = selectedCar.harga - saldo;
            const formattedKekurangan = formatCurrency(kekurangan);
            const errorMessage = `Maaf, saldo Anda tidak mencukupi.<br>Kekurangan dana: <strong>${formattedKekurangan}</strong>`;
            showMessage('Transaksi Gagal', errorMessage, 'error');
            setSaldoStatus(`Saldo tidak mencukupi. Kekurangan: ${formattedKekurangan}`, 'error');
        }
    }

    // Event Listeners
    buyButton.addEventListener('click', handleTransaction);
    saldoInput.addEventListener('input', () => {
        const cleaned = sanitizeNumberInput(saldoInput.value);
        if (!cleaned) {
            saldoInput.value = '';
            saldoInput.setAttribute('aria-invalid', 'false');
            setSaldoStatus('Saldo belum diisi.');
            return;
        }

        const numericValue = Number.parseInt(cleaned, 10);
        if (Number.isNaN(numericValue)) {
            saldoInput.setAttribute('aria-invalid', 'true');
            setSaldoStatus('Input saldo tidak valid.', 'error');
            return;
        }

        saldoInput.value = new Intl.NumberFormat('id-ID').format(numericValue);
        saldoInput.setAttribute('aria-invalid', 'false');
        setSaldoStatus(`Saldo terdeteksi: ${formatCurrency(numericValue)}`, 'success');
    });
    saldoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleTransaction();
        }
    });
    modalCloseButton.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) { hideModal(); }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('show')) {
            hideModal();
        }
    });

    // Inisialisasi awal
    buyButton.disabled = true;
    displayCars();
    displayPurchasedCars(); // Tampilkan garasi (awalnya kosong)
});
