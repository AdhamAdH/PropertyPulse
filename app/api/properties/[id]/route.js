import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

//GET /api/properties/:id
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const property = await Property.findById(id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all properties", { status: 500 });
  }
};

//DELETE /api/properties/:id
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID Is Required", { status: 401 });
    }

    const { userId } = sessionUser;

    const property = await Property.findById(id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    //Verify Ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

//PUT /api/properties/:id
export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;

    const { id } = await params;

    const formData = await req.formData();

    //Access all values from amenities
    const amenities = formData.getAll("amenities");

    //Get Property To Update
    const exitingProperty = await Property.findById(id);

    if (!exitingProperty) {
      return new Response("Property Not Found", { status: 404 });
    }

    //Verify Ownership
    if (exitingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //Create propertyData object for database
    const propertyData = {
      owner: userId,
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    return new Response("Somethimg Went Wrong", { status: 500 });
  }
};
