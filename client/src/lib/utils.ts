import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format content text with basic styling
export function formatContentText(text: string): string {
  // Replace ** text ** with <strong>text</strong>
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace * text * with <em>text</em>
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace # Text with <h1>Text</h1>
  formattedText = formattedText.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  
  // Replace ## Text with <h2>Text</h2>
  formattedText = formattedText.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  
  // Replace bulleted lists
  formattedText = formattedText.replace(/^- (.*?)$/gm, '<li>$1</li>');
  
  // Replace numbered lists
  formattedText = formattedText.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
  
  return formattedText;
}

// Function to copy content to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

// Function to generate a random ID
export function generateId(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}
