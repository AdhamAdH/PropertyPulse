import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET: /api/properties/search
export const GET = async (req) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    //Make a pattern to get better results
    const locationPattern = new RegExp(location, "i");

    //Make query variable to match location pattern againts database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    //Make the api check for property type and add it to query if and only if its not "All"
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
