/* ================= JAM REAL-TIME ================= */
function updateJam() {
    const jamElement = document.getElementById("jam");

    if (!jamElement) return;

    const now = new Date();
    const jam = String(now.getHours()).padStart(2, "0");
    const menit = String(now.getMinutes()).padStart(2, "0");
    const detik = String(now.getSeconds()).padStart(2, "0");

    jamElement.innerHTML = `${jam}:${menit}:${detik}`;
}

setInterval(updateJam, 1000);
updateJam();

// ================= TIMELINE AOS FLIP =================
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.3
});

timelineItems.forEach(item => {
    observer.observe(item);
});

// ================= AOS ZOOM-OUT-DOWN DI VISI MISI =================
const aosItems = document.querySelectorAll('.aos-zoom-out-down');

const aosObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.3
});

aosItems.forEach(item => {
    aosObserver.observe(item);
});


// untuk halaman daftar.html
const form = document.getElementById("formDaftar");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const nik = document.getElementById("nik").value.trim();
        const tempat = document.getElementById("tempat").value.trim();
        const tanggal = document.getElementById("tanggal").value;
        const jk = document.getElementById("jk").value;
        const alamat = document.getElementById("alamat").value.trim();
        const email = document.getElementById("email").value.trim();
        const hp = document.getElementById("hp").value.trim();
        const prodi = document.getElementById("prodi").value;
        const foto = document.getElementById("foto").value;

        if (
            nama.length < 3 ||
            nik === "" ||
            tempat === "" ||
            tanggal === "" ||
            jk === "" ||
            alamat === "" ||
            !email.includes("@") ||
            isNaN(hp) ||
            hp === "" ||
            prodi === "" ||
            foto === ""
        ) {
            showPopup(
                "error",
                "Gagal",
                "Harap lengkapi semua data dengan benar."
            );
            return;
        }

        showPopup(
            "success",
            "Berhasil",
            "Pendaftaran berhasil dikirim, silakan cek status pada menu Cek Pendaftaran."
        );

        form.reset();
    });
}


/* ================= POPUP FUNCTION ================= */
function showPopup(type, title, message) {
    const overlay = document.getElementById("popupOverlay");
    const box = document.getElementById("popupBox");
    const icon = document.getElementById("popupIcon");

    box.className = "popup-box " + type;
    document.getElementById("popupTitle").innerText = title;
    document.getElementById("popupMessage").innerText = message;

    icon.innerText = type === "success" ? "✔" : "✖";

    overlay.classList.add("show");
}

function closePopup() {
    document.getElementById("popupOverlay").classList.remove("show");
}


// CEK STATUS PENDAFTARAN
document.getElementById("formCek").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("cekEmail").value.trim();
    const nik = document.getElementById("cekNik").value.trim();
    const hasil = document.getElementById("hasil");

    hasil.classList.remove("d-none", "hasil-success", "hasil-error");

    if (email === "" || nik === "") {
        hasil.classList.add("hasil-error");
        hasil.innerHTML = `
            <i>❌</i>
            <strong>Data tidak lengkap</strong><br>
            Silakan isi Email dan NIK dengan benar.
        `;
        return;
    }

    // SIMULASI DATA TERDAFTAR
    if (email.includes("@") && nik.length >= 6) {
        hasil.classList.add("hasil-success");
        hasil.innerHTML = `
            <i>✅</i>
            <strong>Pendaftaran Ditemukan</strong><br>
            Status: <b>Menunggu Verifikasi</b><br>
            Silakan pantau informasi selanjutnya.
        `;
    } else {
        hasil.classList.add("hasil-error");
        hasil.innerHTML = `
            <i>❌</i>
            <strong>Data Tidak Ditemukan</strong><br>
            Pastikan Email dan NIK sesuai saat pendaftaran.
        `;
    }
});


/* ================= CATATAN =================
File ini ditambah:
- Validasi form pendaftaran (daftar.html)
- Cek status pendaftaran (cek-pendaftaran.html)
============================================ */
