
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateInvitationMessage = async (
  hostName: string,
  style: string,
  eventTitle: string
): Promise<string> => {
  const prompt = `Viết một lời mời tiệc Tất niên (Year-End Party) cho sự kiện "${eventTitle}" do "${hostName}" tổ chức.
  Phong cách: ${style}. 
  Ngôn ngữ: Tiếng Việt. 
  Yêu cầu: Ngắn gọn, súc tích, đầy cảm xúc và lôi cuốn người nhận. 
  Không bao gồm thời gian địa điểm trong lời nhắn này, chỉ tập trung vào phần cảm xúc và thông điệp mời gọi.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "Chúc mừng năm mới! Hãy cùng chúng tôi khép lại một năm đáng nhớ bằng một buổi tiệc ấm cúng.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "Hãy cùng chúng tôi tụ họp để chúc mừng một năm đã qua và chào đón những điều tốt đẹp đang tới.";
  }
};
