import Image from "next/image";

export default function KonsulBelumMulai({ onClose }) {
    return (
        <div className="px-6 py-4">
            {/* Tombol Close */}
            <div className="flex justify-end">
                <Image
                    src="/icons/close-orange.svg"
                    alt="Tutup"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>

            {/* Konten Utama */}
            <div className="flex flex-col justify-center items-center mt-10">
                <Image src="/icons/smile.svg" alt="Belum Mulai" width={150} height={150} />
                <h3 className="text-h3 mt-5 font-semibold text-center">
                    Belum Dimulai
                </h3>
                <p className="text-center text-sm text-gray-700 mt-4">
                    Maaf sesi konsultasi anda belum dimulai, kamu dapat membukanya saat sesi telah dimulai.
                </p>
            </div>
        </div>
    );
}