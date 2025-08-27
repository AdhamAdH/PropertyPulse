"use client";

import { ClipLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={{
        display: "block",
        margin: "100px auto",
      }}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};
export default Loading;
