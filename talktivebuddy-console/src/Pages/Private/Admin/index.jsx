import Header from "../components/Admin/Header";

export const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-secondary">
        {children}
      </main>
    </div>
  );
};
