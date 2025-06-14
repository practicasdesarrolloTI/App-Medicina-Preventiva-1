import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";

const API_URL = "https://backend.bienestarips.com/api/auth";

type DocumentType =
  | "RC"
  | "TI"
  | "CC"
  | "CE"
  | "PAS"
  | "NIT"
  | "CD"
  | "SC"
  | "MSI"
  | "ASI"
  | "PEP"
  | "PTP";

interface SendCodeResponse {
  message: string;
  attemptsUsed?: number;
  attemptsRemaining?: number;
}

// Registrar usuario
export const registerUser = async (
  documentType: DocumentType,
  document: number,
  mail: string,
  password: string, 
  eps: string,
  fechaNacimiento: string
) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentType, document, mail, password,
        eps,
        fechaNacimiento,
      }),
    });
    const data = await response.json();

    if (!data.token) {
      throw new Error("Token no recibido en la respuesta del servidor");
    }

    await AsyncStorage.setItem("token", data.token); // Guardar token JWT en el almacenamiento
    return { success: true, data };
  } catch (error: any) {
    Toast.show({
      type: "error",
      text2: error.message,
      position: "bottom",
    });
    return { success: false, message: error.message };
  }
};

// Iniciar sesión
export const loginUser = async (
  documentType: DocumentType,
  document: number,
  password: string
) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentType, document, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el login");
    }

    const data = await response.json();

    if (!data.token) {
      throw new Error("Token no recibido en la respuesta del servidor");
    }

    await AsyncStorage.setItem("token", data.token); // Guardar token JWT en el almacenamiento

    return { success: true, data };
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      position: "bottom",
    });
    return { success: false, message: error.message };
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("token");
    Toast.show({
      type: "success",
      text1: "Sesión cerrada",
      text2: "Has cerrado sesión correctamente.",
      position: "bottom",
    });
  } catch (error) {
    console.error("Error al eliminar el token:", error);
  }
};

// Obtener el token almacenado
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return null;
  }
};

// Verificar si el usuario está autenticado
export const sendRecoveryCode = async (
  document: number,
  email: string
): Promise<{
  success: boolean;
  message: string;
  attemptsUsed?: number;
  attemptsRemaining?: number;
  retryAfterMinutes?: number;
}> => {
  try {
    const res = await axios.post<SendCodeResponse>(
      `${API_URL}/send-recovery-code`,
      {
        document,
        email,
      }
    );
    console.log("Respuesta del servidor exitosa:", res.data);
    return {
      success: true,
      message: res.data.message,
      attemptsUsed: res.data.attemptsUsed,
      attemptsRemaining: res.data.attemptsRemaining,
    };
  } catch (error: any) {
    const data = error.response?.data;
    console.error("Error al enviar el código de recuperación mala:", data);
    return {
      success: false,
      message: data?.message || "Error al enviar el código.",
      attemptsUsed: data?.attemptsUsed,
      attemptsRemaining: data?.attemptsRemaining,
      retryAfterMinutes: data?.retryAfterMinutes,
    };
  }
};

// Verificar el código de recuperación
export const verifyRecoveryCode = async (document: number, code: string) => {
  return await axios.post(`${API_URL}/verify-code`, { document, code });
};

export const resetPassword = async (
  document: number,
  code: string,
  newPassword: string
) => {
  return await axios.post(`${API_URL}/reset-password`, {
    document,
    code,
    newPassword,
  });
};
