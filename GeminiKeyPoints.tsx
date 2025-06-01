
import React, { useState, useCallback } from 'react';
import { fetchKeyPointsFromGemini } from '../services/geminiService';
import { KeyPointsResult } from '../types';

interface GeminiKeyPointsProps {
  sectionTitle: string;
  sectionText: string;
}

const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const GeminiKeyPoints: React.FC<GeminiKeyPointsProps> = ({ sectionTitle, sectionText }) => {
  const [keyPoints, setKeyPoints] = useState<KeyPointsResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchKeyPoints = useCallback(async () => {
    setIsLoading(true);
    setKeyPoints(null); // Clear previous results
    try {
      const result = await fetchKeyPointsFromGemini(sectionTitle, sectionText);
      setKeyPoints(result);
    } catch (error) {
      console.error("Error fetching key points:", error);
      setKeyPoints({ points: [], error: "Gagal mengambil poin kunci. Silakan coba lagi nanti." });
    } finally {
      setIsLoading(false);
    }
  }, [sectionTitle, sectionText]);

  return (
    <div className="mt-8 p-6 bg-slate-50 rounded-lg shadow">
      <button
        onClick={handleFetchKeyPoints}
        disabled={isLoading}
        className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out flex items-center justify-center w-full sm:w-auto disabled:opacity-50"
      >
        {isLoading ? <LoadingSpinner /> : 'Dapatkan Poin Kunci dari AI'}
      </button>

      {isLoading && (
        <p className="mt-4 text-sm text-gray-600">Memproses permintaan Anda...</p>
      )}

      {keyPoints && !isLoading && (
        <div className="mt-6">
          {keyPoints.error ? (
            <p className="text-red-600 font-semibold">{keyPoints.error}</p>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Poin Kunci dari AI:</h3>
              {keyPoints.points.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {keyPoints.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Tidak ada poin kunci yang dapat dihasilkan untuk bagian ini.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
