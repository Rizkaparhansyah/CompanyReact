-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Apr 2023 pada 05.01
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pedumas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `masyarakat`
--

CREATE TABLE `masyarakat` (
  `nik` varchar(255) NOT NULL,
  `nama_awal` varchar(35) NOT NULL,
  `nama_akhir` varchar(35) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  `telp` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `masyarakat`
--

INSERT INTO `masyarakat` (`nik`, `nama_awal`, `nama_akhir`, `username`, `password`, `telp`) VALUES
('321144567830343', 'Hafidz', 'Fauzan', 'hafidz', '29bca9f62e4af2306bcf9bc406ade0c4', '0829291331245'),
('3213200402212494', 'Fajar', 'RM', 'fajar', '24bc50d85ad8fa9cda686145cf1f8aca', '082382828323'),
('32140038930205822', 'Ary', 'Permadi', 'ary', '9ac7ff63ea6f3d3607d20f6f4e900547', '0812232322834');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengaduan`
--

CREATE TABLE `pengaduan` (
  `id_pengaduan` int(11) NOT NULL,
  `tgl` varchar(40) NOT NULL,
  `nama` varchar(35) NOT NULL,
  `nik` varchar(30) NOT NULL,
  `isi_laporan` text NOT NULL,
  `foto` varchar(355) NOT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pengaduan`
--

INSERT INTO `pengaduan` (`id_pengaduan`, `tgl`, `nama`, `nik`, `isi_laporan`, `foto`, `status`) VALUES
(49, 'Fri, 31-03-2023 (21:04:38)', 'Fajar RM', '3213200402212494', 'Fri, 31-03-2023 (21:04:38)', '../assets/image/code.png', 'SELESAI'),
(50, 'Fri, 31-03-2023 (21:09:41)', 'Fajar RM', '3213200402212494', 'Fri, 31-03-2023 (21:09:41)', '../assets/image/code.png', 'SELESAI'),
(51, 'Fri, 31-03-2023 (21:12:18)', 'Fajar RM', '3213200402212494', 'Fri, 31-03-2023 (21:12:18)', '../assets/image/ktp.jpeg', 'SELESAI');

-- --------------------------------------------------------

--
-- Struktur dari tabel `petugas`
--

CREATE TABLE `petugas` (
  `id_petugas` int(11) NOT NULL,
  `nama_petugas` varchar(35) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  `telp` varchar(35) NOT NULL,
  `level` enum('Admin','Petugas') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `petugas`
--

INSERT INTO `petugas` (`id_petugas`, `nama_petugas`, `username`, `password`, `telp`, `level`) VALUES
(7, 'Pak RT', 'petugas', 'afb91ef692fd08c445e8cb1bab2ccf9c', '08282854329', 'Petugas'),
(8, 'Pak Dadang', 'padad', '88e6220f7b89cf4a7b0f9f09828c2744', '081239302384', 'Petugas'),
(9, 'Rizka Parhansyah', 'admin', '21232f297a57a5a743894a0e4a801fc3', '081909618834', 'Admin'),
(15, 'TEST', 'test', '202cb962ac59075b964b07152d234b70', '123', 'Petugas'),
(16, 'dasd', 'das', '202cb962ac59075b964b07152d234b70', '231', 'Petugas');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tanggapan`
--

CREATE TABLE `tanggapan` (
  `id_tanggapan` int(11) NOT NULL,
  `id_pengaduan` int(11) NOT NULL,
  `tgl_tanggapan` varchar(35) NOT NULL,
  `tanggapan` text NOT NULL,
  `id_petugas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tanggapan`
--

INSERT INTO `tanggapan` (`id_tanggapan`, `id_pengaduan`, `tgl_tanggapan`, `tanggapan`, `id_petugas`) VALUES
(7, 45, '30-03-2023', 'Oh itu saya sudah tau, Terimakasih!', 9),
(8, 46, '31-03-2023', 'oke', 9),
(9, 49, '31-03-2023', 'oke', 9),
(10, 49, '31-03-2023', 'test', 9),
(11, 49, '31-03-2023', 'sdsad', 9),
(12, 49, '31-03-2023', 'sdasda', 9),
(13, 50, '31-03-2023', 'sdasdasda', 9),
(14, 51, '31-03-2023', 'testttttt', 9);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `masyarakat`
--
ALTER TABLE `masyarakat`
  ADD PRIMARY KEY (`nik`);

--
-- Indeks untuk tabel `pengaduan`
--
ALTER TABLE `pengaduan`
  ADD PRIMARY KEY (`id_pengaduan`);

--
-- Indeks untuk tabel `petugas`
--
ALTER TABLE `petugas`
  ADD PRIMARY KEY (`id_petugas`);

--
-- Indeks untuk tabel `tanggapan`
--
ALTER TABLE `tanggapan`
  ADD PRIMARY KEY (`id_tanggapan`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `pengaduan`
--
ALTER TABLE `pengaduan`
  MODIFY `id_pengaduan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT untuk tabel `petugas`
--
ALTER TABLE `petugas`
  MODIFY `id_petugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `tanggapan`
--
ALTER TABLE `tanggapan`
  MODIFY `id_tanggapan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
