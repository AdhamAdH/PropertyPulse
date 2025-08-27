export const dynamic = "force-dynamic";
const API_Domain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties
const fitchProperties = async ({ showFeatured = false } = {}) => {
  if (!API_Domain) {
    return [];
  }
  try {
    const res = await fetch(
      `${API_Domain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-cache" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

//fetch single property
const fitchProperty = async (id) => {
  if (!API_Domain) {
    return null;
  }
  try {
    const res = await fetch(`${API_Domain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { fitchProperties, fitchProperty };
