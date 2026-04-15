export interface Poet {
  id: string;
  name: string;
  dynasty: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  famousLines: string[];
}

export interface Poem {
  id: string;
  title: string;
  content: string;
  poetId: string;
  dynasty: string;
  sentences: string[];
  characters: string[];
}