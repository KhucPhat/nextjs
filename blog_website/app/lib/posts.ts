import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postDirectory = path.join(process.cwd(), '/app/blogposts')

export function getStrotedPostsData() {
    const fileNames  = fs.readdirSync(postDirectory);
    const allPostsData = fileNames.map((fileNames) => {
        const id = fileNames.replace(/\.md$/, '');

        const fullPath = path.join(postDirectory, fileNames);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        const blogPost: BlogPost = {
            id, 
            title: matterResult.data.title,
            date: matterResult.data.date
        }

        return blogPost;
    })
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}

export async function getPostData(id: string) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const mattersResult = matter(fileContents);
    const processedContent = await remark()
    .use(html)
    .process(mattersResult.content);

    const contentHtml = processedContent.toString();

    const blogPostWithHTML: BlogPost & {contentHtml: string} = {
        id,
        title: mattersResult.data.title,
        date: mattersResult.data.date,
        contentHtml,
    }

    return blogPostWithHTML;
}