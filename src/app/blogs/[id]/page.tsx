import CommentForm from "@/components/CommentForm";
import Comments from "@/components/Comments";
import prisma from "@/libs/db";

interface BlogDetailsProps {
  params: {
    id: string;
  };
}

const BlogDetails = async ({ params }: BlogDetailsProps) => {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });
  // console.log(post);
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <p>Written by: {post?.author?.name}</p>
      <div className="mt-4">{post?.content}</div>
      <Comments postId={params.id} />
      <CommentForm postId={params.id} />
    </div>
  );
};

export default BlogDetails;
