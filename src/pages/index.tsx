import axiosInstance from "@/shared/axios";
import MainLayout from "@/shared/layout";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const getData = async () => {
    const params = new URLSearchParams({
      query: "pasta",
      includeIngredients: "tomato, cheese",
    });
    const data = await axiosInstance.get("/recipes/complexSearch?" + params);
    console.log(data);
  };
  const getRandom = async () => {
    const params = new URLSearchParams({
      query: "pasta",
      includeIngredients: "tomato, cheese",
    });
    const random = await axiosInstance.get("/recipes/random");
    console.log({ random });
  };
  return <div>Home</div>;
};

export default Home;

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: true,
      destination: "/recipes",
    },
    props: {},
  };
};
