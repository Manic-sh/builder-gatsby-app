import * as React from 'react';
import { graphql } from 'gatsby';
import { builder, BuilderComponent } from '@builder.io/react';

builder.init('17149fd1734b43ad9d58a5f8295bb18f');

function PageTemplate({ data }) {
  const models = data?.allBuilderModels;
  const page = models.page?.content;
  console.log(page);
  return <BuilderComponent name="page" content={page} />;
}

export default PageTemplate;

export const pageQuery = graphql`
  query ($path: String!) {
    allBuilderModels {
      onePage(target: { urlPath: $path }) {
        content
      }
    }
  }
`;