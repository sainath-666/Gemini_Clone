export enum MessageSender {
  USER = "user",
  AI = "ai",
}

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  filePreview?: string;
  fileName?: string;
  fileType?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}
