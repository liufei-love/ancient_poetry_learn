export interface Dynasty {
  id: string;
  name: string;
  period: string;
  description: string;
  color: string;
  iconImage: string;
  startYear: number;
  endYear: number;
}

export interface Artifact {
  id: string;
  name: string;
  dynastyId: string;
  period: string;
  description: string;
  imageUrl: string;
  modelUrl?: string;
  details: string[];
  category: string;
  location: string;
}
