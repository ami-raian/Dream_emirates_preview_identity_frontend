import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Website | Identity",
  description: "Welcome to Dream Emirates Identity",
};

export default function Page() {
  return <HomeClient />;
}
