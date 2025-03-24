type SkeletonProps = {
  className: string;
  rounded: "md" | "full";
};

export const Skeleton = ({ className, rounded }: SkeletonProps) => {
  return (
    <div role="status" className={`${className} animate-pulse`}>
      <div
        className={`h-full rounded-${rounded} bg-gray-200 dark:bg-gray-700 w-full mb-4`}
      ></div>
    </div>
  );
};
