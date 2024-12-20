import { useUnsubscribeMutation } from "@/api/newsletter";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../not-found-page";

const UnsubscribePage = () => {
  const { token } = useParams();
  const [unsubscribe, { isError, data }] = useUnsubscribeMutation();

  if (!token) return <NotFoundPage />;

  useEffect(() => {
    unsubscribe({ token });
  }, [token, unsubscribe]);

  if (isError) return <NotFoundPage />;

  return (
    data && (
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-semibold text-gray-900">
          Unsubscribed
        </h1>
        <p className="text-lg">
          {data.email} has been successfully unsubscribed from our newsletter.
        </p>
      </div>
    )
  );
};

export default UnsubscribePage;
