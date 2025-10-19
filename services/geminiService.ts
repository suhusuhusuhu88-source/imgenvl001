
import { GoogleGenAI, Modality } from "@google/genai";
import type { Part } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}
  
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Calls the Gemini API to edit an image based on a prompt.
 * @param imagePart The image data as a Part object.
 * @param prompt The text prompt describing the desired edits.
 * @returns A base64 encoded string of the edited image.
 */
export const editImage = async (imagePart: Part, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // aka "nano banana"
      contents: {
        parts: [
          imagePart,
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE], // Must be an array with a single `Modality.IMAGE` element.
      },
    });

    // Check for a valid response and inline data
    const firstCandidate = response.candidates?.[0];
    if (!firstCandidate || !firstCandidate.content.parts || firstCandidate.content.parts.length === 0) {
      throw new Error("No content returned from the API.");
    }

    const imageResponsePart = firstCandidate.content.parts[0];
    if (!imageResponsePart.inlineData?.data) {
      throw new Error("API response did not contain image data.");
    }
    
    return imageResponsePart.inlineData.data;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Re-throw a more user-friendly error
    throw new Error("Failed to generate image. The model may have refused the request. Please try a different prompt.");
  }
};
