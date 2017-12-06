import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

const Template = ({ data, location, pathContext }) => {
  const { markdownRemark: post } = data;
  const { frontmatter, html } = post;
  const { title, date } = frontmatter;
  const { next, prev } = pathContext;

  return (
    <div>
      <Helmet titles={`${title} - Deep Thought's with Corey`} />

      <div>
        <h1>{title}</h1>
        <h6>{date}</h6>
        <div dangerouslySetInnerHTML={{ __html: html }} />

        <p style={{ display: "inline-table", float: "right" }}>
          {prev && (
            <Link to={prev.frontmatter.path}>{prev.frontmatter.title}</Link>
          )}
        </p>
        <p style={{ display: "inline-table", float: "left" }}>
          {next && (
            <Link to={next.frontmatter.path}>{next.frontmatter.title}</Link>
          )}
        </p>
      </div>
    </div>
  );
};

export const PageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        excerpt
      }
    }
  }
`;

export default Template;
