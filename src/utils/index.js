const contentful = require('contentful');
const { CONTENTFUL_CREDENTIALS } = require('../constant');
export const getContentfulData =  async (entryId) => {

    const config = {
    include: 3,
    limit: 1000,
  content_type: entryId
    }
    const client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: CONTENTFUL_CREDENTIALS.CONTENTFUL_SPACE_ID,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: CONTENTFUL_CREDENTIALS.CONTENTFUL_ACCESS_TOKEN,
        environment: CONTENTFUL_CREDENTIALS.CONTENTFUL_ENV,
      });

     const { items } = await client.getEntries(config);
     return items;
     
}