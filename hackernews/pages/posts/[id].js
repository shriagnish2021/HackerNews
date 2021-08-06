import useSWR from "swr";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import ReadArticle from "../../components/ReadArticle.js";
import CommentSection from "../../components/CommentSection/CommentSection";
import { useSession } from "next-auth/client";

import FullPageLoader from "../../components/FullPageLoader";

export default function Article() {
  const Router = useRouter();
  const path = Router.asPath;
  const { data, error } = useSWR(`/api${path}`);
  
  const { session, loading } = useSession();


  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;

  return (
    <>
      <Header />
      <ReadArticle article={data} />
      <div className="w-full flex justify-center mt-6">
        <CommentSection session={{ ...session }} />
      </div>
    </>
  );
}
