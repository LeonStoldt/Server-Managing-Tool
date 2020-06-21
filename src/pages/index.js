import React from "react"
import PropTypes from 'prop-types';
import Layout from "../components/layout"
import styled from '@emotion/styled';
import Tile from "../components/tile"
import SEO from "../components/seo"
import {graphql} from "gatsby";

const TileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

const IndexPage = ({data}) => {
    const {edges} = data.allMarkdownRemark;
    return (
        <Layout>
            <SEO title="Home"/>

            <TileWrapper>
                {edges.map(({node}) => {
                    const {frontmatter} = node;
                    const {cover, path, title} = frontmatter;
                    return (
                        <Tile
                            cover={cover.childImageSharp.fluid}
                            path={path}
                            title={title}
                        />
                    );
                })}
            </TileWrapper>
        </Layout>
    );
}

export default IndexPage;

IndexPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            cover: PropTypes.object.isRequired,
                            path: PropTypes.string.isRequired,
                            title: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
};

export const query = graphql`
  query {
      allMarkdownRemark {
        edges {
          node {
              id
              frontmatter {
                title
                path
                cover {
                  childImageSharp {
                    fluid(
                      maxWidth: 1000
                      quality: 90
                      traceSVG: { color: "#2B2B2F" }
                    ) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
           }
        }
      }
    }
`;