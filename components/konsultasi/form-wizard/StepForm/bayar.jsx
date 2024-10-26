import Image from "next/image";
import { jadwalPsikolog } from "@/constants";
import { useState } from "react";

export default function FormBayar() {

    // State untuk menyimpan data psikolog yang dipilih
    const [selectedPsikolog, setSelectedPsikolog] = useState(jadwalPsikolog[0]); // Misalkan ambil psikolog pertama

    //State untuk mengubah warna button ketika sudah menginput
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="p-6">
            {/* Tombol Back */}
            <div className="flex items-center gap-4">
                <Image
                    src="/icons/arrow_back.png"
                    alt="icon kembali"
                    width={9}
                    height={14}
                />
                <p className="text-m font-bold">Kembali</p>
            </div>
            <div className="flex gap-8 mt-6">
                {/* Konten Kiri */}
                <div className="w-2/5">
                    <div className="p-4">
                        <h3 className="text-h3 font-semibold text-textcolor mb-2">Pemesanan</h3>
                        <p className="text-s text-textcolor mb-4">Lakukan pembayaran agar pemesanan sesi konsultasi kamu dapat dijadwalkan</p>
                        <div className="bg-primarylight2 rounded-md">
                            <div className="p-4">
                                <div className="flex gap-6">
                                    <Image className="mb-2"
                                        src="/image/psikolog/photo.png"
                                        alt="Image"
                                        width={100}
                                        height={50}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-m font-semibold">{selectedPsikolog.name}</p>
                                        {/* Rating, Pengalaman, dan Role */}
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center">
                                                <Image
                                                    src="/icons/bintang.png"
                                                    alt="Icon Star"
                                                    width={18}
                                                    height={18}
                                                />
                                                <p className="ml-1">{selectedPsikolog.rating}</p>
                                            </div>
                                            <span className="text-gray-400">|</span>
                                            <div className="flex items-center">
                                                <Image
                                                    src="/icons/i-konsultasi.png"
                                                    alt="Icon Konsultasi"
                                                    width={18}
                                                    height={18}
                                                />
                                                <p className="ml-1">{selectedPsikolog.pengalaman} tahun</p>
                                            </div>
                                            <span className="text-gray-400">|</span>
                                            <div className="flex items-center">
                                                <Image
                                                    src="/icons/role.png"
                                                    alt="Icon Role"
                                                    width={18}
                                                    height={18}
                                                />
                                                <p className="ml-1">{selectedPsikolog.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-1 border-black mb-4 mt-2" />
                                {/* Detail Konsultasi */}
                                <div className="text-m gap-2">
                                    <p className="font-semibold mb-2">Detail Konsultasi</p>
                                    <p className="mb-2">Topik Konsultasi : Umum</p>
                                    <p className="mb-2">Durasi Konsultasi : 60 menit</p>
                                    <p className="mb-2">Jadwal Konsultasi : Sabtu, 26 Oktober 2024</p>
                                    <p className="mb-2">Waktu Konsultasi : 13.00 - 14.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Konten Kanan */}
                <div className="w-3/5">
                    <div className="bg-primarylight2 rounded-lg p-4 mb-6">
                        <h3 className="text-h3 font-semibold mb-4">Pembayaran</h3>
                        {/* Dropdown pembayaran */}
                        <div>
                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                                <option selected>Pilih Metode Pembayaran</option>
                                <option value="BRI">Bank BRI</option>
                                <option value="BNI">Bank BNI</option>
                                <option value="BSI">Bank BSI</option>
                                <option value="Mandiri">Bank Mandiri</option>
                            </select>
                        </div>
                        <hr className="border-1 border-black mb-4 mt-2" />
                        {/* Voucher */}
                        <div>
                            <label htmlFor="voucher" className="block mb-2 text-m font-semibold text-textcolor">
                                Voucher
                            </label>
                            <div className="flex flex-1 gap-2">
                                <input
                                    type="text"
                                    id="voucher"
                                    aria-describedby="voucher-text-explanation"
                                    className="bg-gray-50 border border-gray-300 text-text2 text-s rounded-lg block w-full p-2.5"
                                    placeholder="Masukkan Voucher Anda"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <button
                                    className={`rounded-lg text-whitebg text-s px-4 ${inputValue ? "bg-primary" : "bg-disable"}`}
                                >
                                    Reedem
                                </button>
                            </div>
                        </div>
                        {/* Harga */}
                        <div className="text-m mt-3 space-y-2">
                            <div className="flex justify-between">
                                <p>Total Harga Konsultasi</p>
                                <p><b>Rp 50.000</b></p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total Diskon Voucher</p>
                                <p><b>Rp 50.000</b></p>
                            </div>
                        </div>
                        <hr className="border-1 border-black mb-4 mt-2" />
                        <div className="text-h3 font-semibold flex justify-between">
                            <p>Total Biaya</p>
                            <p>Rp 50.000</p>
                        </div>
                        {/* SNK */}
                        <div className="mt-4">
                            <div className="flex items-center mb-4">
                                <input
                                    id="checkbox"
                                    type="checkbox"
                                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                                />
                                <label htmlFor="checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Saya telah membaca dan menyetujui Syarat & Ketentuan
                                </label>
                            </div>
                        </div>
                        {/* Button bayar */}
                        <button
                            className={`text-m w-full py-2 rounded-md font-semibold text-whitebg ${inputValue ? "bg-primary" : "bg-disable"}`}
                        >
                            Bayar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}