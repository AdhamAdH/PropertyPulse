"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fitchProperty } from "@/utils/requests";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyHeaderImage from "@/components/propertyHeaderImage";
import PropertyDetails from "@/components/propertyDetails";
import PropertyImages from "@/components/propertyImages";
import BookmarkButton from "@/components/bookmarkButton";
import ShareButtons from "@/components/shareButtons";
import PropertyContactFrom from "@/components/propertyContactFrom";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fitchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!loading && !property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  if (!loading && property) {
    return (
      <>
        <PropertyHeaderImage image={property.images[0]} />
        {/* <!-- Go Back --> */}
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className=" mr-2" /> Back to Properties
            </Link>
          </div>
        </section>

        {/* <!-- Property Info --> */}
        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
              <PropertyDetails property={property} />

              {/* <!-- Sidebar --> */}
              <aside className="space-y-4">
                <BookmarkButton property={property} />
                <ShareButtons property={property} />
                <PropertyContactFrom property={property} />
              </aside>
            </div>
          </div>
        </section>
        <PropertyImages images={property.images} />
      </>
    );
  }
};
export default PropertyPage;
