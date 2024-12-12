import Link from 'next/link'

export default async function Post(props: { post: string }) {
    const posts = [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, reiciendis? Cum placeat ea nesciunt accusantium ducimus aspernatur vitae dolorum qui! Repellendus, placeat ex quam repellat natus distinctio quae error recusandae.",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat blanditiis quidem et sapiente, deleniti quisquam a sequi beatae molestiae veritatis, fuga eaque minus, nemo voluptatum temporibus aliquid quos nulla est!",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis delectus a, inventore nisi velit odit! Quae, nisi aliquam, fugit dolores quo repudiandae ducimus maxime vero quas, obcaecati exercitationem quisquam iusto."
    ]

    const { post } = props;

    return (
        <>
            <p>{post}</p>
            <hr />
            <ul className='flex gap-[20px]'>
                {posts.map((post, index) => (
                    <li key={index}>
                        <Link href={`/blog/${index}`}>{`Post ${index}`}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}