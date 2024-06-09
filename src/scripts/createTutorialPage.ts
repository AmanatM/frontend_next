const fs = require("fs")
const path = require("path")

// Function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, "") // Remove leading and trailing hyphens
}

const createPage = (title: string): void => {
  const slug = generateSlug(title)
  const baseDir = path.join(__dirname, "..", "app", "tutorials")
  const pageDir = path.join(baseDir, slug)

  // Create the directory if it doesn't exist
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true })
  }

  // Define the content for the page.mdx file with metadata
  const pageContent = `---
title: "${title}"
publishDate: "${new Date().toISOString()}"
categories: ["CSS"]
interactive: true
shortDescription: "This is a tutorial on ${title}."
---

import React from 'react';

export const metadata = {
  title: "${title}",
  publishDate: "${new Date().toISOString()}",
  categories: ["CSS"],
  interactive: true,
  shortDescription: "This is a tutorial on ${title}."
};

# ${title}

This is the content for the ${title} tutorial.
`

  // Write the page.mdx file
  const filePath = path.join(pageDir, "page.mdx")
  fs.writeFileSync(filePath, pageContent.trim(), "utf8")

  console.log(`Page created at: ${filePath}`)
}

// Capitalize the first letter of the slug for the component name
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Get the title from command line arguments
const title = process.argv.slice(2).join(" ")

if (title) {
  createPage(title)
} else {
  console.log("Please provide a title for the page.")
}
