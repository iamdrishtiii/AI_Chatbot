const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `${import.meta.env.VITE_GEMINI_API_URL}key=${GEMINI_API_KEY}`;

export const generateContent = async (prompt) => {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "API Error");
    }
    const data = await response.json();
    // console.log(data);
    return data.candidates[0].content.parts[0].text

  } catch (error) {
    console.error("Error generating Content:", error);
    throw error;
  }
};
