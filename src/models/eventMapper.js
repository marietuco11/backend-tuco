function mapZaragozaEvent(event) {

  const sub = event.subEvent?.[0] || {};

  const coords = event.geometry?.coordinates || [];

  const startRaw = sub.startDate || event.startDate;
  const endRaw = sub.endDate || event.endDate;
  const startDate = startRaw ? new Date(startRaw) : null;
  const endDate = endRaw ? new Date(endRaw) : null;

  return {

    externalId: String(event.id),
    title: event.title || "Sin título",
    description: (event.description || "Sin descripción").slice(0, 5000),    
    category: event.category?.[0]?.title || "general",
    subcategory: event.tipoActividad || null,
    startDate: startDate,
    endDate: endDate,

    locationName:
      sub.location?.title ||
      event.location?.title ||
      "Ubicación desconocida",

    address: event.location?.address || null,
    latitude: coords.length ? coords[1] : null,
    longitude: coords.length ? coords[0] : null,
    imageUrl: event.image || null,
    sourceUrl: event.sameAs || null,
    isFree: !event.formaPago || event.formaPago === "Gratuita",
    status: "active",
    syncedAt: new Date()

  };

}

module.exports = mapZaragozaEvent;