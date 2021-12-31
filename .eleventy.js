const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
    eleventyConfig.setDataDeepMerge(true);

    // Parse the licence.md file
    eleventyConfig.addPairedShortcode("credits", function(content) {
        return markdownIt().render(content);
    });

    // Copy media folders to the output
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/js");

    // Customize Markdown library and settings:
    eleventyConfig.setLibrary("md", markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }));

    return {
        markdownTemplateEngine: "njk",
        HTMLTemplateEngine: "njk",
        dataTemplateEngine: false,
        dir: {
            input: "src",
            output: "dist"
        }
    };
};