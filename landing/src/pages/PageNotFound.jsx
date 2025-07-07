function PageNotFound() {
  return (
    <>
      <div
        className="flex h-screen items-center justify-center"
        style={{
          background:
            "linear-gradient(to bottom right, #1d001a, #75106b, #af1173)",
          overflow: "hidden",
        }}
      >
        <h1 className="text-yellowColor text-4xl font-bold">
          404 - Page Not Found
        </h1>
      </div>
    </>
  );
}
export default PageNotFound;
