"use client";
import PropertyCard from "./propertyCard";
import { useState, useEffect } from "react";
import Spinner from "./spinner";
import Pagination from "./pagination";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(6);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fecthProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data.properties);
          setTotal(data.total);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fecthProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
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
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
export default Properties;
