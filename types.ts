export interface Comment {
    username: string;
    content: string;
    timestamp: string;
  }
  
  export interface Post {
    id: string;
    username: string;
    content: string;
    timestamp: string;
    images?: string[];
    comments?: Comment[];
    reposts?: number;
    likes?: number;
    tags?: string[];
  }