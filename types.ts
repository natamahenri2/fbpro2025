
export interface Section {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface KeyPointsResult {
  points: string[];
  error?: string;
}
