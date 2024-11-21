"use client";

import useSWR from "swr";
import TableHead from "./table-head";
import TableBody from "./table-body";
import { getToken } from "@/lib/auth";
import { SkeletonTable } from "./skeleton-table";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Pagination from "./pagenation";
import { ShowButton, EditButton, DeleteButton } from "./ActionButtons";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_REAL = process.env.NEXT_PUBLIC_API_URL2;

const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

export default function Table() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Tentukan endpoint berdasarkan path
  let endpoint;
  if (pathname === "/admin/artikel/artikel") {
    endpoint = "/admin/articles";
  } else if (pathname === "/admin/artikel/kategori-artikel") {
    endpoint = "/article/categories";
  } else if (pathname === "/admin/pengguna/umum") {
    endpoint = "/admin/users";
  } else {
    endpoint = null;
  }

  // Ambil data dari backend
  const { data, error } = useSWR(
    endpoint ? `${API_URL}${endpoint}` : null,
    fetcher
  );

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <SkeletonTable />;

  // Pagination manual: potong data berdasarkan halaman saat ini
  const paginatedData = data.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.data.length / itemsPerPage);

  const tableHead =
    pathname === "/admin/artikel/artikel"
      ? ["No", "Judul Artikel", "Gambar", "Tindakan"]
      : pathname === "/admin/artikel/kategori-artikel"
      ? ["No", "Nama Kategori", "Tindakan"]
      : pathname === "/admin/pengguna/umum"
      ? [
          "No",
          "Nama Pengguna",
          "Nomor Telepon",
          "Tanggal Lahir",
          "Gender",
          "Foto Profil",
          "Tindakan",
        ]
      : [];

  const columns =
    pathname === "/admin/artikel/artikel"
      ? [
          {
            key: "index",
            render: (_, __, index) =>
              (currentPage - 1) * itemsPerPage + index + 1,
          },
          { key: "article_title" },
          {
            key: "article_img",
            render: (img) => (
              <Image
                src={`${API_REAL}/${img}`}
                alt="Artikel"
                width={200}
                height={200}
                className="w-20 h-12 object-cover rounded"
              />
            ),
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton onClick={() => console.log("Show clicked", row)} />
                <EditButton onClick={() => console.log("Edit clicked", row)} />
                <DeleteButton
                  onClick={() => console.log("Delete clicked", row)}
                />
              </div>
            ),
          },
        ]
      : pathname === "/admin/artikel/kategori-artikel"
      ? [
          {
            key: "index",
            render: (_, __, index) =>
              (currentPage - 1) * itemsPerPage + index + 1,
          },
          { key: "name", render: (name) => <span>{name}</span> },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton onClick={() => console.log("Show clicked", row)} />
                <EditButton onClick={() => console.log("Edit clicked", row)} />
                <DeleteButton
                  onClick={() => console.log("Delete clicked", row)}
                />
              </div>
            ),
          },
        ]
      : pathname === "/admin/pengguna/umum"
      ? [
          {
            key: "index",
            render: (_, __, index) =>
              (currentPage - 1) * itemsPerPage + index + 1,
          },
          { key: "name" },
          { key: "phone_number" },
          { key: "date_birth" },
          {
            key: "gender",
            render: (gender) => (gender === "M" ? "Laki-laki" : "Perempuan"),
          },
          {
            key: "photo_profile",
            render: (photo) =>
              photo ? (
                <Image
                  src={`${API_REAL}/${photo}`}
                  alt="Foto Profil"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <span>Tidak ada</span>
              ),
          },
          {
            key: "actions",
            render: (_, row) => (
              <div className="space-x-2">
                <ShowButton onClick={() => console.log("Show clicked", row)} />
                <EditButton onClick={() => console.log("Edit clicked", row)} />
                <DeleteButton
                  onClick={() => console.log("Delete clicked", row)}
                />
              </div>
            ),
          },
        ]
      : [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max bg-primarylight2 border border-text2 text-center text-s p-5">
        <TableHead heads={tableHead} />
        <TableBody rows={paginatedData} columns={columns} />
      </table>

      {/* Komponen Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
