import * as React from "react";
import NextLink from "next/link";
import { ComponentProps } from "react";

const isExternalUrl = (url: string) => {
  return url.substr(0, 4) === "http" || url.substr(0, 2) === "//";
};

const stripMdExtension = (url) => {
  if (!isExternalUrl(url)) {
    return url.replace(/.md$/, "");
  }
  return url;
};

export function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  console.log("Link props", props);
  console.log("Link href", href);
  return <NextLink className="link" href={stripMdExtension(href)} {...props}></NextLink>;
}
