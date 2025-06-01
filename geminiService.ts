
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { KeyPointsResult } from '../types';

// IMPORTANT: API Key must be set in the environment variable process.env.API_KEY
// Ensure this variable is available in your deployment environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for GoogleGenAI is not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "FALLBACK_KEY_IF_YOU_HAVE_ONE_BUT_SHOULD_BE_ENV" }); // Fallback only for type safety in strict environments, will fail if API_KEY is truly missing.

export async function fetchKeyPointsFromGemini(sectionTitle: string, sectionText: string): Promise<KeyPointsResult> {
  if (!API_KEY) {
    return { points: [], error: "API Key tidak dikonfigurasi. Fitur AI tidak tersedia." };
  }

  const model = 'gemini-2.5-flash-preview-04-17';
  const prompt = `Anda adalah asisten yang membantu. Berdasarkan teks berbahasa Indonesia berikut tentang "${sectionTitle}", tolong berikan poin-poin kunci utama. 
Balas HANYA dengan daftar poin-poin dalam bahasa INDONESIA. Jangan sertakan frasa pengantar atau penutup, hanya poin-poinnya.
Format setiap poin sebagai item dalam daftar tidak berurutan (bullet list).

Teks:
${sectionText}`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    const text = response.text;
    // Assuming Gemini returns points separated by newlines, possibly with list markers
    // Basic parsing, can be improved based on actual Gemini output format.
    const points = text
      .split('\n')
      .map(p => p.trim().replace(/^- /,'').replace(/^\* /,'').trim()) // remove list markers like '-' or '*'
      .filter(p => p.length > 0);

    if (points.length === 0 && text.length > 0) {
        // If splitting failed but there's text, return the whole text as one point or indicate structure issue
        return { points: [text] };
    }
      
    return { points };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Check for specific error types if needed, e.g., API key issues, quota limits
    let errorMessage = "Terjadi kesalahan saat menghubungi layanan AI.";
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            errorMessage = "Kunci API tidak valid. Harap periksa konfigurasi.";
        } else if (error.message.includes('quota')) {
            errorMessage = "Kuota API telah terlampaui.";
        }
    }
    return { points: [], error: errorMessage };
  }
}
