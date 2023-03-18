import type { GetRecipeInformation } from "@/features/recipes/lib/interfaces";
import type { NextPageWithLayout } from "@/pages/_app";
import axiosInstance from "@/shared/axios";
import MainLayout from "@/shared/layout";
import React, { useEffect, useState } from "react";
import HtmlReactParser from "html-react-parser";
import Image from "next/image";
import { useRouter } from "next/router";
import Modal from "@/shared/components/modal";

const Recipe: NextPageWithLayout<{
  recipeInformation: GetRecipeInformation;
  similarRecipes: GetRecipeInformation[];
}> = ({ recipeInformation, similarRecipes }) => {
  const [isMounted, setIsMounted] = useState(false);
  console.log(
    "🚀 ~ file: index.tsx:13 ~ recipeInformation:",
    recipeInformation
  );
  console.log("🚀 ~ file: index.tsx:117 ~ similarRecipes:", similarRecipes);

  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  if (!recipeInformation) {
    return (
      <div>
        <h4 className="text-lg font-[500] text-error">
          Something went wrong while trying to get the recipe data please try
          again later.
        </h4>
        <button className="btn-error btn mt-4" onClick={() => router.back()}>
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="px-0 md:px-12 lg:px-36">
      <section className="title-section mb-6 flex items-center justify-between">
        <h2 className="title text-3xl font-bold">{recipeInformation.title}</h2>
        <button className="btn-ghost btn" onClick={() => router.back()}>
          Go Back
        </button>
      </section>
      <div className="mb-6 grid grid-cols-8 gap-4 md:mb-8 md:gap-6 ">
        <div className="col-span-8 xl:col-span-5">
          <div className="prose text-[1.1rem] leading-8">
            {HtmlReactParser(recipeInformation.summary)}
          </div>
        </div>
        <div className="col-span-8 md:mt-2 xl:col-span-3">
          <Image
            // className="h-[12.5rem] w-[20rem] rounded md:h-[14rem]"
            className="h-full w-full rounded-md xl:h-72 xl:w-[25rem]"
            src={recipeInformation.image}
            alt={recipeInformation.title}
            width={250}
            height={250}
          ></Image>
        </div>
      </div>
      <section className="instruction-section md:mt-0">
        <div className="mb-3 flex items-center gap-x-3 md:mb-4">
          <h3 className="text-[1.3rem] font-semibold">Instructions</h3>
          <Modal
            id="analyzed-instruction-modal"
            label="Analyzed"
            title="Analyzed Instruction"
            closeTitle="Close"
          >
            <ul className="list-outside list-decimal space-y-3 px-4">
              {recipeInformation?.analyzedInstructions &&
                recipeInformation.analyzedInstructions[0] &&
                recipeInformation.analyzedInstructions[0].steps.map((step) => {
                  return (
                    <li key={step.number}>
                      <p className="text-[1rem] font-[500] leading-7">
                        {step.step}
                      </p>
                      <ul className="ml-5 mt-2 list-disc space-y-2">
                        {step?.equipment && step.equipment.length > 0 && (
                          <li>
                            <h4 className="font-[500]">Equipments</h4>
                            <ul className="ml-5 mt-1 list-circle space-y-2">
                              {step.equipment.map((equipment) => {
                                return (
                                  <li
                                    key={equipment.id}
                                    className="text-[0.98rem] capitalize"
                                  >
                                    {equipment.name}
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        )}
                        {step?.ingredients && step.ingredients.length > 0 && (
                          <li>
                            <h4 className="font-[500]">Ingredients</h4>
                            <ul className="ml-5 mt-1 list-circle space-y-2">
                              {step.ingredients.map((ingredient) => {
                                return (
                                  <li
                                    key={ingredient.id}
                                    className="text-[0.98rem] capitalize"
                                  >
                                    {ingredient.name}
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                })}
            </ul>
          </Modal>
        </div>
        <div className="prose lg:prose-lg">
          {HtmlReactParser(recipeInformation.instructions)}
        </div>
      </section>
    </div>
  );
};

export default Recipe;

Recipe.getInitialProps = async (ctx) => {
  const id = ctx.query["recipe-id"];
  try {
    const [recipeInfoResponse, similarRecipesResponse] = await Promise.all([
      axiosInstance.get(`/recipes/${id}/information`),
      axiosInstance.get(`/recipes/${id}/similar`),
    ]);
    return {
      recipeInformation: recipeInfoResponse.data,
      similarRecipes: similarRecipesResponse.data,
    };
  } catch (error) {
    return {
      recipeInformation: null,
      similarRecipes: null,
    };
  }
};

Recipe.getLayout = (page) => <MainLayout>{page}</MainLayout>;
