
      // DATA BUKU dengan stok
      let books = [
        {
          title: "Harry Potter",
          author: "JK Rowling",
          genre: "Fantasi",
          category: "novel",
          image: "gambar/hp-1.jpg",
          stok: 5,
          dipinjam: 0,
        },
        {
          title: "5 CM",
          author: "Donny Dhirgantoro",
          genre: "Fiksi",
          category: "novel",
          image: "gambar/nv-2.jpeg",
          stok: 3,
          dipinjam: 0,
        },
        {
          title: "Mariposa",
          author: "Luluk HF",
          genre: "Romantis Komedi",
          category: "novel",
          image: "gambar/nv-3.jpeg",
          stok: 4,
          dipinjam: 0,
        },
        {
          title: "Hanya Imanjinasi",
          author: "Naomi Lesmana",
          genre: "Fantasi, Fiksi",
          category: "cerpen",
          image: "gambar/cp-3.jpeg",
          stok: 6,
          dipinjam: 0,
        },
        {
          title: "Menyerah Bukan Pilihan",
          author: "Dwi Fitriawati",
          genre: "Fiksi",
          category: "cerpen",
          image: "gambar/cp-1.jpeg",
          stok: 3,
          dipinjam: 0,
        },
        {
          title: "Di Tengah Kegelapan Inuvik",
          author: "Sori Siregar",
          genre: "Sastra",
          category: "cerpen",
          image: "gambar/cp-2.jpeg",
          stok: 2,
          dipinjam: 0,
        },
        {
          title: "Biologi SMA Kelas 11",
          author: "Irnaningtya & Yossa Istiadi",
          genre: "Pelajaran",
          category: "pelajaran",
          image: "gambar/mp-1.jpeg",
          stok: 10,
          dipinjam: 0,
        },
        {
          title: "Ekonomi SMA Kelas 12",
          author: "Kinanti Geminastiti & Nella Nurlita",
          genre: "Pelajaran",
          category: "pelajaran",
          image: "gambar/mp-3.jpeg",
          stok: 8,
          dipinjam: 0,
        },
        {
          title: "Matematika SMA Kelas 10",
          author: "Yogi Anggraena, Wikan Budi Utama & Munadi",
          genre: "Pelajaran",
          category: "pelajaran",
          image: "gambar/mp-2.jpeg",
          stok: 12,
          dipinjam: 0,
        },
      ];

      // Data peminjaman aktif
      let activeBorrowings = [];

      // Data riwayat pengembalian
      let returnHistory = [];

      // Toggle Sidebar
      function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        const header = document.getElementById("header");
        const content = document.getElementById("content");

        sidebar.classList.toggle("hidden");

        if (sidebar.classList.contains("hidden")) {
          header.classList.remove("with-sidebar");
          content.classList.add("full-width");
        } else {
          header.classList.add("with-sidebar");
          content.classList.remove("full-width");
        }
      }

      // Show Page
      function showPage(pageId) {
        const pages = document.querySelectorAll(".page");
        pages.forEach((page) => page.classList.remove("active"));
        document.getElementById(pageId).classList.add("active");

        // Update data saat membuka halaman tertentu
        if (pageId === "report") {
          updateReportTable();
        } else if (pageId === "borrow") {
          updateActiveBorrowingsList();
        } else if (pageId === "return") {
          updateReturnBookOptions();
        } else if (pageId === "books") {
          displayBooks(books);
        }
      }

      // Login Validation
      function validateLogin(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (username === "admin" && password === "123") {
          alert("Login berhasil!");
          showPage("home");
        } else {
          alert("Username atau password salah!");
        }
      }

      // Display Books dengan info stok
      function displayBooks(list) {
        const grid = document.getElementById("bookGrid");
        grid.innerHTML = "";

        if (list.length === 0) {
          grid.innerHTML = "<p><i>Tidak ada buku untuk kategori ini.</i></p>";
          return;
        }

        list.forEach((b) => {
          const stokTersedia = b.stok - b.dipinjam;
          const statusClass = stokTersedia > 0 ? "tersedia" : "habis";
          const statusText =
            stokTersedia > 0 ? `Tersedia: ${stokTersedia}` : "Stok Habis";

          grid.innerHTML += `
            <div class="book ${b.category}">
              <img src="${b.image}" alt="${b.title}">
              <h3>${b.title}</h3>
              <p>Penulis: ${b.author}</p>
              <p>Genre: ${b.genre}</p>
              <div class="stok-info ${statusClass}">${statusText}</div>
            </div>
          `;
        });
      }

      // Filter By Category
      function filterByCategory() {
        const cat = document.getElementById("category").value;
        const filtered =
          cat === "all" ? books : books.filter((b) => b.category === cat);
        displayBooks(filtered);
      }

      // Search Books
      function searchBooks() {
        const query = document.getElementById("search").value.toLowerCase();
        const cat = document.getElementById("category").value;

        const filtered = books.filter(
          (b) =>
            (cat === "all" || b.category === cat) &&
            b.title.toLowerCase().includes(query)
        );

        displayBooks(filtered);
      }

      // Update Book Options berdasarkan kategori yang dipilih
      function updateBookOptions() {
        const selectedCategory = document.querySelector(
          'input[name="jenis"]:checked'
        ).value;
        const judulSelect = document.getElementById("judul");

        judulSelect.innerHTML = '<option value="">-- Pilih Buku --</option>';

        const filteredBooks = books.filter(
          (b) => b.category === selectedCategory
        );

        filteredBooks.forEach((book) => {
          const stokTersedia = book.stok - book.dipinjam;
          if (stokTersedia > 0) {
            const option = document.createElement("option");
            option.value = book.title;
            option.textContent = `${book.title} (Stok: ${stokTersedia})`;
            judulSelect.appendChild(option);
          }
        });

        updatePreview();
      }

      // Update Preview
      function updatePreview() {
        document.getElementById("pNama").textContent =
          document.getElementById("nama").value || "-";
        document.getElementById("pEmail").textContent =
          document.getElementById("email").value || "-";
        document.getElementById("pJudul").textContent =
          document.getElementById("judul").value || "-";
        document.getElementById("pTanggal").textContent =
          document.getElementById("tanggal").value || "-";

        let jenis = document.querySelector("input[name='jenis']:checked");
        const jenisText = jenis
          ? jenis.value.charAt(0).toUpperCase() + jenis.value.slice(1)
          : "-";
        document.getElementById("pJenis").textContent = jenisText;
      }

      function resetPreview() {
        setTimeout(() => {
          document.getElementById("pNama").textContent = "-";
          document.getElementById("pEmail").textContent = "-";
          document.getElementById("pJenis").textContent = "Novel";
          document.getElementById("pJudul").textContent = "-";
          document.getElementById("pTanggal").textContent = "-";
          updateBookOptions();
        }, 10);
      }

      // Kirim Data Peminjaman
      function kirimData() {
        const nama = document.getElementById("nama").value;
        const email = document.getElementById("email").value;
        const judul = document.getElementById("judul").value;
        const tanggal = document.getElementById("tanggal").value;
        const jenis = document.querySelector(
          "input[name='jenis']:checked"
        ).value;

        if (!nama || !email || !judul || !tanggal) {
          alert("Mohon lengkapi semua data!");
          return;
        }

        // Cari buku yang dipinjam
        const book = books.find((b) => b.title === judul);

        if (!book) {
          alert("Buku tidak ditemukan!");
          return;
        }

        const stokTersedia = book.stok - book.dipinjam;

        if (stokTersedia <= 0) {
          alert("Maaf, stok buku habis!");
          return;
        }

        // Update stok dipinjam
        book.dipinjam++;

        // Tambah ke daftar peminjaman aktif
        activeBorrowings.push({
          nama: nama,
          email: email,
          judul: judul,
          kategori: jenis,
          tanggalPinjam: tanggal,
          id: Date.now(),
        });

        alert(
          `Peminjaman berhasil!\n\nBuku: ${judul}\nPeminjam: ${nama}\nStok tersisa: ${
            book.stok - book.dipinjam
          }`
        );

        // Reset form
        document.getElementById("formPinjam").reset();
        resetPreview();
        updateBookOptions();
        updateActiveBorrowingsList();
        updateReportTable();
        displayBooks(books);
      }

      // Update daftar peminjaman aktif
      function updateActiveBorrowingsList() {
        const container = document.getElementById("activeBorrowings");

        if (activeBorrowings.length === 0) {
          container.innerHTML = "<p><i>Belum ada peminjaman aktif</i></p>";
          return;
        }

        container.innerHTML = "";
        activeBorrowings.forEach((borrowing) => {
          const div = document.createElement("div");
          div.className = "peminjaman-item";
          div.innerHTML = `
            <strong>${borrowing.judul}</strong><br>
            Peminjam: ${borrowing.nama}<br>
            Email: ${borrowing.email}<br>
            Tanggal Pinjam: ${borrowing.tanggalPinjam}
          `;
          container.appendChild(div);
        });
      }

      // Update opsi buku untuk pengembalian
      function updateReturnBookOptions() {
        const select = document.getElementById("returnBook");
        select.innerHTML = '<option value="">-- Pilih Buku --</option>';

        if (activeBorrowings.length === 0) {
          const option = document.createElement("option");
          option.value = "";
          option.textContent = "Tidak ada buku yang dipinjam";
          option.disabled = true;
          select.appendChild(option);
          return;
        }

        activeBorrowings.forEach((borrowing) => {
          const option = document.createElement("option");
          option.value = borrowing.id;
          option.textContent = `${borrowing.judul} - ${borrowing.nama}`;
          select.appendChild(option);
        });
      }

      // Submit Return
      function submitReturn(event) {
        event.preventDefault();

        const borrowingId = parseInt(
          document.getElementById("returnBook").value
        );
        const returnName = document.getElementById("returnName").value;

        if (!borrowingId) {
          alert("Pilih buku yang akan dikembalikan!");
          return;
        }

        // Cari data peminjaman
        const borrowingIndex = activeBorrowings.findIndex(
          (b) => b.id === borrowingId
        );

        if (borrowingIndex === -1) {
          alert("Data peminjaman tidak ditemukan!");
          return;
        }

        const borrowing = activeBorrowings[borrowingIndex];

        // Validasi nama
        if (returnName.toLowerCase() !== borrowing.nama.toLowerCase()) {
          alert("Nama peminjam tidak sesuai!");
          return;
        }

        // Cari buku dan update stok
        const book = books.find((b) => b.title === borrowing.judul);
        if (book) {
          book.dipinjam--;
        }


        // Tambah ke riwayat pengembalian
        returnHistory.push({
        nama: borrowing.nama,
        judul: borrowing.judul,
        tanggalPinjam: borrowing.tanggalPinjam,
        tanggalKembali: new Date().toISOString().split("T")[0],
       });

        // Hapus dari daftar peminjaman aktif
        activeBorrowings.splice(borrowingIndex, 1);

        // Update tampilan
        updateReturnHistory();
        updateReturnBookOptions();
        updateReportTable();
        displayBooks(books);
        updateActiveBorrowingsList();

       alert(`Pengembalian berhasil!\n\nBuku: ${borrowing.judul}\nPeminjam: ${borrowing.nama}`);

        // Reset form
        document.getElementById("returnName").value = "";
        document.getElementById("returnBook").value = "";
      }

      // Update riwayat pengembalian
      function updateReturnHistory() {
        const tbody = document.getElementById("returnHistory");

        if (returnHistory.length === 0) {
          tbody.innerHTML =
            '<tr><td colspan="5" style="text-align: center;">Belum ada pengembalian</td></tr>';
          return;
        }

        tbody.innerHTML = "";
        returnHistory.forEach((record) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${record.nama}</td>
          <td>${record.judul}</td>
          <td>${record.tanggalPinjam}</td>
          <td>${record.tanggalKembali}</td>
          `;
          tbody.appendChild(row);
        });
      }

      // Update tabel laporan
      function updateReportTable() {
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        books.forEach((book) => {
          const row = document.createElement("tr");
          const stokTersedia = book.stok - book.dipinjam;
          const statusClass = stokTersedia > 0 ? "stok-tersedia" : "stok-habis";
          const statusText = stokTersedia > 0 ? "Tersedia" : "Habis";

          row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.category.toUpperCase()}</td>
            <td>${book.author}</td>
            <td>${stokTersedia}</td>
            <td>${book.dipinjam}</td>
            <td>${book.stok}</td>
            <td class="${statusClass}">${statusText}</td>
          `;
          tableBody.appendChild(row);
        });
      }

      // Initialize saat DOM ready
      document.addEventListener("DOMContentLoaded", () => {
        // Display books
        displayBooks(books);

        // Update book options pertama kali
        updateBookOptions();

        // Load report data
        updateReportTable();

        // Form preview listeners
        document
          .querySelectorAll("#formPinjam input, #formPinjam select")
          .forEach((input) => {
            input.addEventListener("input", updatePreview);
            input.addEventListener("change", updatePreview);
          });

        // Set tanggal hari ini sebagai default
        const today = new Date().toISOString().split("T")[0];
        document.getElementById("tanggal").value = today;
        updatePreview();
      });
