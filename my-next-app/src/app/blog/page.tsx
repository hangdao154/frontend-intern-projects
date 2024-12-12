import Post from "@/components/post"
import styles from './styles.module.css'

export default async function Page() {
    const posts = [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, reiciendis? Cum placeat ea nesciunt accusantium ducimus aspernatur vitae dolorum qui! Repellendus, placeat ex quam repellat natus distinctio quae error recusandae.",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat blanditiis quidem et sapiente, deleniti quisquam a sequi beatae molestiae veritatis, fuga eaque minus, nemo voluptatum temporibus aliquid quos nulla est!",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis delectus a, inventore nisi velit odit! Quae, nisi aliquam, fugit dolores quo repudiandae ducimus maxime vero quas, obcaecati exercitationem quisquam iusto."
    ]

    return (
        <>
            <h1>Blog Page</h1>
            <ul>
                {posts.map((post, index) => (
                    <li key={index} className={styles.blog}>
                        <Post post={post} />
                    </li>
                ))}
            </ul>
        </>
    )
}