"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/spinner";
import PropertyCard from "@/components/propertyCard";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import SearchForm from "@/components/searchForm";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <>
      <section className="bg-blue-700 py-4 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <SearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowAltCircleLeft className=" mr-2" /> Back to Properties
            </Link>
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.length === 0 ? (
                <p className="text-2xl font-bold text-center">
                  No properties found
                </p>
              ) : (
                properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default SearchResultsPage;
