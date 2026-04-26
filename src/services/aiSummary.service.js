async function generateSummary(events) {

  if (!events || events.length === 0) {
    return {
      summary: "No hay eventos para este criterio.",
      highlights: []
    };
  }

  const simplified = events.slice(0, 20).map(e => ({
    id: e._id,
    titulo: e.title,
    categoria: e.category,
    fecha: e.startDate
  }));

  const prompt = `
Eres un sistema que analiza eventos en Zaragoza.

1. Genera un resumen general (5-10 líneas)
- Describe tendencias
- NO nombres eventos concretos
- NO recomiendes

2. Devuelve JSON EXACTO:

{
  "summary": "texto",
  "highlights": [
    { "text": "nombre corto", "eventId": "id" }
  ]
}

EVENTOS:
${JSON.stringify(simplified, null, 2)}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // limpiar markdown
  text = text.replace(/```json/g, '').replace(/```/g, '').trim();

  try {
    const parsed = JSON.parse(text);

    return {
      summary: parsed.summary || "",
      highlights: parsed.highlights || []
    };

  } catch (err) {
    console.error("IA mal formateada:", text);

    // fallback seguro
    return {
      summary: text,
      highlights: events.slice(0, 3).map(e => ({
        text: e.title,
        eventId: e._id
      }))
    };
  }
}