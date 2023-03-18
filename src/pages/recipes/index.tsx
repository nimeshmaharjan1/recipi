import MainLayout from "@/shared/layout";
import React, { useState } from "react";
import type { NextPageWithLayout } from "../_app";
import { useQuery } from "react-query";
import axiosInstance from "@/shared/axios";
import Image from "next/image";
import type { RecipeSearchResults } from "@/features/recipes/lib/interfaces";
import SharedSearch from "@/shared/components/search-section";
import { useRouter } from "next/router";
import Link from "next/link";

const Recipes: NextPageWithLayout = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>();
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery<RecipeSearchResults, Error>(
    ["searchResults", searchTerm],
    async () => {
      const params = new URLSearchParams({
        query: searchTerm,
        // includeIngredients: "tomato, cheese",
      });
      const response = await axiosInstance.get(
        "/recipes/complexSearch?" + params
      );
      const data = response.data as RecipeSearchResults;
      setTotalPages(Math.ceil(data.totalResults / resultsPerPage));
      return data;
    }
    // { enabled: false }
  );
  console.log(searchResults);
  /**
   * Pagination
   */
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  return (
    <div>
      <SharedSearch
        setSearchTerm={setSearchTerm}
        placeholder={"Search recipes..."}
      ></SharedSearch>
      {isError ? (
        <p className="text-error">
          Something went wrong please try refreshing or try again later.
        </p>
      ) : isLoading ? (
        <i>Loading...</i>
      ) : searchResults ? (
        <div className="grid grid-cols-12 gap-4 gap-y-6">
          {searchResults.results.map((recipe) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="product-card col-span-6 mx-auto h-72 min-h-[8rem] w-full cursor-pointer overflow-hidden rounded-md bg-base-200 shadow-xl md:col-span-4 md:h-[19rem] md:min-h-[14rem] lg:col-span-3 xl:col-span-2"
            >
              <Image
                src={recipe.image}
                width={250}
                quality={100}
                height={250}
                className="z-10 w-full"
                alt={recipe.title}
              />
              <div className="p-4">
                <h3 className="text-sm font-[600] transition-all hover:text-secondary md:text-base">
                  {recipe.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <i>Search to see recipes here.</i>
      )}
    </div>
  );
};

export default Recipes;

Recipes.getLayout = (page) => <MainLayout>{page}</MainLayout>;
