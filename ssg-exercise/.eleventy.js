module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("theme.js");
    eleventyConfig.addPassthroughCopy("knitting.jpg");
    eleventyConfig.addPassthroughCopy("knitting.webp");

    return {
        htmlTemplateEngine: "njk",
    htmlOutputSuffix: ""
    };
};