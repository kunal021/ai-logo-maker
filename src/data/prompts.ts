const logoPrompts = {
  DESIGN_IDEA_PROMPT: `Based on Logo of type {logoType}, generate 10 creative logo ideas for:
  - Brand name: {logoTitle}
  - Description: {logoDesc}
  - Additional context: {logoPrompt}
  
  Requirements:
  - Each idea should be 4-5 words maximum
  - Focus on visual concepts and design elements
  - Make ideas distinctive and memorable
  - Consider the brand's personality and target audience
  
  Return ONLY a JSON response in this exact format:
  {
    "logo_ideas": [
      { "id": 1, "description": "Modern geometric brand symbol" },
      { "id": 2, "description": "Abstract flowing design concept" },
      { "id": 3, "description": "Minimalist typographic approach" },
      { "id": 4, "description": "Bold circular brand mark" },
      { "id": 5, "description": "Creative lettermark design" },
      { "id": 6, "description": "Dynamic arrow integration" },
      { "id": 7, "description": "Elegant script-based logo" },
      { "id": 8, "description": "Icon and text combination" },
      { "id": 9, "description": "Gradient modern aesthetic" },
      { "id": 10, "description": "Symbolic representation concept" }
    ]
  }`,
  LOGO_PROMPT:
    "Generate a text prompt to create Logo for Logo Title/Brand name : {logoTitle},with description: {logoDesc}, with Color combination of {logoColor}, also include the {logoIdea} and include {logoDesign} design idea and Referring to this Logo Prompt:{logoPrompt}  Give me result in JSON portal with prompt field only",
};

export default logoPrompts;
