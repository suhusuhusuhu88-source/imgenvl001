
import type { Part } from "@google/genai";

/**
 * Converts a File object to a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string.
 */
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // result is "data:mime/type;base64,..." - we only want the part after the comma
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Converts a File object into a Part object for the Gemini API.
 * @param file The file to convert.
 * @returns A promise that resolves with the Part object.
 */
export const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64Data = await fileToBase64(file);
  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type,
    },
  };
};
