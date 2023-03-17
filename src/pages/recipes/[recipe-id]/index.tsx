import type { GetRecipeInformation } from "@/features/recipes/lib/interfaces";
import type { NextPageWithLayout } from "@/pages/_app";
import axiosInstance from "@/shared/axios";
import MainLayout from "@/shared/layout";
import React from "react";
import HtmlReactParser from "html-react-parser";
import Image from "next/image";
import { useRouter } from "next/router";

const Recipe: NextPageWithLayout<{ data: GetRecipeInformation }> = ({
  data,
}) => {
  const router = useRouter();
  return (
    <>
      <h2 className="title mb-4 text-3xl font-bold">{data.title}</h2>
      <div className="grid grid-cols-8 gap-2 md:gap-6">
        <div className="col-span-8 md:col-span-5">
          <p className="mb-5 text-[1.1rem] leading-8">
            {HtmlReactParser(data.summary)}
          </p>
        </div>
        <div className="col-span-8 md:col-span-3">
          <Image
            className="h-full w-full rounded"
            src={data.image}
            alt={data.title}
            width={250}
            height={250}
          ></Image>
        </div>
      </div>
      <section className="instruction-section prose mt-5 md:mt-0">
        <h3>Instructions</h3>
        <div>{HtmlReactParser(data.instructions)}</div>
      </section>
      <button className="btn-ghost btn mt-8" onClick={() => router.back()}>
        Go Back
      </button>
    </>
  );
};

export default Recipe;

Recipe.getInitialProps = async (ctx) => {
  const id = ctx.query["recipe-id"];
  const response = await axiosInstance.get(`/recipes/${id}/information`);
  console.log(response.data);
  return {
    data: response.data,
  };
};

Recipe.getLayout = (page) => <MainLayout>{page}</MainLayout>;
