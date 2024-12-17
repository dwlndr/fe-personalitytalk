import axios from "axios";

import { getToken, removeToken } from "@/lib/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://756d-114-10-44-248.ngrok-free.app/api";

// Fungsi Login user
export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/user/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Fungsi Register User
export const registerUser = async (data, isFormData = false) => {
  const headers = isFormData
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };

  const response = await axios.post(`${API_URL}/user/register`, data, {
    headers,
  });
  return response;
};


// Fungsi ambil info User (nama, photo profile, role)
export const getUserInfo = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

// Fungsi untuk mendapatkan detail user
export const getUserDetail = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/user/profile/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    // Akses data pengguna yang ada di dalam `data` property
    const data = response.data.data;

    // Memeriksa role dan menambahkan data spesifik
    const userDetails = {
      name: data.name,
      email: data.email,
      role: data.role,
      photoProfile: data.photo_profile,
      gender: data.gender === "M" ? "Laki-Laki" : "Perempuan",
      dateBirth: data.date_birth,
      phoneNumber: data.phone_number,
      joined_at: data.joined_since,
      universitas: data.mahasiswa_details?.universitas || "",
      jurusan: data.mahasiswa_details?.jurusan || "",
    };

    // Menambahkan detail untuk Psikolog (P)
    if (data.role === "P") { // Jika Psikolog
      userDetails.psikologDetails = {
        sipp: data.psikolog_details.sipp, // Menyertakan sipp untuk Psikolog
        practiceStartDate: data.psikolog_details.practice_start_date,
        description: data.psikolog_details.description,
        topics: data.psikolog_details.topics || [], // Topik yang tersedia untuk psikolog
        bankName: data.psikolog_details.bank_name,
        rekening: data.psikolog_details.rekening,
      };
    } else if (data.role === "K") { // Jika Konselor
      // Menambahkan detail untuk Konselor (tanpa sipp)
      userDetails.konselorDetails = {
        practiceStartDate: data.psikolog_details.practice_start_date,
        description: data.psikolog_details.description,
        topics: data.psikolog_details.topics || [], // Topik yang tersedia untuk konselor
        bankName: data.psikolog_details.bank_name,
        rekening: data.psikolog_details.rekening,
      };
    }

    return userDetails;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw new Error("Failed to fetch user data");
  }
};

// Fungsi untuk Update Profile User
export const updateProfile = async (formData) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/user/profile/update`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update profile");
  }
};

// Fungsi untuk mengubah password
export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword
) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/user/profile/updatePassword`,
      {
        current_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to change password");
  }
};

// Fungsi untuk upgrade ke mahasiswa
export const upgradeMahasiswa = async (universitas, jurusan) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/user/profile/updateMahasiswa`,
      { universitas, jurusan },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to upgrade to mahasiswa");
  }
};

// Fungsi untuk Logout User
export const logoutUser = async () => {
  const token = getToken();

  try {
    const response = await axios.post(
      `${API_URL}/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    // Remove the token after successful logout
    removeToken();
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw new Error("Failed to log out");
  }
};

export const loginAdmin = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/admin/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Fungsi untuk Logout User
export const logoutAdmin = async () => {
  const token = getToken();

  try {
    const response = await axios.post(
      `${API_URL}/admin/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    // Remove the token after successful logout
    removeToken();
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw new Error("Failed to log out");
  }
};