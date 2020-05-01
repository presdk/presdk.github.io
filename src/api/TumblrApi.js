import Tumblr from "tumblr.js";

const BlogUrl = "ourworldsimplified.tumblr.com";

const client = Tumblr.createClient({
  consumer_key: "E1hJlILUB7qLnxQJc2qBkMRYEsEtxDvNKrOprAirWAYwk25IV2",
  consumer_secret: "SKBXUfOpSoeF5vMlaWBTG7S2NzMyaZGbSNge2y6wW39BJzfj7k",
  token: "yhlsrkfax4VEP9MpQKmL8y4hSZAXJ3iJMGI0zqPv7LVTyihcwZ",
  token_secret: "1Nztj0BBaUTLsI1W4WvB4GXj2GTJbLXKvLZhgDCsp4m66p3aVB",
});

console.log(client);

const GetPosts = (type, limit, offset, callback) => {
  client.blogPosts(
    BlogUrl,
    { type: type, limit: limit, offset: offset },
    (err, response) => {
      callback(response.posts);
    }
  );
};

export const GetPhotoPosts = (limit = 20, offset, callback) => {
  return GetPosts("photo", limit, offset, callback);
};

export const GetTextPosts = (limit = 20, offset, callback) => {
  return GetPosts("text", limit, offset, callback);
};