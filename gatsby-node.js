const React = require("react")
exports.createPages = async function ({actions, graphql}) {
    const categories = [
        {
            title: 'Getting Started',
            description: 'Learn the basics about the Algebra',
            category: 'getting-started'
        },
        {
            title: 'Swap',
            description: 'Learn how to swap tokens on Algebra',
            category: 'swap'
        },
        {
            title: 'Provide Liquidity',
            description: 'Learn how to earn yield by providing liquidity on Algebra',
            category: 'liquidity'
        },
        {
            title: 'FAQ',
            description: 'Frequently asked questions',
            category: 'faq'
        }
    ]

    const {data} = await graphql(`
    query {
        allMarkdownRemark {
             nodes {
                frontmatter {
                    slug
                    category
                }
             }
        }
    }
  `)

    categories.forEach(el => {
        actions.createPage({
            path: `/${el.category}`,
            component: require.resolve('./src/components/articles/articles.tsx'),
            context: {category: el.category},
        })

        data.allMarkdownRemark.nodes.forEach((_el, i) => {
            if (_el.frontmatter.category === el.category) {
                actions.createPage({
                    path: `/${el.category}/${_el.frontmatter.slug}`,
                    component: require.resolve(`./src/components/article/index.tsx`),
                    context: {slug: _el.frontmatter.slug, backlink: el.category}
                })
            }
        })
    })
}