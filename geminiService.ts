
// This is a mock service to simulate Gemini API responses.
// In a real application, you would import and use '@google/genai'.

const mockResponses: { [key: string]: string } = {
  "default": "That's a great goal! To get started, are you more interested in a specific area like SEO, Social Media, or Content Creation?",
  "marketing": "Digital marketing is a fantastic field. A good starting point is understanding your target audience. Have you thought about who you want to reach?",
  "seo": "SEO is all about visibility. Key concepts to learn are keyword research, on-page optimization, and link building. I can suggest some great beginner courses on that.",
  "course": "We have several highly-rated courses. For digital marketing, I'd recommend 'Digital Marketing Fundamentals'. For SEO, 'SEO Unlocked' is a great choice. Would you like me to find one for you?",
};

export const getGeminiResponse = (prompt: string): Promise<string> => {
  console.log("Sending prompt to mock Gemini:", prompt);
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerCasePrompt = prompt.toLowerCase();
      let response = mockResponses.default;
      if (lowerCasePrompt.includes('marketing')) {
        response = mockResponses.marketing;
      }
      if (lowerCasePrompt.includes('seo')) {
        response = mockResponses.seo;
      }
      if (lowerCasePrompt.includes('course')) {
        response = mockResponses.course;
      }
      resolve(response);
    }, 1500); // Simulate network delay
  });
};
