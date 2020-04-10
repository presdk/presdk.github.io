import Tumblr from "tumblr.js";

const BlogUrl = "ourworldsimplified.tumblr.com";

const client = Tumblr.createClient({
  consumer_key: "E1hJlILUB7qLnxQJc2qBkMRYEsEtxDvNKrOprAirWAYwk25IV2",
  consumer_secret: "SKBXUfOpSoeF5vMlaWBTG7S2NzMyaZGbSNge2y6wW39BJzfj7k",
  token: "yhlsrkfax4VEP9MpQKmL8y4hSZAXJ3iJMGI0zqPv7LVTyihcwZ",
  token_secret: "1Nztj0BBaUTLsI1W4WvB4GXj2GTJbLXKvLZhgDCsp4m66p3aVB",
});

console.log(client);

// Get photos from blog
export const GetBlogPosts = (limit = 20, offset, callback) => {
  client.blogPosts(
    BlogUrl,
    { type: "photo", limit: limit, offset: offset },
    (err, response) => {
      callback(response.posts);
    }
  );
};