import SearchForm from "@/components/searchForm";
import Properties from "@/components/properties";

const PropertiesPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-4 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <SearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};
export default PropertiesPage;
