const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateSummary(events) {

  if (!events || events.length === 0) {
    return "No hay eventos disponibles para este criterio.";
  }

  const simplified = events.map(e => ({
    titulo: e.title,
    categoria: e.category,
    fecha: e.startDate
  }));

  const prompt = `
Eres un asistente que resume eventos en Zaragoza.

A partir de esta lista de eventos, genera un resumen neutro, informativo y breve (2-3 líneas).
No recomiendes, solo describe qué tipo de eventos predominan.

Eventos:
${JSON.stringify(simplified, null, 2)}

Reglas:
- Máximo 3 líneas
- No inventes eventos
- No menciones todos uno a uno
- No hagas recomendaciones
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  return text;
}

module.exports = generateSummary;