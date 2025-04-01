import Header from "@/components/header";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="px-5 sm:px-10 lg:px-20 xl:px-48 2xl:px-56">
        {children}
      </div>
    </div>
  );
}

export default Provider;
